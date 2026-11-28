// The ONE place the screens get data from. Screens call `api.*` and never fetch directly.
// Today `api` is the in-memory mock. When Eric's backend is ready (#18), point `api` at an HTTP
// client with the same methods, and nothing else in the app changes.
import type { Clinic, QueueEvent, QueueResponse, TicketStatus } from './types'
import { createMockApi } from './mock'

export interface TwenApi {
  /** GET /clinics/{clinicId} */
  getClinic(clinicId: string): Promise<Clinic>
  /** GET /clinics/{clinicId}/queue. Defaults to the active tickets, in calling order. */
  getQueue(clinicId: string, statuses?: TicketStatus[]): Promise<QueueResponse>
  /** GET /clinics/{clinicId}/events?after= */
  listEvents(clinicId: string, after?: number): Promise<QueueEvent[]>
}

export const api: TwenApi = createMockApi()

/** The clinic this staff account belongs to. There is no clinic picker, by decision. */
export const CLINIC_ID = 'demo-opd'
