/** Yandex Metrika. The counter itself is loaded by the snippet in index.html. */
export const METRIKA_ID = 105845736

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

/** Sends a goal if the counter is loaded; a no-op during SSR or when Metrika is blocked. */
export function reachGoal(goal: string, params?: object) {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return
  try {
    window.ym(METRIKA_ID, 'reachGoal', goal, params)
  } catch {
    // analytics must never break the page
  }
}
