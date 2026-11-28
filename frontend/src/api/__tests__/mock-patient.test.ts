import { seedTickets } from '../mockData'
import { createMockApi } from '../mock'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const C = 'demo-opd'
const input = { phone: '+233244000111', travelBand: '30_60' as const, language: 'en' as const }

describe('mock patient web endpoints', () => {
  const api = () => createMockApi({ delayMs: 0, now: () => NOW })

  it('joins the end of the same queue and returns only public fields', async () => {
    const a = api()
    const lineBefore = (await a.getQueue(C, ['waiting', 'notified', 'arrived'])).tickets.length
    const t = await a.joinFromWeb(C, input)
    expect(Object.keys(t).sort()).toEqual(['code', 'holdUntil', 'id', 'phoneMasked', 'position', 'predictedWait', 'status'])
    expect(t.status).toBe('waiting')
    expect(t.position).toBe(lineBefore + 1)
    expect(t.phoneMasked).toBe('+233 24*****11')
    expect(t.predictedWait).not.toBeNull()
    const staffView = (await a.getQueue(C)).tickets.find((x) => x.id === t.id)!
    expect(staffView.channel).toBe('web')
    expect(JSON.stringify(staffView)).not.toContain('244000111')
  })

  it('refuses a second active ticket for the same phone (409) and says nothing about the first', async () => {
    const a = api()
    await a.joinFromWeb(C, input)
    const err = await a.joinFromWeb(C, input).catch((e) => e)
    expect(err.status).toBe(409)
    expect(err.message).not.toMatch(/B-\d{3}/)
  })

  it('gives the same ticket back when a lost answer is retried with the same key', async () => {
    const a = api()
    const first = await a.joinFromWeb(C, input, 'form-1')
    const again = await a.joinFromWeb(C, input, 'form-1')
    expect(again.id).toBe(first.id)
  })

  it('lets the phone join again once its ticket is closed', async () => {
    const a = api()
    const t = await a.joinFromWeb(C, input)
    await a.cancelTicket(t.id)
    await expect(a.joinFromWeb(C, input)).resolves.toMatchObject({ status: 'waiting' })
  })

  it('refuses a badly formed request (422)', async () => {
    const a = api()
    await expect(a.joinFromWeb(C, { ...input, phone: '0244000111' })).rejects.toMatchObject({ status: 422 })
    await expect(a.joinFromWeb(C, { ...input, travelBand: 'far' as never })).rejects.toMatchObject({ status: 422 })
  })

  it('shows a web ticket to anyone with its id, and follows staff changes', async () => {
    const a = api()
    const t = await a.joinFromWeb(C, input)
    await a.markArrived(t.id)
    expect((await a.getWebTicket(t.id)).status).toBe('arrived')
  })

  it('answers 404 for USSD and desk tickets, so only web tickets have a public page', async () => {
    const a = api()
    const ussd = (await a.getQueue(C)).tickets.find((t) => t.channel === 'ussd')!
    await expect(a.getWebTicket(ussd.id)).rejects.toMatchObject({ status: 404 })
    await expect(a.getWebTicket('no-such-id')).rejects.toMatchObject({ status: 404 })
  })

  it('never reuses a ticket number, even if the list gets shorter', async () => {
    // B-002 is gone, so there are 13 tickets but the highest number is B-014.
    const a = createMockApi({ delayMs: 0, now: () => NOW, tickets: seedTickets(NOW).filter((t) => t.code !== 'B-002') })
    const first = await a.joinFromWeb(C, input)
    const second = await a.joinFromWeb(C, { ...input, phone: '+233244000112' })
    expect(first.code).toBe('B-015')
    expect(second.code).toBe('B-016')
  })
})
