import { useEffect, useState } from 'react'
import { ButtonLink } from './Button'

/**
 * Phone-only bottom bar. Hides itself while a lead form (calculator / final CTA)
 * or the footer is on screen, so it never covers them.
 */
export function MobileSticky() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const targets = ['calc', 'final', 'site-footer']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!targets.length || !('IntersectionObserver' in window)) return
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setHidden(visible.size > 0)
    }, { rootMargin: '-25% 0px -25% 0px' })
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div className={`mobile-sticky${hidden ? ' is-hidden' : ''}`} aria-hidden={hidden}>
      <ButtonLink href="#calc" tabIndex={hidden ? -1 : undefined}>
        Рассчитать
      </ButtonLink>
      <ButtonLink href="#prices" variant="outline" tabIndex={hidden ? -1 : undefined}>
        Цены
      </ButtonLink>
    </div>
  )
}
