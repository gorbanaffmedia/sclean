import { REVIEWS } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Reviews() {
  return (
    <section className="section" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHead id="reviews-title" title={REVIEWS.title} />
        <Reveal as="ul" className="ratings" aria-label="Рейтинги">
          {REVIEWS.ratings.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </Reveal>
        <div className="review-grid">
          {REVIEWS.items.map((r, i) => (
            <Reveal as="figure" key={r.service} className="review" index={i}>
              <figcaption>
                <h3>{r.service}</h3>
              </figcaption>
              <blockquote>
                <p>{r.quote}</p>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <Reveal as="ul" className="trust-strip" aria-label="Наши правила работы">
          {REVIEWS.trust.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
