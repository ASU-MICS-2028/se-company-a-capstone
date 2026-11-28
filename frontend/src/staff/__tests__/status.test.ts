import { seedTickets } from '../../api/mockData'
import type { Ticket } from '../../api/types'
import { boardOrder, STATUS_FILTERS, STATUS_LABEL, ticketNote } from '../status'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const base = seedTickets(NOW)[8] // B-009, notified, text delivered

describe('status words', () => {
  it('uses the five agreed words for the normal path', () => {
    expect(STATUS_LABEL.waiting).toBe('Booked')
    expect(STATUS_LABEL.notified).toBe('Booked')
    expect(STATUS_LABEL.arrived).toBe('Arrived')
    expect(STATUS_LABEL.called).toBe('At desk')
    expect(STATUS_LABEL.seen).toBe('Done')
    expect(STATUS_LABEL.no_show).toBe('Missed')
  })

  it('each filter covers exactly the statuses with its word', () => {
    for (const f of STATUS_FILTERS.slice(1)) {
      for (const s of f.statuses) expect(STATUS_LABEL[s]).toBe(f.label)
    }
  })
})

describe('board order', () => {
  it('puts at-desk tickets first, then the line by place, then finished ones', () => {
    const order = boardOrder(seedTickets(NOW)).map((t) => t.status)
    const firstLine = order.findIndex((s) => s !== 'called')
    expect(order.slice(0, firstLine).every((s) => s === 'called')).toBe(true)
    const firstDone = order.findIndex((s) => s === 'seen' || s === 'no_show')
    expect(order.slice(firstLine, firstDone).every((s) => ['waiting', 'notified', 'arrived'].includes(s))).toBe(true)
  })

  it('does not change the list it is given', () => {
    const list = seedTickets(NOW)
    const codes = list.map((t) => t.code)
    boardOrder(list)
    expect(list.map((t) => t.code)).toEqual(codes)
  })
})

describe('warnings under the status', () => {
  const t = (over: Partial<Ticket>): Ticket => ({ ...base, ...over })

  it('says the patient was texted while the hold window is open', () => {
    expect(ticketNote(t({ holdUntil: new Date(NOW + 60_000).toISOString() }), NOW)).toEqual({ text: 'Texted to come', urgent: false })
  })

  it('says Late once the hold window has passed', () => {
    expect(ticketNote(t({ holdUntil: new Date(NOW - 60_000).toISOString() }), NOW)).toEqual({ text: 'Late', urgent: true })
  })

  it('says Text failed, so staff hold the place, even with no hold window', () => {
    expect(ticketNote(t({ smsStatus: 'failed', holdUntil: null }), NOW)).toEqual({ text: 'Text failed', urgent: true })
  })

  it('says nothing for a patient who has arrived or finished', () => {
    expect(ticketNote(t({ status: 'arrived' }), NOW)).toBeNull()
    expect(ticketNote(t({ status: 'seen', smsStatus: 'failed' }), NOW)).toBeNull()
  })
})
