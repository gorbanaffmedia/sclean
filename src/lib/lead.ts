import { LEAD_ENDPOINT } from '../config'

export interface LeadPayload {
  source: 'calculator' | 'final-cta'
  service: string
  product?: string
  area?: string
  when?: string
  contact: string
  consent: true
  additionalServices?: string[]
}

export type LeadResult = 'sent' | 'not-configured' | 'error'

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (payload.consent !== true || !isContactValid(payload.contact) || !payload.service.trim()) return 'error'
  if (!LEAD_ENDPOINT) {
    if (import.meta.env.DEV) console.info('[lead] endpoint not configured, payload:', payload)
    return 'not-configured'
  }
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.href, sentAt: new Date().toISOString() }),
    })
    if (!res.ok) return 'error'
    const result: unknown = await res.json()
    return typeof result === 'object' && result !== null && 'ok' in result && result.ok === true ? 'sent' : 'error'
  } catch {
    return 'error'
  }
}

/**
 * Valid when the full number is entered: exactly 10 digits after the country code, any digits.
 * "+…" must be "+7"; without "+", a leading 7/8 counts as the country code only in an 11-digit number.
 */
export const isContactValid = (value: string) => {
  const trimmed = value.trim()
  if (!/^\+?[\d\s()-]+$/.test(trimmed) || value.length > 64) return false
  const digits = trimmed.replace(/\D/g, '')
  let national = digits
  if (trimmed.startsWith('+')) {
    if (!digits.startsWith('7')) return false
    national = digits.slice(1)
  } else if (/^[78]\d{10}$/.test(digits)) {
    national = digits.slice(1)
  }
  return /^\d{10}$/.test(national)
}
