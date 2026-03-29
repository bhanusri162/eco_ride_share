import { ridePosts, rideRequests } from '../data/siteContent.js'

function Rides({ onOpenAuth }) {
  return (
    <section className="page page-rides">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">Ride-sharing posts</p>
          <h2>Create, browse, and join rides that match your daily route.</h2>
          <p>
            EcoRide is meant to work like a community commute board where users can post trips,
            request seats, and discuss pickup plans directly under each route.
          </p>
        </div>

        <div className="form-card">
          <h3>Create a ride post</h3>
          <label>
            Route
            <input type="text" placeholder="Eg. Kingston to City Campus" />
          </label>
          <div className="form-row">
            <label>
              Date
              <input type="date" />
            </label>
            <label>
              Time
              <input type="time" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Seats available
              <input type="number" min="1" placeholder="3" />
            </label>
            <label>
              Pickup point
              <input type="text" placeholder="Enter pickup" />
            </label>
          </div>
          <button className="primary-btn" onClick={() => onOpenAuth('register')} type="button">
            Register to post rides
          </button>
        </div>
      </section>

      <section className="content-grid two-column-grid">
        <div className="stack-grid">
          {ridePosts.map((post) => (
            <article key={`${post.route}-${post.driver}`} className="info-card ride-post-card">
              <div className="ride-post-head">
                <div>
                  <p className="section-tag">Ride post</p>
                  <h3>{post.route}</h3>
                </div>
                <span className="status-pill">{post.seats}</span>
              </div>
              <p>
                <strong>Driver:</strong> {post.driver}
              </p>
              <p>
                <strong>When:</strong> {post.timing}
              </p>
              <p>
                <strong>Pickup:</strong> {post.pickup}
              </p>
              <p>{post.note}</p>
              <div className="hero-actions">
                <button className="primary-btn" type="button">
                  Request to join
                </button>
                <button className="ghost-btn" type="button">
                  Comment
                </button>
              </div>
            </article>
          ))}
        </div>

        <section className="activity-panel">
          <div className="panel-head">
            <h3>Ride requests and comments</h3>
            <span>Community interaction</span>
          </div>

          <div className="ride-list">
            {rideRequests.map((item) => (
              <article key={item.name} className="ride-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.detail}</p>
                </div>
                <span>{item.status}</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  )
}

export default Rides
