import { PRICING } from '../data/content'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'

export function Pricing() {
  return (
    <section className="section" id="prices" aria-labelledby="prices-title">
      <div className="container pricing">
        <Reveal className="pricing__head">
          <h2 id="prices-title">{PRICING.title}</h2>
        </Reveal>
        <Reveal className="price-panel" index={1}>
          <table className="price-table">
            <caption className="visually-hidden">{PRICING.title}</caption>
            <thead>
              <tr>
                <th scope="col">{PRICING.head[0]}</th>
                <th scope="col">{PRICING.head[1]}</th>
              </tr>
            </thead>
            <tbody>
              {PRICING.rows.map(([name, price]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="price-panel__foot">
            <ButtonLink href="#calc">{PRICING.cta}</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
