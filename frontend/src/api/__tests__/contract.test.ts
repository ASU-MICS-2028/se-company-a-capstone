// Checks that what the mock returns has exactly the shape the API contract describes, by validating
// it against the schemas in docs/architecture/openapi.yaml. If Eric changes the contract, this fails
// until the mock is updated, so the frontend never drifts from the backend's promise.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Ajv2020 from 'ajv/dist/2020'
import addFormats from 'ajv-formats'
import { parse } from 'yaml'
import { createMockApi } from '../mock'

// TWEN_CONTRACT lets you check the mock against a contract file that is not on main yet.
const contractPath = process.env.TWEN_CONTRACT ?? resolve(__dirname, '../../../../docs/architecture/openapi.yaml')
const contract = parse(readFileSync(contractPath, 'utf8'))
const version: string = contract.info.version
// The mock follows contract v0.2 (PR #55). Until that is merged, main still has v0.1.
const isV02 = /^0\.2\./.test(version)

function validator(schemaName: string) {
  const ajv = new Ajv2020({ strict: false, allErrors: true })
  addFormats(ajv)
  ajv.addSchema({ $id: 'openapi', components: contract.components }, 'openapi')
  return ajv.compile({ $ref: `openapi#/components/schemas/${schemaName}` })
}

describe.skipIf(!isV02)(`mock matches the API contract (v${version})`, () => {
  const api = createMockApi({ delayMs: 0, now: () => Date.parse('2026-11-30T10:00:00Z') })

  it('every ticket in the queue is a valid Ticket', async () => {
    const check = validator('Ticket')
    const { tickets } = await api.getQueue('demo-opd', ['waiting', 'notified', 'arrived', 'called', 'seen', 'no_show', 'cancelled'])
    expect(tickets.length).toBeGreaterThan(0)
    for (const t of tickets) {
      expect(check(t), `${t.code}: ${JSON.stringify(check.errors)}`).toBe(true)
    }
  })

  it('the clinic is a valid Clinic', async () => {
    const check = validator('Clinic')
    const clinic = await api.getClinic('demo-opd')
    expect(check(clinic), JSON.stringify(check.errors)).toBe(true)
  })

  it('the validator really rejects a bad ticket', async () => {
    const check = validator('Ticket')
    const [t] = (await api.getQueue('demo-opd')).tickets
    expect(check({ ...t, status: 'at_desk' })).toBe(false)
    expect(check({ ...t, code: 'A1' })).toBe(false)
  })
})
