import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { JoinPage } from './patient/JoinPage'
import { TicketPage } from './patient/TicketPage'
import { QueuePage } from './staff/QueuePage'
import './App.css'

export function Start() {
  return (
    <main className="start">
      <h1 className="wordmark">Twɛn</h1>
      <p>
        <Link to="/staff">Open the staff board</Link>
      </p>
      <p>
        <Link to="/join">Open the patient page</Link>
      </p>
    </main>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/staff" element={<QueuePage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/ticket/:ticketId" element={<TicketPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
