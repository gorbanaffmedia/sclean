import { PRODUCTS, PRODUCTS_TITLE } from '../data/content'
import { useBooking } from '../booking'
import { ButtonLink } from '../components/Button'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

const CARD_SIZES = '(min-width: 1200px) 384px, (min-width: 810px) 413px, calc(100vw - 36px)'

export function Products() {
  const { preselect } = useBooking()
  return (
    <section className="section section--grey" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead id="services-title" title={PRODUCTS_TITLE} />
        <div className="product-grid">
          {PRODUCTS.map((p, i) => (
            <Reveal as="article" key={p.title} className={`product-card${p.primary ? ' product-card--primary' : ''}`} index={i % 3}>
              <div className="product-card__media">
                <Picture img={p.img} alt={p.alt} sizes={CARD_SIZES} />
              </div>
              <div className="product-card__body">
                {p.label && <p className="product-card__label">{p.label}</p>}
                <h3>{p.title}</h3>
                <p className="product-card__text">
                  <b>{p.sub}</b> {p.text}
                </p>
                <p className="product-card__price">{p.price}</p>
                <ButtonLink
                  href="#calc"
                  variant={p.primary ? 'dark' : 'outline'}
                  className="product-card__cta"
                  aria-label={`${p.cta}: ${p.title}`}
                  onClick={() => preselect({ service: p.service, product: p.title, when: p.when })}
                >
                  {p.cta}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
