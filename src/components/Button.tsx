import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'dark' | 'lime' | 'white' | 'outline' | 'ghost-dark'

interface Common {
  variant?: Variant
  block?: boolean
  children: ReactNode
}

const cls = (variant: Variant, block?: boolean, extra?: string) =>
  ['btn', `btn--${variant}`, block && 'btn--block', extra].filter(Boolean).join(' ')

export function ButtonLink({ variant = 'dark', block, className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cls(variant, block, className)} {...rest}>
      {children}
    </a>
  )
}

export function Button({ variant = 'dark', block, className, children, type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cls(variant, block, className)} {...rest}>
      {children}
    </button>
  )
}
