// Short names for the types generated from Eric's API contract (docs/architecture/openapi.yaml).
// Never edit schema.d.ts by hand: run `npm run gen:api` after the contract changes.
import type { components } from './schema'

type S = components['schemas']

export type Ticket = S['Ticket']
export type TicketStatus = S['TicketStatus']
export type Channel = Ticket['channel']
export type TravelBand = S['TravelBand']
export type WaitRange = S['WaitRange']
export type Clinic = S['Clinic']
export type QueueEvent = S['Event']
export type OverrideInput = S['OverrideInput']
export type DeskTicketInput = S['DeskTicketInput']
export type WebTicketInput = S['WebTicketInput']
export type PublicTicket = S['PublicTicket']
export type Problem = S['Problem']

export interface QueueResponse {
  clinicId: string
  generatedAt: string
  tickets: Ticket[]
}

/** An error the API answered with (application/problem+json). */
export class ApiError extends Error {
  readonly status: number
  readonly problem: Problem

  constructor(problem: Problem) {
    super(problem.detail ?? problem.title)
    this.name = 'ApiError'
    this.status = problem.status
    this.problem = problem
  }
}
