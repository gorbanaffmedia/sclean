import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHead({ id, title, lead }: { id: string; title: string; lead?: ReactNode }) {
  return (
    <Reveal className="section-head">
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}
