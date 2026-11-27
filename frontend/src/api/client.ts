// The ONE place the screens get data from. Screens call `api.*` and never fetch directly.
// Today `api` is the in-memory mock. When Eric's backend is ready (#18), point `api` at an HTTP
// client with the same methods, and nothing else in the app changes.
import type { Clinic, OverrideInput, PublicTicket, QueueEvent, QueueResponse, Ticket, TicketStatus, WebTicketInput } from './types'
import { createMockApi } from './mock'

/**
 * Every staff write takes an optional `idempotencyKey` (the contract's `Idempotency-Key` header).
 * Sending the same key again returns the first answer instead of acting twice, which makes a retry
 * on a weak network safe. The board makes one key per tap and reuses it only to retry that tap.
 */
export interface TwenApi {
  /** GET /clinics/{clinicId} */
  getClinic(clinicId: string): Promise<Clinic>
  /** GET /clinics/{clinicId}/queue. Defaults to the active tickets, in calling order. */
  getQueue(clinicId: string, statuses?: TicketStatus[]): Promise<QueueResponse>
  /** GET /clinics/{clinicId}/events?after= */
  listEvents(clinicId: string, after?: number): Promise<QueueEvent[]>
  /** POST /clinics/{clinicId}/queue/call-next. Null means 204: nobody has checked in. */
  callNext(clinicId: string, idempotencyKey?: string): Promise<Ticket | null>
  /** POST /tickets/{ticketId}/arrived (check in) */
  markArrived(ticketId: string, idempotencyKey?: string): Promise<Ticket>
  /** POST /tickets/{ticketId}/seen (done) */
  markSeen(ticketId: string, idempotencyKey?: string): Promise<Ticket>
  /** POST /tickets/{ticketId}/no-show (missed). Always a staff decision. */
  markNoShow(ticketId: string, idempotencyKey?: string): Promise<Ticket>
  /** POST /tickets/{ticketId}/override (move up, with a reason that is logged) */
  overridePosition(ticketId: string, input: OverrideInput, idempotencyKey?: string): Promise<Ticket>
  /** POST /tickets/{ticketId}/cancel */
  cancelTicket(ticketId: string, idempotencyKey?: string): Promise<Ticket>

  // Patient web page: no login (contract tag `patient`).
  /** POST /clinics/{clinicId}/web-tickets. 409 if the phone already has a ticket (the answer says no more). */
  joinFromWeb(clinicId: string, input: WebTicketInput, idempotencyKey?: string): Promise<PublicTicket>
  /** GET /web-tickets/{ticketId}. 404 for USSD and desk tickets. */
  getWebTicket(ticketId: string): Promise<PublicTicket>
}

export const api: TwenApi = createMockApi()

/** The clinic this staff account belongs to. There is no clinic picker, by decision. */
export const CLINIC_ID = 'demo-opd'

/** A fresh key for one tap. */
export const newIdempotencyKey = () => crypto.randomUUID()
