import { useEffect, useRef, useState } from 'react'
import { REVIEW_LINKS } from '../config'
import { REVIEWS } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

/** Long reviews are clamped; the toggle appears only when the text is actually cut off. */
function ReviewText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || expanded) return
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1)
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [expanded])

  return (
    <>
      <blockquote>
        <p ref={ref} className={expanded ? undefined : 'review__text--clamped'}>«{text}»</p>
      </blockquote>
      {(overflows || expanded) && (
        <button type="button" className="review__more" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Свернуть' : 'Читать полностью'}
        </button>
      )}
    </>
  )
}

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
        {REVIEW_LINKS.some((link) => /^https:\/\//.test(link.url)) && <div className="review-links">
          {REVIEW_LINKS.filter((link) => /^https:\/\//.test(link.url)).map((link) => (
            <a key={link.label} className="btn btn--outline" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
          ))}
        </div>}
        <div className="review-grid">
          {REVIEWS.items.map((r, i) => (
            <Reveal as="figure" key={i} className="review" index={i}>
              <figcaption className="review__meta">
                <span className="review__stars" role="img" aria-label={`Оценка ${r.rating} из 5`}>
                  {'★'.repeat(r.rating)}
                </span>
                <span className="review__author">{r.author}</span>
              </figcaption>
              <ReviewText text={r.quote} />
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
