import { CASES } from '../data/content'
import { ButtonLink } from '../components/Button'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

const HALF = '(min-width: 1200px) 192px, (min-width: 810px) 213px, 50vw'

export function Cases() {
  return (
    <section className="section section--grey" id="works" aria-labelledby="works-title">
      <div className="container">
        <SectionHead id="works-title" title={CASES.title} />
        <div className="case-grid">
          {CASES.items.map((c, i) => (
            <Reveal as="article" key={c.title} className="case" index={i}>
              <div className="case__visual">
                <figure>
                  <Picture img={c.before} alt={`${c.title}: до уборки`} sizes={HALF} />
                  <figcaption>ДО</figcaption>
                </figure>
                <figure>
                  <Picture img={c.after} alt={`${c.title}: после уборки`} sizes={HALF} />
                  <figcaption>ПОСЛЕ</figcaption>
                </figure>
              </div>
              <div className="case__body">
                <h3>{c.title}</h3>
                <p className="small">{c.text}</p>
                <dl className="case__stats">
                  {c.stats.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="section-cta">
          <ButtonLink href="#calc">{CASES.cta}</ButtonLink>
        </div>
      </div>
    </section>
  )
}
