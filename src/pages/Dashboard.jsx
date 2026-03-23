import {
  communityActivity,
  commuteSummary,
  dashboardCards,
  rideFeed,
  upcomingSchedule,
} from '../data/siteContent.js'

function Dashboard({ onBackHome }) {
  return (
    <section className="page page-dashboard">
      <section className="dashboard-hero">
        <div>
          <p className="section-tag">Dashboard preview</p>
          <h2>Good morning, Bhanu Sri.</h2>
          <p>
            This is a visual-only dashboard state that appears after clicking login or
            registration. Functional backend flows can be wired later.
          </p>
        </div>
        <button className="ghost-btn" onClick={onBackHome} type="button">
          Back to home
        </button>
      </section>

      <section className="dashboard-grid">
        {dashboardCards.map((card) => (
          <article key={card.title} className="dashboard-card">
            <span>{card.title}</span>
            <strong>{card.value}</strong>
            <p>{card.meta}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-layout">
        <section className="activity-panel">
          <div className="panel-head">
            <h3>Today&apos;s commute activity</h3>
            <span>Smart community feed</span>
          </div>

          <div className="ride-list">
            {rideFeed.map((ride) => (
              <article key={ride.route} className="ride-item dashboard-ride-item">
                <div>
                  <strong>{ride.route}</strong>
                  <p>{ride.time}</p>
                </div>
                <span>{ride.seats}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="summary-panel">
          <div className="panel-head">
            <h3>Weekly overview</h3>
            <span>Personal impact</span>
          </div>

          <div className="summary-grid">
            {commuteSummary.map((item) => (
              <article key={item.label} className="summary-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="dashboard-layout">
        <section className="schedule-panel">
          <div className="panel-head">
            <h3>Upcoming schedule</h3>
            <span>Next 3 commute windows</span>
          </div>

          <div className="schedule-list">
            {upcomingSchedule.map((item) => (
              <article key={`${item.day}-${item.route}`} className="schedule-item">
                <div className="schedule-day">{item.day}</div>
                <div className="schedule-content">
                  <strong>{item.route}</strong>
                  <p>{item.window}</p>
                </div>
                <span className="schedule-status">{item.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="community-panel">
          <div className="panel-head">
            <h3>Community updates</h3>
            <span>Trusted commuter network</span>
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
        </section>
      </section>
    </section>
  )
}

export default Dashboard
