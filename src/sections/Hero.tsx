import { Fragment, type CSSProperties } from 'react'
import { HERO } from '../data/content'
import { IMG } from '../data/images'
import { ButtonLink } from '../components/Button'
import { Picture } from '../components/Picture'

export function Hero() {
  const words = HERO.title.split(' ')
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" aria-label={HERO.title}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span aria-hidden="true" className="h1-word" style={{ '--i': i } as CSSProperties}>
                  {w}
                </span>{' '}
              </Fragment>
            ))}
          </h1>
          <p className="lead hero__lead">{HERO.lead}</p>
          <ul className="hero__benefits">
            {HERO.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="hero__actions">
            <ButtonLink href="#calc">{HERO.primary}</ButtonLink>
            <ButtonLink href="#scope" variant="outline">
              {HERO.secondary}
            </ButtonLink>
          </div>
        </div>
        <div className="hero__media">
          <Picture img={IMG.hero} alt={HERO.imageAlt} sizes="535px" eager />
        </div>
      </div>
      <ul className="container hero__proofs">
        {HERO.proofs.map((p) => (
          <li key={p.value}>
            <strong>{p.value}</strong>
            <span>{p.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
