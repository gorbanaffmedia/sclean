import { useState } from 'react'
import { FAQ } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section section--grey" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHead id="faq-title" title={FAQ.title} />
        <Reveal className="faq-list">
          {FAQ.items.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <div key={q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3 className="faq-item__h">
                  <button
                    type="button"
                    className="faq-item__q"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{q}</span>
                    <span className="faq-item__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-item__a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
