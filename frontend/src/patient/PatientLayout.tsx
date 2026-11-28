import type { ReactNode } from 'react'
import type { Lang } from './language'
import './patient.css'

interface Props {
  children: ReactNode
  lang?: Lang
  onLang?: (l: Lang) => void
}

/** The patient's phone page: the Twɛn name, and the language choice in the corner. */
export function PatientLayout({ children, lang, onLang }: Props) {
  return (
    <div className="patient">
      <header className="patient__top">
        <span className="patient__logo">Twɛn</span>
        {lang && onLang && (
          <div className="lang" role="group" aria-label="Language for your texts">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => onLang('en')}>
              EN
            </button>
            <button type="button" aria-pressed={lang === 'tw'} onClick={() => onLang('tw')}>
              Twi
            </button>
          </div>
        )}
      </header>
      <main className="patient__main">{children}</main>
    </div>
  )
}
