import { LEAD_ENDPOINT } from '../config'

export interface LeadPayload {
  source: 'calculator' | 'final-cta'
  service: string
  product?: string
  area?: string
  when?: string
  contact: string
}

export type LeadResult = 'sent' | 'not-configured' | 'error'

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
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
    return res.ok ? 'sent' : 'error'
  } catch {
    return 'error'
  }
}

/** Valid only when the full Russian number is entered: 10 digits after the country code. */
export const isContactValid = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return (/^[78]/.test(digits) ? digits.slice(1) : digits).length === 10
}
