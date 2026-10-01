import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ServiceId } from './data/services'

export interface CalcAnswers {
  service: ServiceId | null
  /** product card the visitor came from, if any */
  product?: string
  area: string | null
  when: string | null
}

interface Booking {
  answers: CalcAnswers
  step: number
  setStep: (step: number) => void
  setAnswer: <K extends keyof CalcAnswers>(key: K, value: CalcAnswers[K]) => void
  /**
   * Product / scope CTA → calculator. Selects the service only where the approved
   * calculator has a matching option; otherwise just remembers the product.
   */
  preselect: (opts: { service?: ServiceId; product?: string; when?: string }) => void
}

const BookingContext = createContext<Booking | null>(null)

const EMPTY: CalcAnswers = { service: null, area: null, when: null }

export function BookingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<CalcAnswers>(EMPTY)
  const [step, setStep] = useState(1)

  const setAnswer = useCallback<Booking['setAnswer']>((key, value) => {
    setAnswers((a) => ({ ...a, [key]: value, ...(key === 'service' ? { product: undefined } : null) }))
  }, [])

  const preselect = useCallback<Booking['preselect']>(({ service, product, when }) => {
    setAnswers((a) => ({
      ...a,
      service: service ?? (product ? null : a.service),
      product,
      when: when ?? a.when,
    }))
    setStep(1)
  }, [])

  const value = useMemo(() => ({ answers, step, setStep, setAnswer, preselect }), [answers, step, setAnswer, preselect])
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
