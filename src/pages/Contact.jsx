import { useState } from 'react'

function Contact({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await onSubmit(formData)
      setSuccessMessage('Your message has been sent.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setErrorMessage(error.message || 'Unable to send your message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page page-contact">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">Contact us</p>
          <h2>Talk to the EcoRide team about campuses, companies, or pilot launches.</h2>
          <p>
            This interface is ready for real support, partnerships, and onboarding conversations.
          </p>

          <div className="contact-cards">
            <article className="contact-card">
              <span>Email</span>
              <strong>hello@ecoride-share.com</strong>
            </article>
            <article className="contact-card">
              <span>Phone</span>
              <strong>+44 20 4567 2210</strong>
            </article>
            <article className="contact-card">
              <span>Office</span>
              <strong>London Mobility Lab</strong>
            </article>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Send a message</h3>
          <label>
            Full name
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
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
          <label>
            Message
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about your commuting project"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          {errorMessage ? <p className="form-message form-error">{errorMessage}</p> : null}
          {successMessage ? <p className="form-message form-success">{successMessage}</p> : null}
          <button className="primary-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit enquiry'}
          </button>
        </form>
      </section>
    </section>
  )
}

export default Contact
