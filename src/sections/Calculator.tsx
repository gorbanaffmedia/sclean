import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CALC } from '../data/content'
import { AREA_OPTIONS, SERVICES, WHEN_OPTIONS, serviceLabel } from '../data/services'
import { useBooking } from '../booking'
import { isContactValid, submitLead } from '../lib/lead'
import { maskPhoneInput } from '../lib/phoneMask'
import { Button } from '../components/Button'
import { LeadStatus, type FormStatus } from '../components/LeadStatus'
import { Reveal } from '../components/Reveal'

const TOTAL = 4

interface Option {
  key: string
  label: string
  selected: boolean
  pick: () => void
}

export function Calculator() {
  const { answers, step, setStep, setAnswer } = useBooking()
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<FormStatus>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  // After Next / Back, move focus to the new question (not on external preselect).
  useEffect(() => {
    if (moved.current) {
      questionRef.current?.focus({ preventScroll: true })
      moved.current = false
    }
  }, [step])

  const go = (next: number) => {
    moved.current = true
    setStep(next)
  }

  const optionsByStep: Record<number, Option[]> = {
    1: SERVICES.map((s) => ({
      key: s.id,
      label: s.label,
      selected: answers.service === s.id,
      pick: () => setAnswer('service', s.id),
    })),
    2: AREA_OPTIONS.map((o) => ({ key: o, label: o, selected: answers.area === o, pick: () => setAnswer('area', o) })),
    3: WHEN_OPTIONS.map((o) => ({ key: o, label: o, selected: answers.when === o, pick: () => setAnswer('when', o) })),
  }
  const options = optionsByStep[step]

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isContactValid(contact)) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    const result = await submitLead({
      source: 'calculator',
      service: answers.service ? serviceLabel(answers.service) : 'не выбрано',
      product: answers.product,
      area: answers.area ?? undefined,
      when: answers.when ?? undefined,
      contact: contact.trim(),
    })
    setStatus(result)
  }

  const summary = [
    answers.product ?? (answers.service ? serviceLabel(answers.service) : null),
    answers.area,
    answers.when,
  ].filter((s, i, all): s is string => Boolean(s) && all.indexOf(s) === i)

  return (
    <section className="section section--navy" id="calc" aria-labelledby="calc-title">
      <div className="container">
        <Reveal className="calc">
          <div className="calc__side">
            <div className="calc__intro">
              <h2 id="calc-title">{CALC.title}</h2>
              <p className="lead">{CALC.lead}</p>
            </div>
            {summary.length > 0 && (
              <ul className="calc__summary" aria-label="Ваши ответы">
                {summary.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="calc__main">
            <div
              className="calc__progress"
              role="progressbar"
              aria-label="Прогресс расчёта"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={step * 25}
            >
              <span style={{ width: `${step * 25}%` }} />
            </div>
            <p className="calc__step" aria-live="polite">
              Шаг {step} из {TOTAL}
            </p>
            <h3 className="calc__q" ref={questionRef} tabIndex={-1} id="calc-q">
              {step === TOTAL ? <label htmlFor="calc-contact">{CALC.questions[step - 1]}</label> : CALC.questions[step - 1]}
            </h3>

            {options ? (
              <div className="options" role="group" aria-labelledby="calc-q">
                {options.map((o) => (
                  <button key={o.key} type="button" className="option" aria-pressed={o.selected} onClick={o.pick}>
                    {o.label}
                  </button>
                ))}
              </div>
            ) : (
              <form className="calc__form" onSubmit={onSubmit} noValidate>
                <input
                  id="calc-contact"
                  className="field field--dark"
                  type="tel"
                  autoComplete="tel"
                  placeholder={CALC.placeholder}
                  value={contact}
                  aria-invalid={status === 'invalid'}
                  aria-describedby="calc-status"
                  onChange={(e) => {
                    setContact(maskPhoneInput(e.target.value))
                    if (status === 'invalid') setStatus(null)
                  }}
                />
                <Button type="submit" variant="lime" block disabled={status === 'sending'}>
                  {status === 'sending' ? 'Отправляем…' : CALC.submit}
                </Button>
                <LeadStatus id="calc-status" status={status} />
              </form>
            )}

            <div className="calc__nav">
              {step > 1 ? (
                <Button variant="ghost-dark" onClick={() => go(step - 1)}>
                  {CALC.back}
                </Button>
              ) : (
                <span />
              )}
              {step < TOTAL && (
                <Button variant="lime" onClick={() => go(step + 1)}>
                  {CALC.next}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
