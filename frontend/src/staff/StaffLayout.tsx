import type { ReactNode } from 'react'
import './staff.css'

// The demo's signed-in staff member. The branch comes with the account, so there is no clinic picker.
const STAFF = { name: 'Ama B.', role: 'Front desk' }

export function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="staff">
      <a className="skip-link" href="#main">
        Skip to the queue
      </a>
      <nav className="staff-nav" aria-label="Main">
        <span className="staff-nav__logo">Twɛn</span>
        <ul>
          <li>
            <a href="/staff" aria-current="page">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
              Live queue
            </a>
          </li>
        </ul>
        <div className="staff-nav__me">
          <b>{STAFF.name}</b>
          <span>{STAFF.role}</span>
        </div>
      </nav>
      <main id="main" className="staff-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
