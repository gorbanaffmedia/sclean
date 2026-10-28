import { COMPANY, PRIVACY_URL, SITE } from '../config'
import { Phone } from './Phone'

export function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container footer__row">
        <a href="#top" className="brand">{SITE.brand}</a>
        <p className="small"><Phone /> · <a href={SITE.mobileHref}>{SITE.mobileDisplay}</a></p>
        <div className="footer__legal small">
          {/* year is rendered at build time; the client may differ only around New Year */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} {COMPANY.shortName}</p>
          <p>ИНН {COMPANY.inn} · КПП {COMPANY.kpp} · ОГРН {COMPANY.registration}</p>
          <p>{COMPANY.footerAddress}</p>
          <p><a href={PRIVACY_URL}>Политика обработки персональных данных</a></p>
        </div>
      </div>
    </footer>
  )
}
