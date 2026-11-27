import type { PublicTicket, WebTicketInput } from '../api/types'

export type Band = WebTicketInput['travelBand']

export const BANDS: { value: Band; label: string; topMinutes: number }[] = [
  { value: 'under_15', label: 'Under 15 min', topMinutes: 15 },
  { value: '15_30', label: '15 to 30 min', topMinutes: 30 },
  { value: '30_60', label: '30 to 60 min', topMinutes: 60 },
  { value: 'over_60', label: 'Over 1 hour', topMinutes: 90 },
]

export const isBand = (v: string | null): v is Band => BANDS.some((b) => b.value === v)

export type LeaveAdvice = { kind: 'leaveAt'; at: Date } | { kind: 'leaveNow' } | { kind: 'unknown' }

/**
 * When to leave home: the start of the expected range, minus the top of the travel band.
 * We use the START of the range and the TOP of the band, so a patient who follows it is early, not late.
 * The patient sees only this time, never how many people are ahead (team decision, 27 Nov).
 */
export function leaveAdvice(ticket: PublicTicket, band: Band | null, now: number): LeaveAdvice {
  if (!ticket.predictedWait || !band) return { kind: 'unknown' }
  const top = BANDS.find((b) => b.value === band)!.topMinutes
  const at = Date.parse(ticket.predictedWait.expectedFrom) - top * 60_000
  return at <= now ? { kind: 'leaveNow' } : { kind: 'leaveAt', at: new Date(at) }
}
