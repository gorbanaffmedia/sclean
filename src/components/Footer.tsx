import { SITE } from '../config'

export function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container footer__row">
        <a href="#top" className="brand">
          {SITE.brand}
        </a>
      </div>
    </footer>
  )
}
