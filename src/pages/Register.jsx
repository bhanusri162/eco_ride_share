import { dashboardCards } from '../data/siteContent.js'

function Register({ onSubmit, onOpenLogin }) {
  return (
    <section className="page page-auth">
      <div className="auth-layout">
        <section className="auth-showcase">
          <p className="section-tag">New member onboarding</p>
          <h2>Create a profile for community rides, bike access, and cleaner commuting.</h2>
          <p>
            This registration page is visual only for now. Submitting the form opens the dashboard
            preview so the flow still feels complete.
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
            <button className="auth-tab" onClick={onOpenLogin} type="button">
              Login
            </button>
            <button className="auth-tab active" type="button">
              Registration
            </button>
          </div>

          <form className="form-card auth-form" onSubmit={onSubmit}>
            <h3>Create your account</h3>
            <div className="form-row">
              <label>
                First name
                <input type="text" placeholder="Enter first name" />
              </label>
              <label>
                Last name
                <input type="text" placeholder="Enter last name" />
              </label>
            </div>
            <label>
              Email address
              <input type="email" placeholder="Enter your email" />
            </label>
            <div className="form-row">
              <label>
                Phone number
                <input type="tel" placeholder="+44 7XXX XXXXXX" />
              </label>
              <label>
                User role
                <select defaultValue="">
                  <option value="" disabled>
                    Select role
                  </option>
                  <option>Student</option>
                  <option>Office Employee</option>
                  <option>Driver</option>
                </select>
              </label>
            </div>
            <label>
              Organization or university
              <input type="text" placeholder="Enter workplace or university" />
            </label>
            <div className="form-row">
              <label>
                Primary commute area
                <input type="text" placeholder="Eg. Kingston to City Campus" />
              </label>
              <label>
                Preferred travel mode
                <select defaultValue="">
                  <option value="" disabled>
                    Select mode
                  </option>
                  <option>Ride sharing</option>
                  <option>Bike sharing</option>
                  <option>Both</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Password
                <input type="password" placeholder="Create a password" />
              </label>
              <label>
                Confirm password
                <input type="password" placeholder="Confirm your password" />
              </label>
            </div>
            <label className="checkbox-row">
              <input type="checkbox" />
              <span>I agree to commute safely and follow the EcoRide community guidelines.</span>
            </label>
            <button className="primary-btn" type="submit">
              Register and continue
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}

export default Register
