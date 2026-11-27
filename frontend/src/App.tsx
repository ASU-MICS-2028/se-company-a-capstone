import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { QueuePage } from './staff/QueuePage'
import './App.css'

export function Start() {
  return (
    <main className="start">
      <h1 className="wordmark">Twɛn</h1>
      <p>
        <Link to="/staff">Open the staff board</Link>
      </p>
      <p>The patient page comes next.</p>
    </main>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/staff" element={<QueuePage />} />
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
