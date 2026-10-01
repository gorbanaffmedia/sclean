import { TEAM } from '../data/content'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Team() {
  return (
    <section className="section" id="team" aria-labelledby="team-title">
      <div className="container">
        <SectionHead id="team-title" title={TEAM.title} />
        <ul className="team-grid">
          {TEAM.people.map((p, i) => (
            <Reveal as="li" key={p.name} className="person" index={i}>
              <div className="person__media">
                <Picture
                  img={p.img}
                  alt={`${p.name}, портрет`}
                  sizes="(min-width: 1200px) 282px, (min-width: 810px) 413px, calc(100vw - 36px)"
                />
              </div>
              <h3>{p.name}</h3>
              <p className="small">{p.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
