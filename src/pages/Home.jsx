import { highlights, rideFeed, stats } from '../data/siteContent.js'

function Home({ onOpenAuth, onOpenPage }) {
  return (
    <section className="page page-home">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="section-tag">Community-first mobility platform</p>
          <h2>Share rides, access bikes, and commute with less cost and less carbon.</h2>
          <p className="hero-text">
            EcoRide Share is designed for university communities and office commuters who need a
            smarter alternative to solo travel. Post rides, discover nearby matches, and move
            through the city with a cleaner footprint.
          </p>

          <div className="hero-strip">
            <span>Trusted local commuter circles</span>
            <span>Ride + bike support</span>
            <span>Cleaner city movement</span>
          </div>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => onOpenAuth('register')} type="button">
              Join EcoRide
            </button>
            <button className="ghost-btn" onClick={() => onOpenPage('about')} type="button">
              Explore the Platform
            </button>
          </div>

          <div className="stat-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-visual">
          <div className="map-card">
            <div className="map-header">
              <span>Live commute board</span>
              <span className="status-pill">Low-emission mode</span>
            </div>

            <div className="signal-row">
              <article className="signal-card">
                <span>Active corridors</span>
                <strong>18 routes</strong>
              </article>
              <article className="signal-card">
                <span>Shared today</span>
                <strong>246 seats</strong>
              </article>
            </div>

            <div className="route-line">
              <div>
                <p>Pickup</p>
                <strong>Kingston Student Hub</strong>
              </div>
              <div className="route-dots" />
              <div>
                <p>Destination</p>
                <strong>Central Innovation Campus</strong>
              </div>
            </div>

            <div className="ride-list">
              {rideFeed.map((ride) => (
                <article key={ride.route} className="ride-item">
                  <div>
                    <strong>{ride.route}</strong>
                    <p>{ride.time}</p>
                  </div>
                  <span>{ride.seats}</span>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        {highlights.map((item) => (
          <article key={item.title} className="info-card">
            <p className="section-tag">Feature</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </section>
  )
}

export default Home
