import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import type { TwenApi } from '../../api/client'
import { createMockApi } from '../../api/mock'
import { ApiError } from '../../api/types'
import { JoinPage } from '../JoinPage'
import { TicketPage } from '../TicketPage'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const now = () => NOW

function renderApp(api: TwenApi, path = '/join') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/join" element={<JoinPage api={api} />} />
        <Route path="/ticket/:ticketId" element={<TicketPage api={api} refreshMs={0} now={now} />} />
      </Routes>
    </MemoryRouter>,
  )
}

async function fillAndSend(user: ReturnType<typeof userEvent.setup>, phone = '024 400 0111') {
  await user.type(screen.getByLabelText('Your phone number'), phone)
  // A short trip, so with the mock's short queue there is still time before leaving.
  await user.click(screen.getByRole('radio', { name: 'Under 15 min' }))
  await user.click(screen.getByRole('checkbox'))
  await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
}

beforeEach(() => {
  try {
    localStorage.clear()
  } catch {
    /* ignore */
  }
})

describe('join page', () => {
  it('has a labelled field for everything it asks, and no health questions', () => {
    renderApp(createMockApi({ delayMs: 0, now }))
    expect(screen.getByLabelText('Your phone number')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'How long does it take you to get here?' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(4)
    expect(screen.getByRole('checkbox', { name: /delete it after 30 days/ })).toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/symptom|pain|sick|illness|reason for visit/i)
  })

  it('explains every missing answer and moves focus to the first one', async () => {
    const user = userEvent.setup()
    renderApp(createMockApi({ delayMs: 0, now }))
    await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
    expect(screen.getByText('Enter a Ghana mobile number, like 024 400 0111.')).toBeInTheDocument()
    expect(screen.getByText('Choose how long it takes you to get here.')).toBeInTheDocument()
    expect(screen.getByText('Tick the box so we can text you about this visit.')).toBeInTheDocument()
    expect(screen.getByLabelText('Your phone number')).toHaveFocus()
    expect(screen.getByLabelText('Your phone number')).toHaveAttribute('aria-invalid', 'true')
  })

  it('gives a ticket and shows when to leave home, with no count of people ahead', async () => {
    const user = userEvent.setup()
    renderApp(createMockApi({ delayMs: 0, now }))
    await fillAndSend(user)
    expect(await screen.findByRole('heading', { name: /B-\d{3}/ })).toBeInTheDocument()
    expect(screen.getByText('Leave home around')).toBeInTheDocument()
    expect(screen.getByText(/Based on under 15 min travel/)).toBeInTheDocument()
    expect(screen.getByText('+233 24*****11')).toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/ahead of you|in line|position|place \d/i)
  })

  it('sends the language picked in the corner', async () => {
    const user = userEvent.setup()
    const api = createMockApi({ delayMs: 0, now })
    let sent = ''
    const spy: TwenApi = { ...api, joinFromWeb: (c, input, k) => ((sent = input.language), api.joinFromWeb(c, input, k)) }
    renderApp(spy)
    await user.click(screen.getByRole('button', { name: 'Twi' }))
    expect(screen.getByRole('button', { name: 'Twi' })).toHaveAttribute('aria-pressed', 'true')
    await fillAndSend(user)
    await screen.findByText('Leave home around')
    expect(sent).toBe('tw')
  })

  it('explains a phone that already has a ticket', async () => {
    const user = userEvent.setup()
    const api = createMockApi({ delayMs: 0, now })
    await api.joinFromWeb('demo-opd', { phone: '+233244000111', travelBand: '15_30', language: 'en' })
    renderApp(api)
    await fillAndSend(user)
    expect(await screen.findByRole('alert')).toHaveTextContent('This number is already in the queue. Dial the USSD code and choose Check my ticket.')
  })

  it('retries with the same key after a lost answer, so the patient gets one ticket', async () => {
    const user = userEvent.setup()
    const api = createMockApi({ delayMs: 0, now })
    const keys: (string | undefined)[] = []
    let first = true
    const lossy: TwenApi = {
      ...api,
      joinFromWeb: async (c, input, k) => {
        keys.push(k)
        const t = await api.joinFromWeb(c, input, k)
        if (first) {
          first = false
          throw new TypeError('Failed to fetch')
        }
        return t
      },
    }
    renderApp(lossy)
    await fillAndSend(user)
    expect(await screen.findByRole('alert')).toHaveTextContent('You won’t get two tickets.')
    await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
    expect(await screen.findByText('Leave home around')).toBeInTheDocument()
    expect(keys[0]).toBe(keys[1])
  })

  it('says so when there are too many tries (429)', async () => {
    const user = userEvent.setup()
    const api = createMockApi({ delayMs: 0, now })
    renderApp({ ...api, joinFromWeb: () => Promise.reject(new ApiError({ type: 'about:blank', title: 'Too many', status: 429 })) })
    await fillAndSend(user)
    expect(await screen.findByRole('alert')).toHaveTextContent('Too many tries')
  })

  it('works with the keyboard alone', async () => {
    const user = userEvent.setup()
    renderApp(createMockApi({ delayMs: 0, now }))
    await user.tab() // EN
    await user.tab() // Twi
    await user.tab() // phone
    expect(screen.getByLabelText('Your phone number')).toHaveFocus()
    await user.keyboard('0244000111')
    await user.tab() // radio group
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: '15 to 30 min' })).toBeChecked()
    await user.tab() // consent
    await user.keyboard(' ')
    await user.tab()
    expect(screen.getByRole('button', { name: 'Get my ticket' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(await screen.findByRole('heading', { name: /B-\d{3}/ })).toBeInTheDocument()
  })
})

describe('join page focus', () => {
  it('when only the consent box is unticked, focuses that box and links its error', async () => {
    const user = userEvent.setup()
    renderApp(createMockApi({ delayMs: 0, now }))
    await user.type(screen.getByLabelText('Your phone number'), '024 400 0111')
    await user.click(screen.getByRole('radio', { name: 'Under 15 min' }))
    await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
    const box = screen.getByRole('checkbox')
    expect(box).toHaveFocus()
    expect(box).toHaveAccessibleDescription('Tick the box so we can text you about this visit.')
  })

  it('when only the travel time is missing, focuses the first choice', async () => {
    const user = userEvent.setup()
    renderApp(createMockApi({ delayMs: 0, now }))
    await user.type(screen.getByLabelText('Your phone number'), '024 400 0111')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
    expect(screen.getByRole('radio', { name: 'Under 15 min' })).toHaveFocus()
  })

  it('focuses the phone field again on a second failed send, with its error read out', async () => {
    const user = userEvent.setup()
    renderApp(createMockApi({ delayMs: 0, now }))
    await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
    await user.click(screen.getByRole('button', { name: 'Get my ticket' }))
    const phone = screen.getByLabelText('Your phone number')
    expect(phone).toHaveFocus()
    expect(phone).toHaveAccessibleDescription(/Enter a Ghana mobile number/)
  })
})

describe('ticket page', () => {
  it('opened from a text-message link with no ?band=, still says when to leave', async () => {
    const user = userEvent.setup()
    const api = createMockApi({ delayMs: 0, now })
    const first = renderApp(api)
    await fillAndSend(user)
    expect(await screen.findByText('Leave home around')).toBeInTheDocument()
    first.unmount()
    const t = (await api.getQueue('demo-opd', ['waiting'])).tickets.find((x) => x.channel === 'web' && x.code === 'B-015')!
    renderApp(api, `/ticket/${t.id}`)
    expect(await screen.findByText('Leave home around')).toBeInTheDocument()
    expect(localStorage.getItem(`twen.band.${t.id}`)).toBe('under_15')
    expect(JSON.stringify(localStorage)).not.toContain('4000111')
  })

  it('stops asking once the ticket is not found', async () => {
    const base = createMockApi({ delayMs: 0, now })
    let calls = 0
    const api: TwenApi = { ...base, getWebTicket: (id) => (calls++, base.getWebTicket(id)) }
    render(
      <MemoryRouter initialEntries={['/ticket/nope']}>
        <Routes>
          <Route path="/ticket/:ticketId" element={<TicketPage api={api} refreshMs={20} now={now} />} />
        </Routes>
      </MemoryRouter>,
    )
    await screen.findByRole('heading', { name: 'We can’t find this ticket' })
    await new Promise((r) => setTimeout(r, 120))
    expect(calls).toBe(1)
  })

  it('announces the card when it changes, not the refresh time', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const t = await api.joinFromWeb('demo-opd', { phone: '+233244000111', travelBand: 'under_15', language: 'en' })
    renderApp(api, `/ticket/${t.id}?band=under_15`)
    const card = await screen.findByText('Leave home around')
    expect(card.closest('[aria-live="polite"]')).not.toBeNull()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('follows the ticket through the visit', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const t = await api.joinFromWeb('demo-opd', { phone: '+233244000111', travelBand: 'under_15', language: 'en' })
    const { unmount } = renderApp(api, `/ticket/${t.id}?band=under_15`)
    expect(await screen.findByText('Leave home around')).toBeInTheDocument()
    unmount()

    await api.markArrived(t.id)
    const second = renderApp(api, `/ticket/${t.id}?band=under_15`)
    expect(await screen.findByText('You’re checked in')).toBeInTheDocument()
    second.unmount()

    // Call everyone ahead who has arrived, until this ticket is called.
    while ((await api.getWebTicket(t.id)).status !== 'called') await api.callNext('demo-opd')
    renderApp(api, `/ticket/${t.id}`)
    expect(await screen.findByText('Go to the desk now')).toBeInTheDocument()
  })

  it('says leave now when the trip is longer than the wait', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const t = await api.joinFromWeb('demo-opd', { phone: '+233244000111', travelBand: 'over_60', language: 'en' })
    renderApp(api, `/ticket/${t.id}?band=over_60`)
    expect(await screen.findByText('Leave now')).toBeInTheDocument()
  })

  it('says leave now once the text has gone out, with the hold time', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const notified = (await api.getQueue('demo-opd', ['notified'])).tickets.find((t) => t.channel === 'web')!
    renderApp(api, `/ticket/${notified.id}`)
    expect(await screen.findByText('Leave now')).toBeInTheDocument()
    expect(screen.getByText(/We hold your place until/)).toBeInTheDocument()
  })

  it('shows a plain message for an unknown or non-web ticket', async () => {
    renderApp(createMockApi({ delayMs: 0, now }), '/ticket/nope')
    expect(await screen.findByRole('heading', { name: 'We can’t find this ticket' })).toBeInTheDocument()
  })

  it('without a travel band, still tells the patient they are in the queue', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const t = await api.joinFromWeb('demo-opd', { phone: '+233244000111', travelBand: '30_60', language: 'en' })
    renderApp(api, `/ticket/${t.id}`)
    expect(await screen.findByText('You’re in the queue')).toBeInTheDocument()
  })

  it('shows Missed with what to do next', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const t = (await api.getQueue('demo-opd', ['notified'])).tickets.find((x) => x.channel === 'web')!
    await api.markNoShow(t.id)
    renderApp(api, `/ticket/${t.id}`)
    expect(await screen.findByText('You missed your turn')).toBeInTheDocument()
    expect(screen.getByText(/ask at the front desk/)).toBeInTheDocument()
  })

  it('keeps the last ticket when a refresh fails, and says so', async () => {
    const api = createMockApi({ delayMs: 0, now })
    const t = await api.joinFromWeb('demo-opd', { phone: '+233244000111', travelBand: 'under_15', language: 'en' })
    let calls = 0
    const flaky: TwenApi = { ...api, getWebTicket: (id) => (++calls > 1 ? Promise.reject(new TypeError('offline')) : api.getWebTicket(id)) }
    render(
      <MemoryRouter initialEntries={[`/ticket/${t.id}?band=under_15`]}>
        <Routes>
          <Route path="/ticket/:ticketId" element={<TicketPage api={flaky} refreshMs={30} now={now} />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await screen.findByText(/No connection. Showing your ticket from/)).toBeInTheDocument()
    expect(screen.getByText('Leave home around')).toBeInTheDocument()
  })
})
