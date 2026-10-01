import { SITE } from '../config'

/** Phone number: a `tel:` link once a real number is configured, plain text while it is a placeholder. */
export function Phone({ className }: { className?: string }) {
  return SITE.phoneHref ? (
    <a className={className} href={SITE.phoneHref}>
      {SITE.phoneDisplay}
    </a>
  ) : (
    <span className={className}>{SITE.phoneDisplay}</span>
  )
}
