import { SITUATIONS } from '../data/content'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Situations() {
  return (
    <section className="section section--grey" id="situations" aria-labelledby="situations-title">
      <div className="container">
        <SectionHead id="situations-title" title={SITUATIONS.title} />
        <div className="situations">
          {SITUATIONS.cards.map((c, i) => (
            <Reveal as="article" key={c.title} className={`situation${i === 1 ? ' situation--lime' : ''}`} index={i}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <p className="situation__strong">
                <b>{c.strong}</b>
              </p>
              <ButtonLink href="#calc" variant="outline" className="situation__cta">
                {c.cta}
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
