// Which buttons each ticket gets, and the words for the activity log.
import type { OverrideInput, QueueEvent, Ticket } from '../api/types'
import { ticketNote } from './status'

export type RowAction = 'checkIn' | 'moveUp' | 'done' | 'missed'

/**
 * The buttons on one row. They follow the contract's state table, and the prototypes:
 * - Booked: Check in, Move up. Mark missed only once they are Late (the hold window has passed).
 *   Not when the text failed: then staff hold the place.
 * - Arrived: Move up.
 * - At desk: Mark done, Mark missed.
 */
export function rowActions(t: Ticket, now: number): RowAction[] {
  switch (t.status) {
    case 'waiting':
      return ['checkIn', 'moveUp']
    case 'notified':
      return ticketNote(t, now)?.text === 'Late' ? ['checkIn', 'moveUp', 'missed'] : ['checkIn', 'moveUp']
    case 'arrived':
      return ['moveUp']
    case 'called':
      return ['done', 'missed']
    default:
      return []
  }
}

export const REASON_LABEL: Record<OverrideInput['reason'], string> = {
  priority: 'Priority (elderly, pregnant, disabled)',
  emergency: 'Emergency',
  correction: 'Correcting a mistake',
  other: 'Other',
}

const SHORT_REASON: Record<OverrideInput['reason'], string> = {
  priority: 'Priority',
  emergency: 'Emergency',
  correction: 'Correction',
  other: 'Other',
}

/** The demo's staff users. The real names will come from the backend. */
const STAFF_NAMES: Record<string, string> = { 'staff-ama': 'Ama B.' }

/** One plain sentence per staff action, for "Logged today". */
export function describeEvent(e: QueueEvent, codeOf: (ticketId: string) => string | undefined): string | null {
  const code = (e.ticketId && codeOf(e.ticketId)) ?? 'A ticket'
  const who = e.actorId ? (STAFF_NAMES[e.actorId] ?? e.actorId) : null
  const by = who ? ` By ${who}${who.endsWith('.') ? '' : '.'}` : ''
  const d = (e.data ?? {}) as { reason?: OverrideInput['reason']; note?: string | null; fromPosition?: number; toPosition?: number }
  switch (e.type) {
    case 'arrived':
      return `${code} checked in.${by}`
    case 'called':
      return `${code} called to the desk.${by}`
    case 'seen':
      return `${code} marked done.${by}`
    case 'no_show':
      return `${code} marked missed.${by}`
    case 'cancelled':
      return `${code} removed from the queue.${by}`
    case 'override': {
      const reason = d.reason ? ` Reason: ${SHORT_REASON[d.reason]}.` : ''
      const note = d.note ? ` Note: ${d.note}.` : ''
      return `${code} moved from place ${d.fromPosition} to ${d.toPosition}.${reason}${note}${by}`
    }
    default:
      return null
  }
}
