import { useMemo, useState } from 'react'
import type { TwenApi } from '../api/client'
import type { Channel, Ticket } from '../api/types'
import { formatDay, formatRange, formatTime } from '../lib/format'
import { boardOrder, CHANNEL_LABEL, STATUS_FILTERS, STATUS_LABEL, ticketNote } from './status'
import { StaffLayout } from './StaffLayout'
import { useQueue } from './useQueue'

type FilterLabel = (typeof STATUS_FILTERS)[number]['label']

const STATUS_CLASS: Record<string, string> = {
  Booked: 'tag--booked',
  Arrived: 'tag--arrived',
  'At desk': 'tag--desk',
  Done: 'tag--done',
  Missed: 'tag--missed',
  Cancelled: 'tag--booked',
}

interface Props {
  api?: TwenApi
  refreshMs?: number
  now?: () => number
}

export function QueuePage({ api, refreshMs, now = Date.now }: Props) {
  const { state, refreshError, reload } = useQueue(api, refreshMs)
  const [filter, setFilter] = useState<FilterLabel>('All')
  const [channel, setChannel] = useState<Channel | 'all'>('all')

  const byChannel = useMemo(
    () => (state.kind === 'ready' ? state.tickets : []).filter((t) => channel === 'all' || t.channel === channel),
    [state, channel],
  )
  const shown = useMemo(() => {
    const wanted = STATUS_FILTERS.find((f) => f.label === filter)!.statuses
    return boardOrder(byChannel.filter((t) => wanted.includes(t.status)))
  }, [byChannel, filter])

  const today = new Date(now())

  return (
    <StaffLayout>
      <header className="staff-header">
        <p className="staff-header__meta">
          {formatDay(today)}, {state.kind === 'ready' ? state.clinic.name : 'Loading clinic'}
        </p>
        <h1>Today’s queue</h1>
      </header>

      {state.kind === 'loading' && <p role="status">Loading the queue…</p>}

      {state.kind === 'error' && (
        <div className="card notice notice--urgent" role="alert">
          <p>Could not load the queue. {state.message}</p>
          <button type="button" className="btn btn--primary" onClick={() => void reload()}>
            Try again
          </button>
        </div>
      )}

      {state.kind === 'ready' && (
        <section className="card queue" aria-labelledby="queue-title">
          <h2 id="queue-title" className="visually-hidden">
            Queue list
          </h2>
          <div className="queue__toolbar">
            <div className="queue__filters" role="group" aria-label="Show status">
              {STATUS_FILTERS.map((f) => {
                const count = byChannel.filter((t) => f.statuses.includes(t.status)).length
                return (
                  <button
                    key={f.label}
                    type="button"
                    className="chip"
                    aria-pressed={filter === f.label}
                    onClick={() => setFilter(f.label)}
                  >
                    {f.label} <span className="mono">{count}</span>
                  </button>
                )
              })}
            </div>
            <label className="queue__channel">
              Channel
              <select value={channel} onChange={(e) => setChannel(e.target.value as Channel | 'all')}>
                <option value="all">All</option>
                <option value="ussd">USSD</option>
                <option value="web">Web</option>
                <option value="desk">Walk-in</option>
              </select>
            </label>
          </div>

          {refreshError && (
            <p className="notice notice--urgent" role="status">
              Could not refresh. Showing the list from {formatTime(state.updatedAt)}.
            </p>
          )}

          {shown.length === 0 ? (
            <p className="queue__empty">No patients here right now.</p>
          ) : (
            <div className="queue__scroll">
              <table className="queue__table">
                <caption className="visually-hidden">
                  Patients, {filter === 'All' ? 'all statuses' : filter}, {shown.length} shown
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Place</th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Channel</th>
                    <th scope="col">Expected</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((t) => (
                    <QueueRow key={t.id} ticket={t} now={now()} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="queue__updated">
            Updated <span className="mono">{formatTime(state.updatedAt)}</span>
          </p>
        </section>
      )}
    </StaffLayout>
  )
}

function QueueRow({ ticket: t, now }: { ticket: Ticket; now: number }) {
  const label = STATUS_LABEL[t.status]
  const note = ticketNote(t, now)
  return (
    <tr className={t.status === 'called' ? 'row--desk' : undefined}>
      <td className="mono muted">{t.position ?? ''}</td>
      <th scope="row">
        <span className="mono ticket">{t.code}</span>
        <small className="mono muted block">joined {formatTime(t.issuedAt)}</small>
      </th>
      <td className="mono">{t.phoneMasked ?? <span className="muted">No phone</span>}</td>
      <td>
        <span className="tag tag--channel">{CHANNEL_LABEL[t.channel]}</span>
      </td>
      <td className="mono">{t.predictedWait ? formatRange(t.predictedWait.expectedFrom, t.predictedWait.expectedTo) : ''}</td>
      <td>
        <span className={`tag ${STATUS_CLASS[label]}`}>{label}</span>
        {note && <small className={note.urgent ? 'note note--urgent' : 'note'}>{note.text}</small>}
      </td>
    </tr>
  )
}
