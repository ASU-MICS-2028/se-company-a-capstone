import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import type { TwenApi } from '../../api/client'
import { createMockApi } from '../../api/mock'
import { ApiError } from '../../api/types'
import { QueuePage } from '../QueuePage'

const NOW = Date.parse('2026-11-30T10:00:00Z')
const now = () => NOW

function renderPage(api: TwenApi = createMockApi({ delayMs: 0, now })) {
  return render(
    <MemoryRouter>
      <QueuePage api={api} refreshMs={0} now={now} />
    </MemoryRouter>,
  )
}

const rows = () => within(screen.getByRole('table')).getAllByRole('row').slice(1) // skip the header

describe('staff queue screen', () => {
  it('shows a loading message first, then the list', async () => {
    renderPage()
    expect(screen.getByText('Loading the queue…')).toBeInTheDocument()
    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Today’s queue')
  })

  it('shows every ticket of the day except cancelled ones, with ticket number and status', async () => {
    renderPage()
    await screen.findByRole('table')
    expect(rows()).toHaveLength(14)
    const first = rows()[0]
    expect(within(first).getByRole('rowheader')).toHaveTextContent(/B-\d{3}/)
    expect(first).toHaveTextContent('At desk')
  })

  it('shows phones masked, and "No phone" for walk-ins without one', async () => {
    renderPage()
    await screen.findByRole('table')
    expect(screen.getAllByText(/\+233 24\*{5}\d{2}/).length).toBeGreaterThan(0)
    expect(screen.getAllByText('No phone').length).toBeGreaterThan(0)
    expect(document.body.textContent).not.toMatch(/\+233\d{9}/)
  })

  it('filters by status, and the pressed button says so', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('table')
    const arrived = screen.getByRole('button', { name: /^Arrived/ })
    await user.click(arrived)
    expect(arrived).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute('aria-pressed', 'false')
    expect(rows()).toHaveLength(3)
    for (const r of rows()) expect(r).toHaveTextContent('Arrived')
  })

  it('filters by channel, and the counts follow', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('table')
    await user.selectOptions(screen.getByLabelText('Channel'), 'desk')
    for (const r of rows()) expect(r).toHaveTextContent('Walk-in')
    expect(screen.getByRole('button', { name: /^All/ })).toHaveTextContent(String(rows().length))
  })

  it('works with the keyboard alone', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('table')
    await user.tab() // skip link
    expect(screen.getByRole('link', { name: 'Skip to the queue' })).toHaveFocus()
    await user.tab() // Live queue
    await user.tab() // Call next patient
    expect(screen.getByRole('button', { name: 'Call next patient' })).toHaveFocus()
    await user.tab() // first filter: All
    await user.tab() // Booked
    expect(screen.getByRole('button', { name: /^Booked/ })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: /^Booked/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('warns when a "come now" text failed', async () => {
    renderPage()
    await screen.findByRole('table')
    expect(screen.getByText('Text failed')).toBeInTheDocument()
  })

  it('says so when a filter has nobody', async () => {
    const user = userEvent.setup()
    renderPage(createMockApi({ delayMs: 0, now, tickets: [] }))
    await screen.findByText('No patients here right now.')
    await user.click(screen.getByRole('button', { name: /^Missed/ }))
    expect(screen.getByText('No patients here right now.')).toBeInTheDocument()
  })

  it('shows an error with a retry button when the first load fails, and recovers', async () => {
    const user = userEvent.setup()
    const good = createMockApi({ delayMs: 0, now })
    let fail = true
    const flaky: TwenApi = {
      ...good,
      getQueue: (...args) =>
        fail ? Promise.reject(new ApiError({ type: 'about:blank', title: 'Server error', status: 500, detail: 'Database down.' })) : good.getQueue(...args),
    }
    renderPage(flaky)
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the queue. Database down.')
    fail = false
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('keeps the last list and says so when a later refresh fails', async () => {
    const good = createMockApi({ delayMs: 0, now })
    let calls = 0
    const failsSecondTime: TwenApi = {
      ...good,
      getQueue: (...args) => (++calls > 1 ? Promise.reject(new Error('Network down.')) : good.getQueue(...args)),
    }
    render(
      <MemoryRouter>
        <QueuePage api={failsSecondTime} refreshMs={30} now={now} />
      </MemoryRouter>,
    )
    await screen.findByRole('table')
    expect(await screen.findByText(/Could not refresh\. Showing the list from/)).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(rows()).toHaveLength(14)
  })

  it('ignores an older answer that arrives after a newer one', async () => {
    const good = createMockApi({ delayMs: 0, now })
    let calls = 0
    // The first request is slow and returns an empty list; the retry is fast and returns the real one.
    const racy: TwenApi = {
      ...good,
      getQueue: async (...args) => {
        const n = ++calls
        const real = await good.getQueue(...args)
        if (n === 1) {
          await new Promise((r) => setTimeout(r, 100))
          return { ...real, tickets: [] }
        }
        if (n > 2) return new Promise<never>(() => {}) // later refreshes never answer
        return real
      },
    }
    render(
      <MemoryRouter>
        <QueuePage api={racy} refreshMs={30} now={now} />
      </MemoryRouter>,
    )
    await screen.findByRole('table')
    await new Promise((r) => setTimeout(r, 150))
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.queryByText('No patients here right now.')).not.toBeInTheDocument()
  })
})
