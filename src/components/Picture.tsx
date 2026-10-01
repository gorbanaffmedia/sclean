import type { Img } from '../data/images'

interface Props {
  img: Img
  alt: string
  /** CSS `sizes` attribute */
  sizes: string
  eager?: boolean
  className?: string
}

/** Responsive WebP image with explicit intrinsic size (no layout shift). */
export function Picture({ img, alt, sizes, eager, className }: Props) {
  const [small, large] = img.widths
  return (
    <img
      className={className}
      src={`${img.base}-${large}.webp`}
      srcSet={`${img.base}-${small}.webp ${small}w, ${img.base}-${large}.webp ${large}w`}
      sizes={sizes}
      width={large}
      height={Math.round(large / img.ratio)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      // React 18 only forwards the lowercase HTML attribute
      {...(eager ? { fetchpriority: 'high' } : null)}
    />
  )
}
