import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { api as defaultApi, CLINIC_ID, newIdempotencyKey, type TwenApi } from '../api/client'
import { ApiError } from '../api/types'
import { useLanguage } from './language'
import { PatientLayout } from './PatientLayout'
import { toE164 } from './phone'
import { BANDS, rememberBand, type Band } from './travel'

/** Join today's queue from a phone browser (contract: joinFromWeb). No login, no symptoms asked. */
export function JoinPage({ api = defaultApi }: { api?: TwenApi }) {
  const navigate = useNavigate()
  const [lang, setLang] = useLanguage()
  const [phone, setPhone] = useState('')
  const [band, setBand] = useState<Band | null>(null)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; band?: string; consent?: string; form?: string }>({})
  const [busy, setBusy] = useState(false)
  // One key per filled-in form. A retry after a lost answer reuses it and gets the same ticket back.
  const key = useRef<{ forInput: string; value: string } | null>(null)
  const ids = { phone: useId(), phoneErr: useId(), band: useId(), bandErr: useId(), consent: useId(), consentErr: useId(), hint: useId() }
  const firstBand = useRef<HTMLInputElement>(null)
  // Which field to focus once the error messages are on screen. Set on each failed send, so a
  // second failed send moves focus again.
  const [focusTo, setFocusTo] = useState<{ field: 'phone' | 'band' | 'consent' } | null>(null)

  // Focus after React has drawn the errors, so the field's error is part of what a screen reader reads out.
  useEffect(() => {
    if (!focusTo) return
    if (focusTo.field === 'band') firstBand.current?.focus()
    else document.getElementById(focusTo.field === 'phone' ? ids.phone : ids.consent)?.focus()
  }, [focusTo, ids.phone, ids.consent])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy) return
    const e164 = toE164(phone)
    const next = {
      phone: e164 ? undefined : 'Enter a Ghana mobile number, like 024 400 0111.',
      band: band ? undefined : 'Choose how long it takes you to get here.',
      consent: agreed ? undefined : 'Tick the box so we can text you about this visit.',
    }
    setErrors(next)
    if (!e164 || !band || !agreed) {
      // Move focus to the first problem, so keyboard and screen reader users find it.
      setFocusTo({ field: !e164 ? 'phone' : !band ? 'band' : 'consent' })
      return
    }
    const input = { phone: e164, travelBand: band, language: lang }
    const fingerprint = JSON.stringify(input)
    if (key.current?.forInput !== fingerprint) key.current = { forInput: fingerprint, value: newIdempotencyKey() }
    setBusy(true)
    try {
      const ticket = await api.joinFromWeb(CLINIC_ID, input, key.current.value)
      rememberBand(ticket.id, band)
      navigate(`/ticket/${ticket.id}?band=${band}`)
    } catch (err) {
      setErrors({ form: problemText(err) })
      setBusy(false)
    }
  }

  return (
    <PatientLayout lang={lang} onLang={setLang}>
      <h1>Join today’s queue</h1>
      <p className="lead">Get a ticket now, wait at home or work, and we’ll text you when to leave.</p>
      <form onSubmit={(e) => void submit(e)} noValidate className="pform">
        <div className="field">
          <label htmlFor={ids.phone}>Your phone number</label>
          <input
            id={ids.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            className="mono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={[ids.hint, errors.phone ? ids.phoneErr : ''].join(' ').trim()}
          />
          <small id={ids.hint} className="muted">
            We text your ticket and when to leave to this number.
          </small>
          {errors.phone && (
            <small id={ids.phoneErr} className="error">
              {errors.phone}
            </small>
          )}
        </div>

        <fieldset className="field" aria-describedby={errors.band ? ids.bandErr : undefined}>
          <legend id={ids.band}>
            How long does it take you to get here?
          </legend>
          <small className="muted">Include waiting for a trotro or taxi.</small>
          <div className="choices">
            {BANDS.map((b, i) => (
              <label key={b.value} className="choice">
                <input
                  ref={i === 0 ? firstBand : undefined}
                  aria-describedby={i === 0 && errors.band ? ids.bandErr : undefined}
                  type="radio" name="band" value={b.value} checked={band === b.value} onChange={() => setBand(b.value)} />
                <span>{b.label}</span>
              </label>
            ))}
          </div>
          {errors.band && (
            <small id={ids.bandErr} className="error">
              {errors.band}
            </small>
          )}
        </fieldset>

        <div className="field">
          <label className="consent">
            <input id={ids.consent} aria-invalid={!!errors.consent} type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} aria-describedby={errors.consent ? ids.consentErr : undefined} />
            <span>We keep your number only to text you about this visit, and delete it after 30 days.</span>
          </label>
          {errors.consent && (
            <small id={ids.consentErr} className="error">
              {errors.consent}
            </small>
          )}
        </div>

        {errors.form && (
          <p className="error error--box" role="alert">
            {errors.form}
          </p>
        )}

        <button type="submit" className="pbtn" aria-disabled={busy}>
          {busy ? 'Getting your ticket…' : 'Get my ticket'}
        </button>
      </form>
    </PatientLayout>
  )
}

function problemText(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 409) return err.problem.detail ?? 'This number is already in the queue.'
    if (err.status === 429) return 'Too many tries from this phone. Wait a minute, then try again.'
    return err.problem.detail ?? err.problem.title
  }
  return 'We couldn’t reach Twɛn. Check your connection and try again. You won’t get two tickets.'
}
