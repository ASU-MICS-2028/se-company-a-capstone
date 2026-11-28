/**
 * Turns what a patient types into the E.164 form the contract wants (+233XXXXXXXXX).
 * Accepts "024 400 0111", "0244000111", "+233 24 400 0111" and "233244000111".
 * Returns null if it isn't a Ghanaian mobile number (10 digits starting with 0, or 9 after +233).
 */
export function toE164(typed: string): string | null {
  const digits = typed.replace(/[\s\-().]/g, '')
  let national: string | null = null
  if (/^0\d{9}$/.test(digits)) national = digits.slice(1)
  else if (/^\+233\d{9}$/.test(digits)) national = digits.slice(4)
  else if (/^233\d{9}$/.test(digits)) national = digits.slice(3)
  if (national === null || national.startsWith('0')) return null
  return `+233${national}`
}
