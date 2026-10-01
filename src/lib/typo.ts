/**
 * Russian typographic line-breaking: non-breaking spaces before dashes, after short
 * prepositions used with numbers («от», «до»), and between a number and its unit.
 * Changes only whitespace — never the wording.
 */
const NBSP = ' '

export function typo(s: string): string {
  return s
    .replace(/ (—|–)/g, `${NBSP}$1`)
    .replace(/(^|\s)(от|до) (?=[\d[])/g, `$1$2${NBSP}`)
    .replace(/(\d) (?=\d{3}\b)/g, `$1${NBSP}`)
    .replace(/(\d|\]) (?=(м²|₽|ч\.|чел\.|часов|клинеров)(?![\p{L}]))/gu, `$1${NBSP}`)
}

/** Applies `typo` to every string in a nested data structure. */
export function typoDeep<T>(value: T): T {
  if (typeof value === 'string') return typo(value) as T
  if (Array.isArray(value)) return value.map(typoDeep) as T
  if (value && typeof value === 'object' && !('base' in value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typoDeep(v)])) as T
  }
  return value
}
