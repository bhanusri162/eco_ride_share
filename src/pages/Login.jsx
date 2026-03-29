import { useState } from 'react'
import { dashboardCards } from '../data/siteContent.js'

function Login({ onSubmit, onOpenRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await onSubmit(formData)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to log in')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page page-auth">
      <div className="auth-layout">
        <section className="auth-showcase">
          <p className="section-tag">Member access</p>
          <h2>Move from scattered commute planning to one clean dashboard.</h2>
          <p>
            Sign in with your EcoRide account to access the commuter dashboard and shared mobility
            features.
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

          <form className="form-card auth-form" onSubmit={handleSubmit}>
            <h3>Welcome back</h3>
            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            {errorMessage ? <p className="form-message form-error">{errorMessage}</p> : null}
            <button className="primary-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login to dashboard'}
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}

export default Login
