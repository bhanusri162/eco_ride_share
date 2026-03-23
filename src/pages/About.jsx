import { personas } from '../data/siteContent.js'

function About() {
  return (
    <section className="page page-about">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">About EcoRide</p>
          <h2>Built for local trust, sustainable choices, and real commuter problems.</h2>
          <p>
            The platform focuses on students and office employees who need affordable daily
            transport, better route coordination, and a stronger community feeling than commercial
            ride apps usually provide.
          </p>
        </div>

        <div className="mission-card">
          <p className="section-tag">Why it matters</p>
          <h3>One platform for ride-sharing and bike-sharing</h3>
          <p>
            EcoRide Share combines ride posts, route discovery, map-based travel planning, and
            short-distance bike access into one simple commuting experience.
          </p>
          <ul className="clean-list">
            <li>Reduce fuel costs and parking pressure</li>
            <li>Cut single-passenger vehicle trips</li>
            <li>Make commuting safer through local community interaction</li>
          </ul>
        </div>
      </section>

      <section className="persona-grid">
        {personas.map((persona) => (
          <article key={persona.name} className="persona-card">
            <div className="persona-avatar">{persona.name.slice(0, 1)}</div>
            <div>
              <h3>{persona.name}</h3>
              <p className="persona-role">{persona.role}</p>
              <p>{persona.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}

export default About
