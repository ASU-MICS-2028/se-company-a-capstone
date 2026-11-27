import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { api as defaultApi, type TwenApi } from '../api/client'
import { ApiError, type PublicTicket } from '../api/types'
import { formatTime } from '../lib/format'
import { PatientLayout } from './PatientLayout'
import { BANDS, isBand, leaveAdvice, type Band } from './travel'

const CLOSED = ['seen', 'no_show', 'cancelled']

type State = { kind: 'loading' } | { kind: 'missing' } | { kind: 'error' } | { kind: 'ready'; ticket: PublicTicket; at: number; stale: boolean }

interface Props {
  api?: TwenApi
  /** The contract asks the page to poll at most every 30 s. */
  refreshMs?: number
  now?: () => number
}

/** The patient's ticket page. It refreshes itself, and stops once the visit is over. */
export function TicketPage({ api = defaultApi, refreshMs = 30_000, now = Date.now }: Props) {
  const { ticketId = '' } = useParams()
  const [params] = useSearchParams()
  const bandParam = params.get('band')
  const band = isBand(bandParam) ? bandParam : null
  const [state, setState] = useState<State>({ kind: 'loading' })

  const load = useCallback(async () => {
    try {
      const ticket = await api.getWebTicket(ticketId)
      setState({ kind: 'ready', ticket, at: now(), stale: false })
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return setState({ kind: 'missing' })
      setState((s) => (s.kind === 'ready' ? { ...s, stale: true } : { kind: 'error' }))
    }
  }, [api, ticketId, now])

  const closed = state.kind === 'ready' && CLOSED.includes(state.ticket.status)

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    if (closed || refreshMs <= 0) return
    const id = setInterval(() => void load(), refreshMs)
    return () => clearInterval(id)
  }, [load, refreshMs, closed])

  return (
    <PatientLayout>
      {state.kind === 'loading' && <p role="status">Loading your ticket…</p>}
      {state.kind === 'missing' && (
        <div className="card-p card-p--plain" role="alert">
          <h1>We can’t find this ticket</h1>
          <p>Check the link in your text message, or dial the USSD code and choose “Check my ticket”.</p>
        </div>
      )}
      {state.kind === 'error' && (
        <div className="card-p card-p--plain" role="alert">
          <h1>We couldn’t load your ticket</h1>
          <p>Check your connection.</p>
          <button type="button" className="pbtn" onClick={() => void load()}>
            Try again
          </button>
        </div>
      )}
      {state.kind === 'ready' && <TicketView ticket={state.ticket} band={band} now={now()} />}
      {state.kind === 'ready' && (
        <p className="muted small" role="status">
          {state.stale ? 'No connection. Showing your ticket from ' : 'Updated '}
          <span className="mono">{formatTime(new Date(state.at))}</span>
          {closed ? '.' : '. This page updates by itself.'}
        </p>
      )}
    </PatientLayout>
  )
}

function TicketView({ ticket: t, band, now }: { ticket: PublicTicket; band: Band | null; now: number }) {
  const bandLabel = BANDS.find((b) => b.value === band)?.label.toLowerCase()
  return (
    <>
      <div className="ticket-head">
        <span className="muted small-label">Your ticket</span>
        <h1 className="ticket-code mono">{t.code}</h1>
      </div>
      <Status ticket={t} band={band} bandLabel={bandLabel} now={now} />
      <p className="muted small">
        Texts go to <span className="mono">{t.phoneMasked}</span>. Show this ticket number at the front desk when you arrive.
      </p>
    </>
  )
}

function Status({ ticket: t, band, bandLabel, now }: { ticket: PublicTicket; band: Band | null; bandLabel?: string; now: number }) {
  switch (t.status) {
    case 'waiting': {
      const advice = leaveAdvice(t, band, now)
      if (advice.kind === 'leaveAt')
        return (
          <section className="card-p card-p--wash" aria-label="When to leave">
            <p className="card-p__kicker">Leave home around</p>
            <p className="card-p__big">{formatTime(advice.at)}</p>
            <p>Based on {bandLabel} travel. We’ll text you if this changes, and again when it’s time to leave.</p>
          </section>
        )
      if (advice.kind === 'leaveNow') return <LeaveNow />
      return (
        <section className="card-p card-p--wash" aria-label="When to leave">
          <p className="card-p__kicker">You’re in the queue</p>
          <p>We’ll text you when it’s time to leave.</p>
        </section>
      )
    }
    case 'notified':
      return <LeaveNow holdUntil={t.holdUntil} />
    case 'arrived':
      return (
        <section className="card-p card-p--ok" aria-label="Status">
          <p className="card-p__big card-p__big--md">You’re checked in</p>
          <p>Please wait nearby. Staff will call your ticket number.</p>
        </section>
      )
    case 'called':
      return (
        <section className="card-p card-p--deep" aria-label="Status">
          <p className="card-p__kicker">It’s your turn</p>
          <p className="card-p__big card-p__big--md">Go to the desk now</p>
        </section>
      )
    case 'seen':
      return (
        <section className="card-p card-p--plain" aria-label="Status">
          <p className="card-p__big card-p__big--md">You’ve been seen</p>
          <p>Thank you for using Twɛn. You can close this page.</p>
        </section>
      )
    case 'no_show':
      return (
        <section className="card-p card-p--urgent" aria-label="Status">
          <p className="card-p__big card-p__big--md">You missed your turn</p>
          <p>If you still need to be seen today, ask at the front desk.</p>
        </section>
      )
    default:
      return (
        <section className="card-p card-p--plain" aria-label="Status">
          <p className="card-p__big card-p__big--md">This ticket was cancelled</p>
          <p>If this is a mistake, ask at the front desk.</p>
        </section>
      )
  }
}

function LeaveNow({ holdUntil }: { holdUntil?: string | null }) {
  return (
    <section className="card-p card-p--ember" aria-label="When to leave">
      <p className="card-p__kicker">It’s time</p>
      <p className="card-p__big">Leave now</p>
      <p>
        Head to the clinic and show your ticket number at the front desk.
        {holdUntil && (
          <>
            {' '}
            We hold your place until <span className="mono">{formatTime(holdUntil)}</span>.
          </>
        )}
      </p>
    </section>
  )
}
