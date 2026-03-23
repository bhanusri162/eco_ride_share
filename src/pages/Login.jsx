import { dashboardCards } from '../data/siteContent.js'

function Login({ onSubmit, onOpenRegister }) {
  return (
    <section className="page page-auth">
      <div className="auth-layout">
        <section className="auth-showcase">
          <p className="section-tag">Member access</p>
          <h2>Move from scattered commute planning to one clean dashboard.</h2>
          <p>
            The UI is prepared for route posts, commuter matching, and bike availability. For now,
            submitting the form opens the dashboard preview.
          </p>

          <div className="mini-dashboard">
            {dashboardCards.map((card) => (
              <article key={card.title} className="mini-card">
                <span>{card.title}</span>
                <strong>{card.value}</strong>
                <p>{card.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-tabs">
            <button className="auth-tab active" type="button">
              Login
            </button>
            <button className="auth-tab" onClick={onOpenRegister} type="button">
              Registration
            </button>
          </div>

          <form className="form-card auth-form" onSubmit={onSubmit}>
            <h3>Welcome back</h3>
            <label>
              Email address
              <input type="email" placeholder="student@university.edu" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>
            <button className="primary-btn" type="submit">
              Login to dashboard
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}

export default Login
