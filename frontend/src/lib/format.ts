// The clinic's time zone. Ghana is UTC+0 all year, but naming it keeps this right if that changes.
const TIME_ZONE = 'Africa/Accra'

const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TIME_ZONE })
const dayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: TIME_ZONE })

/** "09:40" */
export const formatTime = (iso: string | Date) => timeFmt.format(typeof iso === 'string' ? new Date(iso) : iso)

/** "Mon 30 Nov" */
export const formatDay = (d: Date) => dayFmt.format(d).replace(',', '')

/** "10:30 to 10:45". A range, never one time, as the contract asks. No dashes (style rule). */
export const formatRange = (fromIso: string, toIso: string) => `${formatTime(fromIso)} to ${formatTime(toIso)}`
