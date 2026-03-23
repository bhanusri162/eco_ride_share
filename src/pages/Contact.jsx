function Contact() {
  return (
    <section className="page page-contact">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">Contact us</p>
          <h2>Talk to the EcoRide team about campuses, companies, or pilot launches.</h2>
          <p>
            This interface is static for now, but the page layout is ready for real support,
            partnerships, and onboarding flows.
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

        <form className="form-card">
          <h3>Send a message</h3>
          <label>
            Full name
            <input type="text" placeholder="Enter your name" />
          </label>
          <label>
            Email address
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Tell us about your commuting project" />
          </label>
          <button className="primary-btn" type="button">
            Submit enquiry
          </button>
        </form>
      </section>
    </section>
  )
}

export default Contact
