import { useEffect, useRef, useState } from 'react'
import { HEADER_CTA, NAV } from '../data/content'
import { ButtonLink } from './Button'
import { Phone } from './Phone'

export function Header() {
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('menu-open')
    drawerRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
        return
      }
      // keep Tab inside the header while the drawer is open
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = [burgerRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>('a, button')].filter(
          Boolean,
        ) as HTMLElement[]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const onResize = () => window.innerWidth >= 1200 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="header">
      <div className="container header__row">
        <a href="#top" className="brand" aria-label="S-CLEAN ОМСК — наверх">
          S-CLEAN ОМСК
        </a>
        <nav className="nav" aria-label="Основная навигация">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="header__right">
          <Phone className="header__phone" />
          <ButtonLink href="#calc" className="header__cta">
            {HEADER_CTA}
          </ButtonLink>
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={drawerRef} className={`drawer${open ? ' is-open' : ''}`} hidden={!open}>
        <nav className="container drawer__inner" aria-label="Мобильная навигация">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="drawer__link" onClick={close}>
              {n.label}
            </a>
          ))}
          <Phone className="drawer__phone" />
          <ButtonLink href="#calc" block onClick={close}>
            {HEADER_CTA}
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
