import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

interface Props {
  as?: ElementType
  className?: string
  /** stagger index; each step adds 60 ms */
  index?: number
  children: ReactNode
  [key: string]: unknown
}

/** Soft donor-style reveal: opacity 0→1, y 14→0. Disabled by prefers-reduced-motion in CSS. */
export function Reveal({ as: Tag = 'div', className = '', index = 0, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = { '--reveal-delay': `${Math.min(index, 6) * 60}ms` } as CSSProperties
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  )
}
