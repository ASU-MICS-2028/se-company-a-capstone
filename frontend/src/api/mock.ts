// An in-memory stand-in for Eric's backend. It answers like the contract (v0.2) says the real API
// will, so the screens can be built and tested before the backend exists.
import type { TwenApi } from './client'
import { CLINIC, seedTickets } from './mockData'
import { ApiError, type Clinic, type QueueEvent, type Ticket, type TicketStatus } from './types'

/** The statuses `GET /queue` returns when no filter is given (contract: "all active tickets"). */
export const ACTIVE_STATUSES: TicketStatus[] = ['waiting', 'notified', 'arrived', 'called']

export interface MockOptions {
  /** Pretend network delay in ms, so loading states can be seen. Tests use 0. */
  delayMs?: number
  /** The clock. Tests pass a fixed one. */
  now?: () => number
  /** Start from these tickets instead of the seeded morning. */
  tickets?: Ticket[]
}

export function createMockApi(options: MockOptions = {}): TwenApi {
  const delayMs = options.delayMs ?? 250
  const now = options.now ?? Date.now
  const tickets: Ticket[] = options.tickets ?? seedTickets(now())
  const events: QueueEvent[] = []

  const reply = <T>(value: T): Promise<T> => {
    // A deep copy, so a screen can never change the mock's data by accident.
    const copy = structuredClone(value)
    return delayMs > 0 ? new Promise((resolve) => setTimeout(() => resolve(copy), delayMs)) : Promise.resolve(copy)
  }

  const checkClinic = (clinicId: string) => {
    if (clinicId !== CLINIC.id) {
      return Promise.reject(new ApiError({ type: 'about:blank', title: 'Not found', status: 404, detail: `No clinic '${clinicId}'.` }))
    }
    return null
  }

  return {
    getClinic(clinicId) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      const waitingCount = tickets.filter((t) => t.status === 'waiting' || t.status === 'notified' || t.status === 'arrived').length
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
      return reply({ clinicId, generatedAt: new Date(now()).toISOString(), tickets: list })
    },

    listEvents(clinicId, after = 0) {
      const missing = checkClinic(clinicId)
      if (missing) return missing
      return reply(events.filter((e) => e.seq > after))
    },
  }
}
