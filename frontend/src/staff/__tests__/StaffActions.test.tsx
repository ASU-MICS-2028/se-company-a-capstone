import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import type { TwenApi } from '../../api/client'
import { createMockApi } from '../../api/mock'
import { seedTickets } from '../../api/mockData'
import { ApiError } from '../../api/types'
import { QueuePage } from '../QueuePage'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const now = () => NOW

async function setup(api: TwenApi = createMockApi({ delayMs: 0, now })) {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <QueuePage api={api} refreshMs={0} now={now} />
    </MemoryRouter>,
  )
  await screen.findByRole('table')
  return { user, api }
}

const row = (code: string) => screen.getByRole('rowheader', { name: new RegExp(code) }).closest('tr')!
const log = () => screen.getByRole('complementary', { name: 'Logged today' })
const feedback = () => screen.getAllByRole('status').find((el) => el.classList.contains('feedback'))!

describe('staff actions', () => {
  it('Call next patient calls the first one who has checked in, and logs it', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Call next patient' }))
    expect(feedback()).toHaveTextContent('B-006 called to the desk.')
    expect(within(row('B-006')).getByText('At desk')).toBeInTheDocument()
    expect(log()).toHaveTextContent('B-006 called to the desk. By Ama B.')
    expect(log()).not.toHaveTextContent('B..')
  })

  it('says so when nobody has checked in', async () => {
    const { user } = await setup(createMockApi({ delayMs: 0, now, tickets: seedTickets(NOW).filter((t) => t.status !== 'arrived') }))
    await user.click(screen.getByRole('button', { name: 'Call next patient' }))
    expect(feedback()).toHaveTextContent('Nobody has checked in yet.')
  })

  it('Check in turns a booked patient into Arrived, keeping their place', async () => {
    const { user } = await setup()
    const place = within(row('B-011')).getAllByRole('cell')[0].textContent
    await user.click(screen.getByRole('button', { name: 'Check in B-011' }))
    expect(within(row('B-011')).getByText('Arrived')).toBeInTheDocument()
    expect(within(row('B-011')).getAllByRole('cell')[0].textContent).toBe(place)
    expect(log()).toHaveTextContent('B-011 checked in.')
  })

  it('Mark done finishes a patient at the desk', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Mark done B-004' }))
    expect(within(row('B-004')).getByText('Done')).toBeInTheDocument()
  })

  it('Mark missed asks first, and Keep changes nothing', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Mark missed B-005' }))
    await user.click(screen.getByRole('button', { name: 'Keep' }))
    expect(within(row('B-005')).getByText('At desk')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mark missed B-005' }))
    await user.click(screen.getByRole('button', { name: 'Yes, mark B-005 missed' }))
    expect(within(row('B-005')).getByText('Missed')).toBeInTheDocument()
    expect(log()).toHaveTextContent('B-005 marked missed.')
  })

  it('keeps keyboard focus: on the confirm button, then back on Mark missed after Keep', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Mark missed B-005' }))
    expect(screen.getByRole('button', { name: 'Yes, mark B-005 missed' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Keep' }))
    expect(screen.getByRole('button', { name: 'Mark missed B-005' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Mark missed B-005' }))
    await user.keyboard('{Enter}')
    expect(within(row('B-005')).getByText('Missed')).toBeInTheDocument()
    expect(feedback()).toHaveFocus()
  })

  it('offers Mark missed for a booked patient only once they are late, never when the text failed', async () => {
    const tickets = seedTickets(NOW)
    const late = tickets.find((t) => t.code === 'B-009')!
    late.holdUntil = new Date(NOW - 60_000).toISOString()
    await setup(createMockApi({ delayMs: 0, now, tickets }))
    expect(screen.getByRole('button', { name: 'Mark missed B-009' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Mark missed B-010' })).not.toBeInTheDocument() // text failed
    expect(screen.queryByRole('button', { name: 'Mark missed B-011' })).not.toBeInTheDocument() // not texted yet
  })

  it('shows the API’s reason when an action is refused', async () => {
    const good = createMockApi({ delayMs: 0, now })
    const refusing: TwenApi = {
      ...good,
      markArrived: () => Promise.reject(new ApiError({ type: 'about:blank', title: 'Invalid transition', status: 409, detail: "Ticket B-011 is 'cancelled'; cannot check in." })),
    }
    const { user } = await setup(refusing)
    await user.click(screen.getByRole('button', { name: 'Check in B-011' }))
    expect(feedback()).toHaveTextContent("That didn’t work. Ticket B-011 is 'cancelled'; cannot check in.")
  })

  it('retries a dropped answer once with the same key, so the action happens once', async () => {
    const good = createMockApi({ delayMs: 0, now })
    const keys: (string | undefined)[] = []
    const dropsFirst: TwenApi = {
      ...good,
      callNext: async (c, key) => {
        keys.push(key)
        const result = await good.callNext(c, key)
        if (keys.length === 1) throw new TypeError('Failed to fetch') // done on the server, answer lost
        return result
      },
    }
    const { user } = await setup(dropsFirst)
    await user.click(screen.getByRole('button', { name: 'Call next patient' }))
    expect(keys).toHaveLength(2)
    expect(keys[0]).toBe(keys[1])
    expect(screen.getByRole('button', { name: /^At desk/ })).toHaveTextContent('At desk 3') // 2 in the seed + 1, not + 2
  })

  it('ignores a second tap while the first is still running', async () => {
    const good = createMockApi({ delayMs: 50, now })
    let calls = 0
    const counting: TwenApi = { ...good, callNext: (...a) => (calls++, good.callNext(...a)) }
    const { user } = await setup(counting)
    const button = screen.getByRole('button', { name: 'Call next patient' })
    await user.dblClick(button)
    await screen.findByText('B-006 called to the desk.', { selector: '.feedback' })
    expect(calls).toBe(1)
  })
})

describe('move up', () => {
  it('needs a reason, then moves the patient and logs the reason', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Move up B-013' }))
    const dialog = screen.getByRole('dialog', { name: 'Move B-013 up' })
    expect(within(dialog).getByLabelText('New place')).toHaveFocus()
    await user.click(within(dialog).getByRole('button', { name: 'Move B-013' }))
    expect(within(dialog).getByRole('alert')).toHaveTextContent('Choose a reason. Every move is logged.')
    await user.selectOptions(within(dialog).getByLabelText('Reason'), 'emergency')
    await user.click(within(dialog).getByRole('button', { name: 'Move B-013' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(feedback()).toHaveTextContent('B-013 moved to place 1.')
    expect(within(row('B-013')).getAllByRole('cell')[0]).toHaveTextContent('1')
    expect(log()).toHaveTextContent('B-013 moved from place 8 to 1. Reason: Emergency. By Ama B.')
  })

  it('refuses a place that is not higher up', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Move up B-006' })) // already at place 1
    const dialog = screen.getByRole('dialog')
    await user.selectOptions(within(dialog).getByLabelText('Reason'), 'priority')
    await user.click(within(dialog).getByRole('button', { name: 'Move B-006' }))
    expect(within(dialog).getByRole('alert')).toHaveTextContent('already at place 1')
  })

  it('closes with Escape and gives focus back to the button that opened it', async () => {
    const { user } = await setup()
    const opener = screen.getByRole('button', { name: 'Move up B-013' })
    await user.click(opener)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('cannot be closed while the move is still on its way', async () => {
    const good = createMockApi({ delayMs: 0, now })
    let release!: () => void
    const gate = new Promise<void>((r) => (release = r))
    const slow: TwenApi = { ...good, overridePosition: async (...a) => (await gate, good.overridePosition(...a)) }
    const { user } = await setup(slow)
    await user.click(screen.getByRole('button', { name: 'Move up B-013' }))
    const dialog = screen.getByRole('dialog')
    await user.selectOptions(within(dialog).getByLabelText('Reason'), 'emergency')
    await user.click(within(dialog).getByRole('button', { name: 'Move B-013' }))
    await user.keyboard('{Escape}')
    await user.click(within(dialog).getByRole('button', { name: 'Cancel' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    release()
    expect(await screen.findByText('B-013 moved to place 1.', { selector: '.feedback' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('keeps Tab inside the dialog', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: 'Move up B-013' }))
    const dialog = screen.getByRole('dialog')
    for (let i = 0; i < 6; i++) await user.tab()
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })
})

describe('log refresh', () => {
  it('after the first load, asks only for events newer than the last one it has', async () => {
    const good = createMockApi({ delayMs: 0, now })
    const afters: (number | undefined)[] = []
    const spy: TwenApi = { ...good, listEvents: (c, after) => (afters.push(after), good.listEvents(c, after)) }
    const { user } = await setup(spy)
    await user.click(screen.getByRole('button', { name: 'Check in B-011' }))
    await user.click(screen.getByRole('button', { name: 'Mark done B-004' }))
    expect(afters[0]).toBeUndefined()
    expect(afters.at(-1)).toBeGreaterThan(0)
    expect(log()).toHaveTextContent('B-011 checked in.')
    expect(log()).toHaveTextContent('B-004 marked done.')
  })
})
