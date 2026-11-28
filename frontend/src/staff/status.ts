// How the contract's ticket statuses are shown to staff. The contract has seven statuses; staff see
// the five words agreed in the prototypes (Booked, Arrived, At desk, Done, Missed), plus Cancelled.
import type { Channel, Ticket, TicketStatus } from '../api/types'

export type StatusLabel = 'Booked' | 'Arrived' | 'At desk' | 'Done' | 'Missed' | 'Cancelled'

export const STATUS_LABEL: Record<TicketStatus, StatusLabel> = {
  waiting: 'Booked', // has a ticket, not here yet
  notified: 'Booked', // the "come now" text has gone out; still not here
  arrived: 'Arrived', // checked in at the clinic
  called: 'At desk', // called to the desk
  seen: 'Done',
  no_show: 'Missed',
  cancelled: 'Cancelled',
}

/** The filter buttons above the list, in order. Each one covers these contract statuses. */
export const STATUS_FILTERS: { label: 'All' | StatusLabel; statuses: TicketStatus[] }[] = [
  { label: 'All', statuses: ['waiting', 'notified', 'arrived', 'called', 'seen', 'no_show'] },
  { label: 'Booked', statuses: ['waiting', 'notified'] },
  { label: 'Arrived', statuses: ['arrived'] },
  { label: 'At desk', statuses: ['called'] },
  { label: 'Done', statuses: ['seen'] },
  { label: 'Missed', statuses: ['no_show'] },
]

export const CHANNEL_LABEL: Record<Channel, string> = { ussd: 'USSD', web: 'Web', desk: 'Walk-in' }

/** Order on the board: at the desk first, then the line by place, then finished tickets, newest first. */
export function boardOrder(tickets: Ticket[]): Ticket[] {
  const rank = (t: Ticket) => (t.status === 'called' ? 0 : t.position !== null ? 1 : 2)
  return [...tickets].sort((a, b) => {
    const r = rank(a) - rank(b)
    if (r !== 0) return r
    if (rank(a) === 0) return (a.calledAt ?? '').localeCompare(b.calledAt ?? '')
    if (rank(a) === 1) return (a.position ?? 0) - (b.position ?? 0)
    return (b.closedAt ?? '').localeCompare(a.closedAt ?? '')
  })
}

/**
 * A short warning under the status, from the contract's v0.2 rules:
 * - the "come now" text failed, so staff should hold the place;
 * - the hold window (`holdUntil`) has passed and the patient still hasn't checked in.
 * Missing a turn is always a staff decision, so this only warns.
 */
export function ticketNote(t: Ticket, now: number): { text: string; urgent: boolean } | null {
  if (t.status !== 'waiting' && t.status !== 'notified') return null
  if (t.smsStatus === 'failed') return { text: 'Text failed', urgent: true }
  if (t.status === 'notified' && t.holdUntil && Date.parse(t.holdUntil) < now) return { text: 'Late', urgent: true }
  if (t.status === 'notified') return { text: 'Texted to come', urgent: false }
  return null
}
