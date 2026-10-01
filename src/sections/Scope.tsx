import { useRef, useState, type KeyboardEvent } from 'react'
import { SCOPE } from '../data/content'
import { useBooking } from '../booking'
import { ButtonLink } from '../components/Button'
import { CheckList } from '../components/CheckList'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

/** «Что именно делаем»: WAI-ARIA tabs (arrow keys / Home / End, roving tabindex). */
export function Scope() {
  const { preselect } = useBooking()
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const count = SCOPE.tabs.length

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (keys[e.key] + count) % count
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="section" id="scope" aria-labelledby="scope-title">
      <div className="container">
        <SectionHead id="scope-title" title={SCOPE.title} />

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Виды работ">
            {SCOPE.tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                className="tab"
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                {t.tab}
              </button>
            ))}
          </div>

          {SCOPE.tabs.map((t, i) => (
            <div
              key={t.id}
              role="tabpanel"
              id={`panel-${t.id}`}
              aria-labelledby={`tab-${t.id}`}
              hidden={i !== active}
              className="scope-panel"
            >
              <div className={`scope-panel__media${t.media.length > 1 ? ' scope-panel__media--mosaic' : ''}`}>
                {t.media.map((m) => (
                  <figure key={m.alt}>
                    <Picture
                      img={m.img}
                      alt={m.alt}
                      sizes={t.media.length > 1 ? '(min-width: 1200px) 280px, 50vw' : '(min-width: 1200px) 570px, calc(100vw - 36px)'}
                    />
                    {m.caption && <figcaption>{m.caption}</figcaption>}
                  </figure>
                ))}
              </div>
              <div className="scope-panel__body">
                <h3>{t.title}</h3>
                {t.pain && (
                  <p className="scope-panel__pain">
                    <b>{t.pain}</b>
                  </p>
                )}
                <CheckList items={t.items} />
                {t.result && (
                  <p>
                    <b>Результат:</b> {t.result}
                  </p>
                )}
                {t.cta && (
                  <ButtonLink href="#calc" className="scope-panel__cta" onClick={() => preselect({ service: t.cta!.service })}>
                    {t.cta.label}
                  </ButtonLink>
                )}
              </div>
            </div>
          ))}

          <div className="scope-extra">
            <h3>{SCOPE.extra.title}</h3>
            <ul className="tags">
              {SCOPE.extra.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
