import { useCallback, useEffect, useRef, useState } from 'react'
import { api as defaultApi, CLINIC_ID, type TwenApi } from '../api/client'
import type { Clinic, QueueEvent, Ticket, TicketStatus } from '../api/types'

export type QueueState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; clinic: Clinic; tickets: Ticket[]; events: QueueEvent[]; updatedAt: string }

// Every status, so the log can name a ticket even after it was cancelled. The filters choose what is shown.
const ALL: TicketStatus[] = ['waiting', 'notified', 'arrived', 'called', 'seen', 'no_show', 'cancelled']

/** Loads the clinic and its queue, and refreshes every `refreshMs`. Keeps the last good list if a refresh fails. */
export function useQueue(api: TwenApi = defaultApi, refreshMs = 15_000) {
  const [state, setState] = useState<QueueState>({ kind: 'loading' })
  const [refreshError, setRefreshError] = useState(false)
  const latest = useRef(0)

  const load = useCallback(async () => {
    const call = ++latest.current
    try {
      const [clinic, queue, events] = await Promise.all([api.getClinic(CLINIC_ID), api.getQueue(CLINIC_ID, ALL), api.listEvents(CLINIC_ID)])
      if (call !== latest.current) return // an older request finished late; ignore it
      setState({ kind: 'ready', clinic, tickets: queue.tickets, events, updatedAt: queue.generatedAt })
      setRefreshError(false)
    } catch (e) {
      if (call !== latest.current) return
      const message = e instanceof Error ? e.message : 'Something went wrong.'
      setState((s) => (s.kind === 'ready' ? s : { kind: 'error', message }))
      setRefreshError(true)
    }
  }, [api])

  useEffect(() => {
    void load()
    if (refreshMs <= 0) return
    const id = setInterval(() => void load(), refreshMs)
    return () => clearInterval(id)
  }, [load, refreshMs])

  return { state, refreshError, reload: load }
}
