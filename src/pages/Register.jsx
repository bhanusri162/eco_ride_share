import { useState } from 'react'
import { dashboardCards } from '../data/siteContent.js'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  role: '',
  organization: '',
  commuteArea: '',
  preferredMode: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

function Register({ onSubmit, onOpenLogin }) {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await onSubmit(formData)
      setSuccessMessage('Registration successful. You can log in now.')
      setFormData(initialFormData)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to register')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page page-auth">
      <div className="auth-layout">
        <section className="auth-showcase">
          <p className="section-tag">New member onboarding</p>
          <h2>Create a profile for community rides, bike access, and cleaner commuting.</h2>
          <p>
            Register your EcoRide account to join shared rides, bike access programs, and
            community-based commuting.
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

          <form className="form-card auth-form" onSubmit={handleSubmit}>
            <h3>Create your account</h3>
            <div className="form-row">
              <label>
                First name
                <input
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <div className="form-row">
              <label>
                Phone number
                <input
                  name="phoneNumber"
                  type="tel"
                  placeholder="+44 7XXX XXXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                User role
                <select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="Student">Student</option>
                  <option value="Office Employee">Office Employee</option>
                  <option value="Driver">Driver</option>
                </select>
              </label>
            </div>
            <label>
              Organization or university
              <input
                name="organization"
                type="text"
                placeholder="Enter workplace or university"
                value={formData.organization}
                onChange={handleChange}
              />
            </label>
            <div className="form-row">
              <label>
                Primary commute area
                <input
                  name="commuteArea"
                  type="text"
                  placeholder="Eg. Kingston to City Campus"
                  value={formData.commuteArea}
                  onChange={handleChange}
                />
              </label>
              <label>
                Preferred travel mode
                <select
                  name="preferredMode"
                  value={formData.preferredMode}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select mode
                  </option>
                  <option value="Ride sharing">Ride sharing</option>
                  <option value="Bike sharing">Bike sharing</option>
                  <option value="Both">Both</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Confirm password
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label className="checkbox-row">
              <input
                name="acceptedTerms"
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                required
              />
              <span>I agree to commute safely and follow the EcoRide community guidelines.</span>
            </label>
            {errorMessage ? <p className="form-message form-error">{errorMessage}</p> : null}
            {successMessage ? <p className="form-message form-success">{successMessage}</p> : null}
            <button className="primary-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register and continue'}
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}

export default Register
