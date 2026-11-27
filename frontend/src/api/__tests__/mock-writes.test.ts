// The mock's staff actions follow the contract's state table (v0.2, TicketStatus) and its
// "Safe to repeat" rules, so the board behaves the same against the real backend.
import { createMockApi } from '../mock'
import { seedTickets } from '../mockData'
import type { Ticket } from '../types'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const C = 'demo-opd'
const ALL = ['waiting', 'notified', 'arrived', 'called', 'seen', 'no_show', 'cancelled'] as const

const setup = () => {
  const api = createMockApi({ delayMs: 0, now: () => NOW })
  const byCode = async (code: string) => (await api.getQueue(C, [...ALL])).tickets.find((t) => t.code === code)!
  const line = async () => (await api.getQueue(C, ['waiting', 'notified', 'arrived'])).tickets
  return { api, byCode, line }
}

describe('call next', () => {
  it('calls the first patient who has arrived, not someone still travelling', async () => {
    const { api, line } = setup()
    const first = (await line())[0]
    const firstArrived = (await line()).find((t) => t.status === 'arrived')!
    const called = await api.callNext(C)
    expect(called?.id).toBe(firstArrived.id)
    expect(called?.status).toBe('called')
    expect(called?.position).toBeNull()
    expect(first.status).toBe('arrived') // in the seed the first in line has arrived
  })

  it('skips a waiting ticket ahead of an arrived one', async () => {
    const { api, byCode } = setup()
    // B-011 is waiting. Move it to place 1, ahead of the arrived tickets.
    await api.overridePosition((await byCode('B-011')).id, { reason: 'priority', toPosition: 1 })
    const called = await api.callNext(C)
    expect(called?.code).not.toBe('B-011')
    expect((await byCode('B-011')).position).toBe(1)
  })

  it('answers null (204) when nobody has arrived', async () => {
    const api = createMockApi({ delayMs: 0, now: () => NOW, tickets: seedTickets(NOW).filter((t) => t.status !== 'arrived') })
    expect(await api.callNext(C)).toBeNull()
  })

  it('with the same key twice, calls only one patient', async () => {
    const { api } = setup()
    const a = await api.callNext(C, 'tap-1')
    const b = await api.callNext(C, 'tap-1')
    expect(b?.id).toBe(a?.id)
    expect((await api.getQueue(C, ['called'])).tickets).toHaveLength(3) // 2 in the seed + 1
  })

  it('with a fresh key, calls the next one', async () => {
    const { api } = setup()
    const a = await api.callNext(C, 'tap-1')
    const b = await api.callNext(C, 'tap-2')
    expect(b?.id).not.toBe(a?.id)
  })
})

describe('check in, done, missed', () => {
  it('checks in a waiting ticket and keeps its place', async () => {
    const { api, byCode } = setup()
    const before = await byCode('B-011')
    const after = await api.markArrived(before.id)
    expect(after.status).toBe('arrived')
    expect(after.position).toBe(before.position)
    expect(after.arrivedAt).not.toBeNull()
  })

  it('checking in twice is harmless (200, unchanged)', async () => {
    const { api, byCode } = setup()
    const id = (await byCode('B-011')).id
    const first = await api.markArrived(id)
    const second = await api.markArrived(id)
    expect(second).toEqual(first)
  })

  it('checking in a patient already at the desk is harmless too (passed it on the normal path)', async () => {
    const { api, byCode } = setup()
    const t = await api.markArrived((await byCode('B-004')).id)
    expect(t.status).toBe('called')
  })

  it('refuses to mark done someone who is not at the desk (409)', async () => {
    const { api, byCode } = setup()
    await expect(api.markSeen((await byCode('B-011')).id)).rejects.toMatchObject({ status: 409 })
  })

  it('marks done a patient at the desk', async () => {
    const { api, byCode } = setup()
    const t = await api.markSeen((await byCode('B-004')).id)
    expect(t.status).toBe('seen')
    expect(t.closedAt).not.toBeNull()
  })

  it('marks missed only from notified or called', async () => {
    const { api, byCode } = setup()
    await expect(api.markNoShow((await byCode('B-011')).id)).rejects.toMatchObject({ status: 409 }) // waiting
    await expect(api.markNoShow((await byCode('B-006')).id)).rejects.toMatchObject({ status: 409 }) // arrived
    expect((await api.markNoShow((await byCode('B-009')).id)).status).toBe('no_show') // notified
    expect((await api.markNoShow((await byCode('B-005')).id)).status).toBe('no_show') // called
  })

  it('closes the gap in the line after a missed turn', async () => {
    const { api, byCode, line } = setup()
    await api.markNoShow((await byCode('B-009')).id)
    const places = (await line()).map((t) => t.position)
    expect(places).toEqual(places.map((_, i) => i + 1))
  })

  it('answers 404 for an unknown ticket', async () => {
    const { api } = setup()
    await expect(api.markArrived('nope')).rejects.toMatchObject({ status: 404 })
  })
})

describe('move up', () => {
  it('moves a ticket to the place asked for, and everyone else shifts down by one', async () => {
    const { api, byCode, line } = setup()
    const before = (await line()).map((t) => t.code)
    const moved = await api.overridePosition((await byCode('B-013')).id, { reason: 'emergency', toPosition: 2 })
    expect(moved.position).toBe(2)
    expect(moved.overridden).toBe(true)
    const after = (await line()).map((t) => t.code)
    expect(after).toEqual([before[0], 'B-013', ...before.slice(1).filter((c) => c !== 'B-013')])
  })

  it('moving past the end puts the ticket last', async () => {
    const { api, byCode, line } = setup()
    await api.overridePosition((await byCode('B-006')).id, { reason: 'correction', toPosition: 99 })
    expect((await line()).at(-1)?.code).toBe('B-006')
  })

  it('needs a valid reason and a place of 1 or more (422)', async () => {
    const { api, byCode } = setup()
    const id = (await byCode('B-013')).id
    await expect(api.overridePosition(id, { reason: 'because' as never, toPosition: 1 })).rejects.toMatchObject({ status: 422 })
    await expect(api.overridePosition(id, { reason: 'priority', toPosition: 0 })).rejects.toMatchObject({ status: 422 })
    await expect(api.overridePosition(id, { reason: 'priority', toPosition: 1, note: 'x'.repeat(201) })).rejects.toMatchObject({ status: 422 })
  })

  it('cannot move someone already at the desk or finished (409)', async () => {
    const { api, byCode } = setup()
    await expect(api.overridePosition((await byCode('B-004')).id, { reason: 'priority', toPosition: 1 })).rejects.toMatchObject({ status: 409 })
    await expect(api.overridePosition((await byCode('B-001')).id, { reason: 'priority', toPosition: 1 })).rejects.toMatchObject({ status: 409 })
  })

  it('logs who moved whom, why, and from where to where', async () => {
    const { api, byCode } = setup()
    const t = await byCode('B-013')
    await api.overridePosition(t.id, { reason: 'priority', toPosition: 1, note: 'Elderly' })
    const [e] = await api.listEvents(C)
    expect(e).toMatchObject({ seq: 1, type: 'override', ticketId: t.id, actor: 'staff', actorId: 'staff-ama' })
    expect(e.data).toEqual({ reason: 'priority', note: 'Elderly', fromPosition: t.position, toPosition: 1 })
  })

  it('refuses a key reused for a different request (422)', async () => {
    const { api, byCode } = setup()
    const id = (await byCode('B-013')).id
    await api.overridePosition(id, { reason: 'priority', toPosition: 1 }, 'k')
    await expect(api.overridePosition(id, { reason: 'priority', toPosition: 3 }, 'k')).rejects.toMatchObject({ status: 422 })
  })
})

describe('event log', () => {
  it('records every staff action once, in order', async () => {
    const { api, byCode } = setup()
    const t: Ticket = await byCode('B-011')
    await api.markArrived(t.id)
    await api.markArrived(t.id) // repeat: no new event
    await api.callNext(C)
    await api.cancelTicket((await byCode('B-012')).id)
    const events = await api.listEvents(C)
    expect(events.map((e) => e.type)).toEqual(['arrived', 'called', 'cancelled'])
    expect(events.map((e) => e.seq)).toEqual([1, 2, 3])
    expect((await api.listEvents(C, 2)).map((e) => e.seq)).toEqual([3])
  })
})
