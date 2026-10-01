import { useState, type FormEvent } from 'react'
import { FINAL } from '../data/content'
import { FINAL_CHOICES, serviceLabel } from '../data/services'
import { useBooking } from '../booking'
import { isContactValid, submitLead } from '../lib/lead'
import { Button } from '../components/Button'
import { LeadStatus, type FormStatus } from '../components/LeadStatus'
import { Reveal } from '../components/Reveal'

export function FinalCta() {
  const { answers } = useBooking()
  const [choice, setChoice] = useState<string | null>(null)
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<FormStatus>(null)
  // Follows the calculator's service until the visitor picks a chip here.
  const selected = choice ?? (answers.service ? serviceLabel(answers.service) : null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isContactValid(contact)) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    setStatus(
      await submitLead({
        source: 'final-cta',
        service: selected ?? 'не выбрано',
        product: answers.product,
        contact: contact.trim(),
      }),
    )
  }

  return (
    <section className="section section--navy" id="final" aria-labelledby="final-title">
      <div className="container final">
        <Reveal className="final__copy">
          <h2 id="final-title">{FINAL.title}</h2>
          <p className="lead">{FINAL.lead}</p>
        </Reveal>
        <Reveal className="final__panel" index={1}>
          <form className="final__form" onSubmit={onSubmit} noValidate aria-labelledby="final-form-title">
            <h3 id="final-form-title">{FINAL.formTitle}</h3>
            <div className="chips" role="group" aria-labelledby="final-form-title">
              {FINAL_CHOICES.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={selected === c} onClick={() => setChoice(c)}>
                  {c}
                </button>
              ))}
            </div>
            <label htmlFor="final-contact" className="visually-hidden">
              {FINAL.placeholder}
            </label>
            <input
              id="final-contact"
              className="field field--dark"
              type="text"
              autoComplete="tel"
              placeholder={FINAL.placeholder}
              value={contact}
              aria-invalid={status === 'invalid'}
              aria-describedby="final-status"
              onChange={(e) => {
                setContact(e.target.value)
                if (status === 'invalid') setStatus(null)
              }}
            />
            <Button type="submit" variant="lime" block disabled={status === 'sending'}>
              {status === 'sending' ? 'Отправляем…' : FINAL.cta}
            </Button>
            <LeadStatus id="final-status" status={status} />
          </form>
        </Reveal>
      </div>
    </section>
  )
}
