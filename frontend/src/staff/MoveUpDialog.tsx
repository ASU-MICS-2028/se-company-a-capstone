import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { OverrideInput, Ticket } from '../api/types'
import { REASON_LABEL } from './actions'

interface Props {
  ticket: Ticket
  lineLength: number
  busy: boolean
  onSubmit: (input: OverrideInput) => void
  onClose: () => void
}

/** Move a patient up. A reason is required and logged (contract: OverrideInput). */
export function MoveUpDialog({ ticket, lineLength, busy, onSubmit, onClose }: Props) {
  const titleId = useId()
  const errorId = useId()
  const noteHintId = useId()
  const box = useRef<HTMLDivElement>(null)
  const first = useRef<HTMLInputElement>(null)
  const [place, setPlace] = useState('1')
  const [reason, setReason] = useState<OverrideInput['reason'] | ''>('')
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    first.current?.focus()
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const n = Number(place)
    if (!Number.isInteger(n) || n < 1 || n > lineLength) return setError(`Choose a place from 1 to ${lineLength}.`)
    if (n >= (ticket.position ?? Infinity)) return setError(`${ticket.code} is already at place ${ticket.position}. Choose a smaller number.`)
    if (!reason) return setError('Choose a reason. Every move is logged.')
    setError(null)
    onSubmit({ reason, toPosition: n, note: note.trim() || null })
  }

  // Escape closes. Tab stays inside the dialog.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      if (!busy) onClose() // don't close while the move is on its way
      return
    }
    if (e.key !== 'Tab' || !box.current) return
    const items = box.current.querySelectorAll<HTMLElement>('input, select, button:not([disabled])')
    const firstItem = items[0]
    const lastItem = items[items.length - 1]
    if (e.shiftKey && document.activeElement === firstItem) {
      e.preventDefault()
      lastItem.focus()
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      e.preventDefault()
      firstItem.focus()
    }
  }

  return (
    <div className="backdrop">
      <div ref={box} className="dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={onKeyDown}>
        <h2 id={titleId}>
          Move <span className="mono">{ticket.code}</span> up
        </h2>
        <p className="muted">
          Now at place <span className="mono">{ticket.position}</span>. Everyone from the new place down moves back by one.
        </p>
        <form onSubmit={submit} noValidate className="form">
          <label>
            New place
            <input
              ref={first}
              type="number"
              inputMode="numeric"
              min={1}
              max={lineLength}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              aria-describedby={error ? errorId : undefined}
            />
          </label>
          <label>
            Reason
            <select value={reason} onChange={(e) => setReason(e.target.value as OverrideInput['reason'])} required>
              <option value="">Choose a reason</option>
              {Object.entries(REASON_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Note (optional)
            <input type="text" maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} aria-describedby={noteHintId} />
            <small id={noteHintId} className="muted">
              Don’t write symptoms or a diagnosis.
            </small>
          </label>
          {error && (
            <p id={errorId} role="alert" className="notice--urgent">
              {error}
            </p>
          )}
          <div className="dialog__buttons">
            <button type="submit" className="btn btn--primary" disabled={busy}>
              Move {ticket.code}
            </button>
            <button type="button" className="btn btn--ghost" aria-disabled={busy} onClick={() => !busy && onClose()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
