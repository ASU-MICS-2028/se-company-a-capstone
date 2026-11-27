// Made-up tickets for one morning at the demo clinic. No real people: the phone numbers are
// masked the way the contract says the backend returns them, and the contract holds no names.
import type { Channel, Clinic, Ticket, TicketStatus, TravelBand } from './types'

export const CLINIC: Clinic = {
  id: 'demo-opd',
  name: 'Demo District Hospital OPD',
  ticketPrefix: 'B',
  staffOnDuty: 3,
  graceMinutes: 20,
  meanServiceMinutes: 6,
  waitingCount: 0, // filled in by the mock from the tickets
  status: { prescriberIn: true, note: null, updatedAt: '2026-11-30T07:02:00Z' },
}

type Seed = [channel: Channel, status: TicketStatus, lastTwo: string | null, band: TravelBand, sms?: 'failed']

// In issue order: B-001 was the first ticket of the day.
const SEEDS: Seed[] = [
  ['ussd', 'seen', '31', '15_30'],
  ['web', 'seen', '02', 'under_15'],
  ['desk', 'no_show', null, null],
  ['ussd', 'called', '19', '30_60'],
  ['web', 'called', '47', '15_30'],
  ['ussd', 'arrived', '13', 'under_15'],
  ['desk', 'arrived', null, null],
  ['ussd', 'arrived', '88', '30_60'],
  ['web', 'notified', '21', '15_30'],
  ['ussd', 'notified', '76', 'over_60', 'failed'],
  ['ussd', 'waiting', '40', '30_60'],
  ['web', 'waiting', '65', 'under_15'],
  ['ussd', 'waiting', '29', '15_30'],
  ['desk', 'waiting', '54', '30_60'],
]

const BAND_TOP: Record<NonNullable<TravelBand>, number> = { under_15: 15, '15_30': 30, '30_60': 60, over_60: 90 }

const minutes = (n: number) => n * 60_000
const iso = (ms: number) => new Date(ms).toISOString()

/** A stable fake id per ticket number, shaped like a UUID as the contract asks. */
const fakeId = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`

/**
 * Build the morning's tickets relative to `now`, so times on screen always look current.
 * Positions count waiting, notified and arrived tickets, in issue order (contract: "calling order").
 */
export function seedTickets(now: number, clinic: Clinic = CLINIC): Ticket[] {
  let position = 0
  return SEEDS.map(([channel, status, lastTwo, band, sms], i): Ticket => {
    const n = i + 1
    const issued = now - minutes(150 - i * 8)
    const active = status === 'waiting' || status === 'notified' || status === 'arrived'
    const pos = active ? ++position : null
    const notified = status !== 'waiting' && channel !== 'desk' ? issued + minutes(40) : null
    const smsStatus = notified === null ? null : sms ?? 'delivered'
    const holdUntil =
      notified !== null && smsStatus !== 'failed' && band
        ? iso(notified + minutes(1) + minutes(BAND_TOP[band] + clinic.graceMinutes))
        : null
    const arrived = ['arrived', 'called', 'seen'].includes(status) || (status === 'no_show' && channel === 'desk') ? issued + minutes(60) : null
    const called = ['called', 'seen'].includes(status) || (status === 'no_show' && channel === 'desk') ? now - minutes(20 - i) : null
    const closed = status === 'seen' || status === 'no_show' ? now - minutes(30 - i * 4) : null

    return {
      id: fakeId(n),
      code: `${clinic.ticketPrefix}-${String(n).padStart(3, '0')}`,
      clinicId: clinic.id,
      channel,
      status,
      position: pos,
      phoneMasked: lastTwo ? `+233 24*****${lastTwo}` : null,
      travelBand: band,
      language: n % 3 === 0 ? 'tw' : 'en',
      predictedWait: pos === null ? null : waitRange(pos, now, clinic),
      smsStatus,
      smsUpdatedAt: notified === null ? null : iso(notified + minutes(1)),
      holdUntil,
      issuedAt: iso(issued),
      notifiedAt: notified === null ? null : iso(notified),
      arrivedAt: arrived === null ? null : iso(arrived),
      calledAt: called === null ? null : iso(called),
      closedAt: closed === null ? null : iso(closed),
      overridden: false,
    }
  })
}

/**
 * A rough M/M/c-style range, only so the mock looks believable. The real numbers come from the
 * backend's predictor (#46). Shown as a range, never one time (contract: WaitRange).
 */
export function waitRange(position: number, now: number, clinic: Clinic = CLINIC): Ticket['predictedWait'] {
  if (clinic.staffOnDuty === 0) return null
  const mid = (position * clinic.meanServiceMinutes) / clinic.staffOnDuty
  const low = Math.max(0, Math.round(mid * 0.8))
  const high = Math.round(mid * 1.25) + 5
  return { lowMinutes: low, highMinutes: high, expectedFrom: iso(now + minutes(low)), expectedTo: iso(now + minutes(high)), method: 'mmc' }
}
