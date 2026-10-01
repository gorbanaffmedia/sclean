import { PROCESS } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Process() {
  return (
    <section className="section section--grey section--joined" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process-title" title={PROCESS.title} />
        <ol className="process-grid">
          {PROCESS.steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="step" index={i}>
              <span className="step__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{s.title}</h3>
              <p className="small">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
