import { routePlannerSteps } from '../data/siteContent.js'

function RoutePlanner() {
  return (
    <section className="page page-planner">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">Route planner</p>
          <h2>Map-based pickup and destination selection for clearer ride coordination.</h2>
          <p>
            Your project documents call for location pinning and route clarity. This page shows how
            EcoRide can structure that planning experience inside the website.
          </p>
        </div>

        <div className="map-card planner-card">
          <div className="map-header">
            <span>Interactive route concept</span>
            <span className="status-pill">Map-ready workflow</span>
          </div>
          <div className="route-line">
            <div>
              <p>Pickup point</p>
              <strong>University residence gate</strong>
            </div>
            <div className="route-dots" />
            <div>
              <p>Destination</p>
              <strong>Central office campus</strong>
            </div>
          </div>
          <div className="signal-row">
            <article className="signal-card">
              <span>Distance</span>
              <strong>12 km</strong>
            </article>
            <article className="signal-card">
              <span>Suggested mode</span>
              <strong>Ride + bike</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="content-grid">
        {routePlannerSteps.map((item) => (
          <article key={item.title} className="info-card">
            <p className="section-tag">Planner step</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </section>
  )
}

export default RoutePlanner
