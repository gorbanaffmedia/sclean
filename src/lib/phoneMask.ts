/**
 * Strict phone mask for the contact field: only digits are kept and the
 * result is formatted as `+7 (xxx) xxx-xx-xx` while the user types.
 */

/** Up to 10 national digits: non-digits removed, leading 7/8 dropped. */
export function phoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '')
  return (/^[78]/.test(digits) ? digits.slice(1) : digits).slice(0, 10)
}

/** Formats any input as `+7 (xxx) xxx-xx-xx`, growing with the digits typed. */
export function maskPhoneInput(value: string): string {
  const national = phoneDigits(value)

  if (!national) {
    // keep "+7" after a lone leading 7/8 so it can be erased naturally
    return /^[78]/.test(value.replace(/\D/g, '')) ? '+7' : ''
  }

  let out = '+7 (' + national.slice(0, 3)
  if (national.length > 3) out += ') ' + national.slice(3, 6)
  if (national.length > 6) out += '-' + national.slice(6, 8)
  if (national.length > 8) out += '-' + national.slice(8, 10)
  return out
}
