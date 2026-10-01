import { APPROACH } from '../data/content'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Approach() {
  return (
    <section className="section section--navy" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHead id="approach-title" title={APPROACH.title} />
        <div className="approach">
          <Reveal className="approach__media">
            <Picture img={APPROACH.img} alt={APPROACH.alt} sizes="(min-width: 1200px) 520px, (min-width: 810px) 850px, calc(100vw - 36px)" />
          </Reveal>
          <ul className="approach__cards">
            {APPROACH.cards.map((c, i) => (
              <Reveal as="li" key={c.title} className="trust-card" index={i}>
                <span className="badge" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{c.title}</h3>
                <p className="small">{c.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
