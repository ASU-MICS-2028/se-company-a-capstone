import { useEffect, useMemo, useRef, useState } from 'react'
import { api as defaultApi, CLINIC_ID, newIdempotencyKey, type TwenApi } from '../api/client'
import { ApiError, type Channel, type OverrideInput, type Ticket } from '../api/types'
import { formatDay, formatRange, formatTime } from '../lib/format'
import { describeEvent, rowActions } from './actions'
import { MoveUpDialog } from './MoveUpDialog'
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

type Feedback = { text: string; urgent: boolean }

export function QueuePage({ api = defaultApi, refreshMs, now = Date.now }: Props) {
  const { state, refreshError, reload } = useQueue(api, refreshMs)
  const [filter, setFilter] = useState<FilterLabel>('All')
  const [channel, setChannel] = useState<Channel | 'all'>('all')
  const [busy, setBusy] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [confirmMissed, setConfirmMissed] = useState<string | null>(null)
  const [moving, setMoving] = useState<Ticket | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const feedbackRef = useRef<HTMLParagraphElement>(null)
  // True while an action is on its way. A ref, not state, so two taps in the same moment both see it.
  const inFlight = useRef(false)
  const confirmRef = useRef<HTMLButtonElement>(null)
  // After "Keep", focus goes back to that row's "Mark missed" button instead of being lost.
  const [returnTo, setReturnTo] = useState<string | null>(null)

  useEffect(() => {
    if (confirmMissed) confirmRef.current?.focus()
  }, [confirmMissed])
  useEffect(() => {
    if (!returnTo) return
    document.querySelector<HTMLElement>(`[data-missed-for="${returnTo}"]`)?.focus()
    setReturnTo(null)
  }, [returnTo])

  const all = useMemo(() => (state.kind === 'ready' ? state.tickets : []), [state])
  const byChannel = useMemo(() => all.filter((t) => channel === 'all' || t.channel === channel), [all, channel])
  const shown = useMemo(() => {
    const wanted = STATUS_FILTERS.find((f) => f.label === filter)!.statuses
    return boardOrder(byChannel.filter((t) => wanted.includes(t.status)))
  }, [byChannel, filter])
  const arrivedCount = all.filter((t) => t.status === 'arrived').length
  const lineLength = all.filter((t) => t.position !== null).length

  /**
   * Runs one staff action. One idempotency key per tap: if the network drops the answer, the
   * action is retried once with the SAME key, so it can't happen twice.
   */
  async function run<T>(id: string, act: (key: string) => Promise<T>, done: (result: T) => Feedback) {
    // Buttons stay focusable while busy (aria-disabled), so a second tap is ignored here instead.
    if (inFlight.current) return false
    inFlight.current = true
    const key = newIdempotencyKey()
    setBusy(id)
    setFeedback(null)
    try {
      let result: T
      try {
        result = await act(key)
      } catch (e) {
        if (e instanceof ApiError) throw e
        result = await act(key) // network failure: try once more, same key
      }
      setFeedback(done(result))
      return true
    } catch (e) {
      const why = e instanceof ApiError ? (e.problem.detail ?? e.problem.title) : 'Check the connection and try again.'
      setFeedback({ text: `That didn’t work. ${why}`, urgent: true })
      return false
    } finally {
      inFlight.current = false
      setBusy(null)
      setConfirmMissed(null)
      await reload()
      // The button that was pressed may be gone now, so keyboard users continue from the result message.
      if (!moving) feedbackRef.current?.focus()
    }
  }

  const callNext = () =>
    run('call-next', (k) => api.callNext(CLINIC_ID, k), (t) =>
      t ? { text: `${t.code} called to the desk.`, urgent: false } : { text: 'Nobody has checked in yet.', urgent: false },
    )
  const checkIn = (t: Ticket) => run(t.id, (k) => api.markArrived(t.id, k), () => ({ text: `${t.code} checked in.`, urgent: false }))
  const markDone = (t: Ticket) => run(t.id, (k) => api.markSeen(t.id, k), () => ({ text: `${t.code} marked done.`, urgent: false }))
  const markMissed = (t: Ticket) => run(t.id, (k) => api.markNoShow(t.id, k), () => ({ text: `${t.code} marked missed.`, urgent: false }))

  const openMove = (t: Ticket, button: HTMLElement) => {
    opener.current = button
    setMoving(t)
  }
  const closeMove = () => {
    setMoving(null)
    opener.current?.focus()
  }
  const submitMove = async (input: OverrideInput) => {
    const t = moving!
    const ok = await run(t.id, (k) => api.overridePosition(t.id, input, k), (r) => ({
      text: `${t.code} moved to place ${r.position}.`,
      urgent: false,
    }))
    if (ok) closeMove()
  }

  const codeOf = (id: string) => all.find((t) => t.id === id)?.code
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

      {/* Always in the page, so screen readers announce each result. */}
      <p ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite" className={feedback?.urgent ? 'feedback notice--urgent' : 'feedback'}>
        {feedback?.text}
      </p>

      {state.kind === 'ready' && (
        <div className="board">
          <div className="board__main">
            <section className="card call" aria-label="Call the next patient">
              <p>
                <span className="mono call__count">{arrivedCount}</span> checked in and waiting
              </p>
              <button type="button" className="btn btn--primary btn--big" onClick={() => void callNext()} aria-disabled={busy !== null}>
                Call next patient
              </button>
            </section>

            <section className="card queue" aria-labelledby="queue-title">
              <h2 id="queue-title" className="visually-hidden">
                Queue list
              </h2>
              <div className="queue__toolbar">
                <div className="queue__filters" role="group" aria-label="Show status">
                  {STATUS_FILTERS.map((f) => {
                    const count = byChannel.filter((t) => f.statuses.includes(t.status)).length
                    return (
                      <button key={f.label} type="button" className="chip" aria-pressed={filter === f.label} onClick={() => setFilter(f.label)}>
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
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shown.map((t) => (
                        <tr key={t.id} className={t.status === 'called' ? 'row--desk' : undefined}>
                          <QueueCells ticket={t} now={now()} />
                          <td>
                            <div className="actions">
                              {confirmMissed === t.id ? (
                                <>
                                  <button ref={confirmRef} type="button" className="btn btn--small btn--urgent" aria-disabled={busy !== null} onClick={() => void markMissed(t)}>
                                    Yes, mark {t.code} missed
                                  </button>
                                  <button type="button" className="btn btn--small btn--ghost" onClick={() => {
                                      setConfirmMissed(null)
                                      setReturnTo(t.id)
                                    }}
                                  >
                                    Keep
                                  </button>
                                </>
                              ) : (
                                rowActions(t, now()).map((a) => (
                                  <ActionButton
                                    key={a}
                                    action={a}
                                    ticket={t}
                                    disabled={busy !== null}
                                    onCheckIn={() => void checkIn(t)}
                                    onDone={() => void markDone(t)}
                                    onMissed={() => setConfirmMissed(t.id)}
                                    onMoveUp={(el) => openMove(t, el)}
                                  />
                                ))
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="queue__updated">
                Updated <span className="mono">{formatTime(state.updatedAt)}</span>
              </p>
            </section>
          </div>

          <aside className="card log" aria-labelledby="log-title">
            <h2 id="log-title">Logged today</h2>
            {state.events.length === 0 ? (
              <p className="muted">Nothing yet. Every staff action shows here.</p>
            ) : (
              <ol>
                {[...state.events].reverse().map((e) => {
                  const text = describeEvent(e, codeOf)
                  return text ? (
                    <li key={e.seq}>
                      <span className="mono muted">{formatTime(e.at)}</span> <span>{text}</span>
                    </li>
                  ) : null
                })}
              </ol>
            )}
          </aside>
        </div>
      )}

      {moving && <MoveUpDialog ticket={moving} lineLength={lineLength} busy={busy !== null} onSubmit={(i) => void submitMove(i)} onClose={closeMove} />}
    </StaffLayout>
  )
}

function QueueCells({ ticket: t, now }: { ticket: Ticket; now: number }) {
  const label = STATUS_LABEL[t.status]
  const note = ticketNote(t, now)
  return (
    <>
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
    </>
  )
}

interface ActionProps {
  action: ReturnType<typeof rowActions>[number]
  ticket: Ticket
  disabled: boolean
  onCheckIn: () => void
  onDone: () => void
  onMissed: () => void
  onMoveUp: (el: HTMLElement) => void
}

/** Each button names its ticket for screen readers ("Check in B-011"), since many rows share the same words. */
function ActionButton({ action, ticket, disabled, onCheckIn, onDone, onMissed, onMoveUp }: ActionProps) {
  const label = { checkIn: 'Check in', moveUp: 'Move up', done: 'Mark done', missed: 'Mark missed' }[action]
  const kind = { checkIn: 'btn--ok', moveUp: 'btn--ghost', done: 'btn--ok', missed: 'btn--ghost' }[action]
  const onClick = (el: HTMLButtonElement) =>
    action === 'checkIn' ? onCheckIn() : action === 'done' ? onDone() : action === 'missed' ? onMissed() : onMoveUp(el)
  return (
    <button
      type="button"
      className={`btn btn--small ${kind}`}
      aria-disabled={disabled}
      aria-label={`${label} ${ticket.code}`}
      data-missed-for={action === 'missed' ? ticket.id : undefined}
      onClick={(e) => onClick(e.currentTarget)}
    >
      {label}
    </button>
  )
}
