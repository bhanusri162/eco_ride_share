import { communityActivity, trustSignals } from '../data/siteContent.js'

function Community() {
  return (
    <section className="page page-community">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">Community features</p>
          <h2>Build trust with comments, ratings, and recurring local interaction.</h2>
          <p>
            EcoRide is not meant to feel like a generic commercial taxi app. These sections focus
            on social trust, reliable commuters, and discussion around shared routes.
          </p>
        </div>

        <div className="activity-panel">
          <div className="panel-head">
            <h3>Latest community activity</h3>
            <span>Recent updates</span>
          </div>
          <div className="community-list">
            {communityActivity.map((item) => (
              <article key={`${item.name}-${item.time}`} className="community-item">
                <div className="community-avatar">{item.name.charAt(0)}</div>
                <div className="community-copy">
                  <strong>
                    {item.name} {item.action}
                  </strong>
                  <p>{item.detail}</p>
                </div>
                <span className="community-time">{item.time}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        {trustSignals.map((item) => (
          <article key={item.title} className="info-card">
            <p className="section-tag">Trust signal</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </section>
  )
}

export default Community
