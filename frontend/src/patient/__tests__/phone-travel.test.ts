import type { PublicTicket } from '../../api/types'
import { toE164 } from '../phone'
import { leaveAdvice } from '../travel'

describe('phone numbers', () => {
  it.each([
    ['024 555 0147', '+233245550147'],
    ['0245550147', '+233245550147'],
    ['+233 24 555 0147', '+233245550147'],
    ['233245550147', '+233245550147'],
    ['020-555-0147', '+233205550147'],
  ])('reads %s as %s', (typed, e164) => expect(toE164(typed)).toBe(e164))

  it.each(['', '12345', '024555014', '02455501477', '0045550147', '+2330245550147', 'abc'])('refuses %s', (typed) => {
    expect(toE164(typed)).toBeNull()
  })
})

describe('when to leave home', () => {
  const NOW = Date.parse('2026-11-30T09:00:00Z')
  const ticket = (from: string): PublicTicket => ({
    id: 'x',
    code: 'B-001',
    status: 'waiting',
    position: 5,
    holdUntil: null,
    phoneMasked: '+233 24*****47',
    predictedWait: { lowMinutes: 60, highMinutes: 80, expectedFrom: from, expectedTo: from, method: 'mmc' },
  })

  it('is the start of the expected range minus the top of the travel band', () => {
    const a = leaveAdvice(ticket('2026-11-30T10:30:00Z'), '30_60', NOW)
    expect(a).toEqual({ kind: 'leaveAt', at: new Date('2026-11-30T09:30:00Z') })
  })

  it('uses 90 minutes for "over 1 hour"', () => {
    const a = leaveAdvice(ticket('2026-11-30T11:00:00Z'), 'over_60', NOW)
    expect(a).toEqual({ kind: 'leaveAt', at: new Date('2026-11-30T09:30:00Z') })
  })

  it('says leave now once that time has come', () => {
    expect(leaveAdvice(ticket('2026-11-30T09:20:00Z'), '30_60', NOW)).toEqual({ kind: 'leaveNow' })
  })

  it('cannot say without a wait range or a travel band', () => {
    expect(leaveAdvice({ ...ticket('2026-11-30T10:30:00Z'), predictedWait: null }, '30_60', NOW)).toEqual({ kind: 'unknown' })
    expect(leaveAdvice(ticket('2026-11-30T10:30:00Z'), null, NOW)).toEqual({ kind: 'unknown' })
  })
})
