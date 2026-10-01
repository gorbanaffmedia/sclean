/**
 * Site-level configuration. Everything that must be decided before publication
 * lives here or in .env (see .env.example).
 */
export const SITE = {
  brand: 'ЧИСТО • ОМСК',
  /** Placeholder from the approved prototype — replace with the real number. */
  phoneDisplay: '+7 (3812) 00-00-00',
  /**
   * `tel:` link for the phone. Keep empty while the number is a placeholder:
   * the phone then renders as plain text instead of dialing a fake number.
   */
  phoneHref: '',
} as const

/**
 * Lead endpoint. Receives `POST` with a JSON `LeadPayload` (see lib/lead.ts).
 * Leave empty until a real receiver exists: the forms will then NOT pretend
 * the request was sent.
 */
export const LEAD_ENDPOINT: string = import.meta.env.VITE_LEAD_ENDPOINT ?? ''
