import { createMockApi } from '../mock'
import { seedTickets } from '../mockData'
import { ApiError } from '../types'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const ALL = ['waiting', 'notified', 'arrived', 'called', 'seen', 'no_show', 'cancelled'] as const

describe('mock API', () => {
  const api = () => createMockApi({ delayMs: 0, now: () => NOW })

  it('returns only active tickets when no status filter is given', async () => {
    const { tickets } = await api().getQueue('demo-opd')
    expect(tickets.length).toBeGreaterThan(0)
    for (const t of tickets) expect(['waiting', 'notified', 'arrived', 'called']).toContain(t.status)
  })

  it('filters by status', async () => {
    const { tickets } = await api().getQueue('demo-opd', ['seen'])
    expect(tickets.map((t) => t.status)).toEqual(['seen', 'seen'])
  })

  it('lists tickets in calling order: places 1, 2, 3... first', async () => {
    const { tickets } = await api().getQueue('demo-opd')
    const places = tickets.filter((t) => t.position !== null).map((t) => t.position)
    expect(places).toEqual(places.map((_, i) => i + 1))
    expect(tickets.findIndex((t) => t.position === null)).toBeGreaterThan(places.length - 1)
  })

  it('answers 404 for another clinic (there is only one)', async () => {
    await expect(api().getQueue('other-clinic')).rejects.toBeInstanceOf(ApiError)
    await expect(api().getClinic('other-clinic')).rejects.toMatchObject({ status: 404 })
  })

  it('hands out copies, so a screen cannot change the data by accident', async () => {
    const a = api()
    const first = await a.getQueue('demo-opd')
    first.tickets[0].status = 'seen'
    const second = await a.getQueue('demo-opd')
    expect(second.tickets[0].status).not.toBe('seen')
  })

  it('counts waiting, notified and arrived tickets as waiting', async () => {
    const a = api()
    const clinic = await a.getClinic('demo-opd')
    const { tickets } = await a.getQueue('demo-opd', ['waiting', 'notified', 'arrived'])
    expect(clinic.waitingCount).toBe(tickets.length)
  })

  it('can wait before answering, to show loading states', async () => {
    vi.useFakeTimers()
    let done = false
    const p = createMockApi({ delayMs: 200, now: () => NOW }).getClinic('demo-opd').then(() => (done = true))
    await vi.advanceTimersByTimeAsync(199)
    expect(done).toBe(false)
    await vi.advanceTimersByTimeAsync(1)
    await p
    expect(done).toBe(true)
    vi.useRealTimers()
  })
})

describe('seeded tickets follow the contract rules', () => {
  const tickets = seedTickets(NOW)

  it('never hold a full phone number', () => {
    for (const t of tickets) {
      if (t.phoneMasked !== null) expect(t.phoneMasked).toMatch(/\*{5}\d{2}$/)
      expect(JSON.stringify(t)).not.toMatch(/\+233\d{9}/)
    }
  })

  it('give a place only to waiting, notified and arrived tickets', () => {
    for (const t of tickets) {
      const active = t.status === 'waiting' || t.status === 'notified' || t.status === 'arrived'
      expect(t.position !== null).toBe(active)
      expect(t.predictedWait !== null).toBe(active)
    }
  })

  it('show every wait as a range, low before high', () => {
    for (const t of tickets) {
      if (!t.predictedWait) continue
      expect(t.predictedWait.lowMinutes).toBeLessThan(t.predictedWait.highMinutes)
      expect(Date.parse(t.predictedWait.expectedFrom)).toBeLessThan(Date.parse(t.predictedWait.expectedTo))
    }
  })

  it('have unique codes like B-001', () => {
    const codes = tickets.map((t) => t.code)
    expect(new Set(codes).size).toBe(codes.length)
    for (const c of codes) expect(c).toMatch(/^[A-Z]-\d{3}$/)
  })

  it('set no hold window when the text failed (it counts from sending)', () => {
    const failed = tickets.filter((t) => t.smsStatus === 'failed')
    expect(failed.length).toBeGreaterThan(0)
    for (const t of failed) expect(t.holdUntil).toBeNull()
  })

  it('include every status the board shows', () => {
    const statuses = new Set(tickets.map((t) => t.status))
    for (const s of ALL.filter((s) => s !== 'cancelled')) expect(statuses).toContain(s)
  })
})
