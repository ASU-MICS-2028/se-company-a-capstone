// An in-memory stand-in for Eric's backend. It answers like the contract (v0.2) says the real API
// will, so the screens can be built and tested before the backend exists.
import type { TwenApi } from './client'
import { CLINIC, seedTickets, waitRange } from './mockData'
import { ApiError, type Clinic, type OverrideInput, type PublicTicket, type QueueEvent, type Ticket, type TicketStatus } from './types'

/** The statuses `GET /queue` returns when no filter is given (contract: "all active tickets"). */
export const ACTIVE_STATUSES: TicketStatus[] = ['waiting', 'notified', 'arrived', 'called']

/** Tickets that hold a place in calling order. */
const IN_LINE: TicketStatus[] = ['waiting', 'notified', 'arrived']

/** The normal path, used for "already done" checks (contract: "Safe to repeat"). */
const PATH: TicketStatus[] = ['waiting', 'notified', 'arrived', 'called', 'seen']

/** The demo's signed-in staff user, as the backend would read it from the token. */
export const MOCK_STAFF_ID = 'staff-ama'

export interface MockOptions {
  /** Pretend network delay in ms, so loading states can be seen. Tests use 0. */
  delayMs?: number
  /** The clock. Tests pass a fixed one. */
  now?: () => number
  /** Start from these tickets instead of the seeded morning. */
  tickets?: Ticket[]
}

const problem = (status: number, title: string, detail: string) =>
  new ApiError({ type: 'about:blank', title, status, detail })

export function createMockApi(options: MockOptions = {}): TwenApi {
  const delayMs = options.delayMs ?? 250
  const now = options.now ?? Date.now
  // The array order of in-line tickets IS the calling order. Moving a ticket up moves it in the array.
  const tickets: Ticket[] = structuredClone(options.tickets ?? seedTickets(now()))
  const events: QueueEvent[] = []
  const answered = new Map<string, { request: string; result: unknown }>()
  // Full phone numbers live only here, never on a ticket, as the contract says (`phoneMasked` only).
  const phones = new Map<string, string>()
  // Ticket numbers only go up. Counting the list would reuse a number if a ticket were ever removed.
  let lastNumber = tickets.reduce((max, t) => Math.max(max, Number(t.code.split('-').at(-1)) || 0), 0)

  const wait = () => (delayMs > 0 ? new Promise((r) => setTimeout(r, delayMs)) : Promise.resolve())

  const reply = async <T>(value: T): Promise<T> => {
    await wait()
    // A deep copy, so a screen can never change the mock's data by accident.
    return structuredClone(value)
  }

  const fail = async (error: ApiError): Promise<never> => {
    await wait()
    throw error
  }

  const checkClinic = (clinicId: string) =>
    clinicId === CLINIC.id ? null : fail(problem(404, 'Not found', `No clinic '${clinicId}'.`))

  /** Give in-line tickets places 1, 2, 3... and fresh wait ranges; clear them for the rest. */
  const renumber = () => {
    let place = 0
    for (const t of tickets) {
      if (IN_LINE.includes(t.status)) {
        t.position = ++place
        t.predictedWait = waitRange(place, now())
      } else {
        t.position = null
        t.predictedWait = null
      }
    }
  }

  const log = (type: QueueEvent['type'], ticketId: string, data?: Record<string, unknown>) => {
    events.push({ seq: events.length + 1, type, ticketId, at: new Date(now()).toISOString(), actor: 'staff', actorId: MOCK_STAFF_ID, data })
  }

  /**
   * Runs a staff write once per idempotency key: the same key with the same request gets the first
   * answer back; the same key with a different request is refused with 422 (contract: "Safe to repeat").
   */
  const once = async <T>(key: string | undefined, request: string, act: () => T): Promise<T> => {
    if (key) {
      const seen = answered.get(key)
      if (seen) {
        if (seen.request !== request) return fail(problem(422, 'Key reused', 'This Idempotency-Key was used for a different request.'))
        return reply(seen.result as T)
      }
    }
    try {
      const result = act()
      if (key) answered.set(key, { request, result: structuredClone(result) })
      return reply(result)
    } catch (e) {
      if (e instanceof ApiError) return fail(e)
      throw e
    }
  }

  const find = (ticketId: string) => {
    const t = tickets.find((x) => x.id === ticketId)
    if (!t) throw problem(404, 'Not found', `No ticket '${ticketId}'.`)
    return t
  }

  const cannot = (t: Ticket, what: string) =>
    problem(409, 'Invalid transition', `Ticket ${t.code} is '${t.status}'; cannot ${what}.`)

  /** True if the ticket is already at `target`, or has passed it on the normal path. */
  const alreadyThere = (t: Ticket, target: TicketStatus) => {
    const at = PATH.indexOf(t.status)
    return at !== -1 && at >= PATH.indexOf(target)
  }

  const stamp = () => new Date(now()).toISOString()

  /** The fields the patient's page may see (contract: PublicTicket). */
  const publicView = (t: Ticket): PublicTicket => ({
    id: t.id,
    code: t.code,
    status: t.status,
    position: t.position,
    predictedWait: t.predictedWait,
    holdUntil: t.holdUntil,
    phoneMasked: t.phoneMasked ?? '',
  })

  return {
    getClinic(clinicId) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      const waitingCount = tickets.filter((t) => IN_LINE.includes(t.status)).length
      const clinic: Clinic = { ...CLINIC, waitingCount }
      return reply(clinic)
    },

    getQueue(clinicId, statuses = ACTIVE_STATUSES) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      const wanted = new Set(statuses)
      // Calling order: tickets with a place first (1, 2, 3...), then the rest in issue order.
      const list = tickets
        .filter((t) => wanted.has(t.status))
        .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || a.issuedAt.localeCompare(b.issuedAt))
      return reply({ clinicId, generatedAt: stamp(), tickets: list })
    },

    listEvents(clinicId, after = 0) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      return reply(events.filter((e) => e.seq > after))
    },

    callNext(clinicId, key) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      return once(key, `call-next:${clinicId}`, () => {
        // The first ARRIVED ticket in calling order. People still travelling keep their place.
        const next = tickets.find((t) => t.status === 'arrived')
        if (!next) return null
        next.status = 'called'
        next.calledAt = stamp()
        renumber()
        log('called', next.id)
        return next
      })
    },

    markArrived(ticketId, key) {
      return once(key, `arrived:${ticketId}`, () => {
        const t = find(ticketId)
        if (alreadyThere(t, 'arrived')) return t
        if (t.status !== 'waiting' && t.status !== 'notified') throw cannot(t, 'check in')
        t.status = 'arrived'
        t.arrivedAt = stamp()
        renumber()
        log('arrived', t.id)
        return t
      })
    },

    markSeen(ticketId, key) {
      return once(key, `seen:${ticketId}`, () => {
        const t = find(ticketId)
        if (t.status === 'seen') return t
        if (t.status !== 'called') throw cannot(t, 'mark done')
        t.status = 'seen'
        t.closedAt = stamp()
        log('seen', t.id)
        return t
      })
    },

    markNoShow(ticketId, key) {
      return once(key, `no-show:${ticketId}`, () => {
        const t = find(ticketId)
        if (t.status === 'no_show') return t
        if (t.status !== 'notified' && t.status !== 'called') throw cannot(t, 'mark missed')
        t.status = 'no_show'
        t.closedAt = stamp()
        renumber()
        log('no_show', t.id)
        return t
      })
    },

    overridePosition(ticketId, input: OverrideInput, key) {
      return once(key, `override:${ticketId}:${JSON.stringify(input)}`, () => {
        const reasons = ['priority', 'emergency', 'correction', 'other']
        if (!reasons.includes(input.reason)) throw problem(422, 'Invalid', 'A reason is required.')
        if (!Number.isInteger(input.toPosition) || input.toPosition < 1) throw problem(422, 'Invalid', 'The new place must be 1 or more.')
        if (input.note && input.note.length > 200) throw problem(422, 'Invalid', 'The note can be at most 200 characters.')
        const t = find(ticketId)
        if (!IN_LINE.includes(t.status)) throw cannot(t, 'move')
        const fromPosition = t.position!
        // Take it out, then put it back before whoever now holds the requested place.
        tickets.splice(tickets.indexOf(t), 1)
        const line = tickets.filter((x) => IN_LINE.includes(x.status))
        const target = line[input.toPosition - 1]
        tickets.splice(target ? tickets.indexOf(target) : tickets.length, 0, t)
        t.overridden = true
        renumber()
        log('override', t.id, { reason: input.reason, note: input.note ?? null, fromPosition, toPosition: t.position })
        return t
      })
    },

    joinFromWeb(clinicId, input, key) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      return once(key, `join:${JSON.stringify(input)}`, () => {
        if (!/^\+[1-9][0-9]{7,14}$/.test(input.phone)) throw problem(422, 'Invalid', 'The phone number must look like +233244000111.')
        if (!['under_15', '15_30', '30_60', 'over_60'].includes(input.travelBand)) throw problem(422, 'Invalid', 'Choose how long it takes you to get here.')
        if (input.language !== 'en' && input.language !== 'tw') throw problem(422, 'Invalid', 'Choose English or Twi.')
        const holder = tickets.find((t) => phones.get(t.id) === input.phone && ACTIVE_STATUSES.includes(t.status))
        if (holder) {
          throw problem(409, 'Phone already has a ticket', 'This number is already in the queue. Dial the USSD code and choose Check my ticket.')
        }
        const n = ++lastNumber
        const t: Ticket = {
          id: crypto.randomUUID(),
          code: `${CLINIC.ticketPrefix}-${String(n).padStart(3, '0')}`,
          clinicId,
          channel: 'web',
          status: 'waiting',
          position: null,
          phoneMasked: `${input.phone.slice(0, 4)} ${input.phone.slice(4, 6)}*****${input.phone.slice(-2)}`,
          travelBand: input.travelBand,
          language: input.language,
          predictedWait: null,
          smsStatus: null,
          smsUpdatedAt: null,
          holdUntil: null,
          issuedAt: stamp(),
          notifiedAt: null,
          arrivedAt: null,
          calledAt: null,
          closedAt: null,
          overridden: false,
        }
        tickets.push(t)
        phones.set(t.id, input.phone)
        renumber()
        events.push({ seq: events.length + 1, type: 'joined', ticketId: t.id, at: stamp(), actor: 'patient', actorId: null })
        return publicView(t)
      })
    },

    getWebTicket(ticketId) {
      const t = tickets.find((x) => x.id === ticketId)
      // USSD and desk tickets have no public page, so they answer 404 like an unknown id.
      if (!t || t.channel !== 'web') return fail(problem(404, 'Not found', 'No such ticket.'))
      return reply(publicView(t))
    },

    cancelTicket(ticketId, key) {
      return once(key, `cancel:${ticketId}`, () => {
        const t = find(ticketId)
        if (t.status === 'cancelled') return t
        if (!IN_LINE.includes(t.status)) throw cannot(t, 'cancel')
        t.status = 'cancelled'
        t.closedAt = stamp()
        renumber()
        log('cancelled', t.id)
        return t
      })
    },
  }
}
