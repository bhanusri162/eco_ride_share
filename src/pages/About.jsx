import aboutImage from '../assets/ride_share.webp';
import { highlights, trustSignals } from '../data/siteContent.js';
import './About.css';

const developerTeam = [
  {
    name: 'Bhanusri',
    role: 'Project Developer',
    detail: 'Designed and implemented the EcoRide Share platform with a focus on community commuting, sustainability, and usable ride coordination.',
    badge: 'Full-stack build',
  },
  {
    name: 'EcoRide Vision',
    role: 'Student And Office Commuter Focus',
    detail: 'The platform is shaped around the needs identified in commuter personas: affordable routes, trust, bike access, and stronger local coordination.',
    badge: 'Community-first',
  },
];

const contactCards = [
  {
    label: 'Email',
    value: 'hello@ecoride-share.com',
    note: 'General platform support and partnership enquiries',
  },
  {
    label: 'Phone',
    value: '+44 20 4567 2210',
    note: 'Weekday support for commuter onboarding',
  },
  {
    label: 'Office',
    value: 'London Mobility Lab',
    note: 'Campus and office mobility collaboration hub',
  },
];

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="about-kicker">About EcoRide Share</p>
            <h1>Built for students and office commuters who need trust, coordination, and cleaner daily travel.</h1>
            <p className="about-lead">
              EcoRide Share is a community-based ride and bike sharing platform designed to reduce
              solo commuting, lower travel costs, and make urban movement feel more local and human.
            </p>

            <div className="about-badges">
              <span>🚗 Ride sharing</span>
              <span>🚲 Bike support</span>
              <span>📍 Map-based routes</span>
              <span>⭐ Community trust</span>
            </div>
          </div>

          <div className="about-hero-visual">
            <img src={aboutImage} alt="EcoRide Share ride sharing illustration" />
            <div className="about-floating-card">
              <strong>Why this platform matters</strong>
              <p>It connects sustainable commuting, route clarity, comments, ratings, and last-mile bike access in one place.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <p className="about-kicker">What EcoRide solves</p>
            <h2>A community-first alternative to plain commercial ride apps</h2>
          </div>

          <div className="about-feature-grid">
            {highlights.map((item, index) => (
              <article key={item.title} className="about-feature-card">
                <div className="about-feature-icon">{['🌿', '🚲', '🤝'][index] || '✨'}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <p className="about-kicker">Trust Signals</p>
            <h2>Designed to feel safe, visible, and commuter-friendly</h2>
          </div>

          <div className="about-trust-grid">
            {trustSignals.map((item, index) => (
              <article key={item.title} className="about-trust-card">
                <span className="about-trust-index">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section about-dev-section">
          <div className="about-section-heading">
            <p className="about-kicker">Developer Section</p>
            <h2>The people and product direction behind EcoRide Share</h2>
          </div>

          <div className="about-developer-grid">
            {developerTeam.map((member) => (
              <article key={member.name} className="about-developer-card">
                <span className="about-dev-badge">{member.badge}</span>
                <h3>{member.name}</h3>
                <p className="about-dev-role">{member.role}</p>
                <p>{member.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <p className="about-kicker">Contact Information</p>
            <h2>Reach the EcoRide team</h2>
          </div>

          <div className="about-contact-grid">
            {contactCards.map((item) => (
              <article key={item.label} className="about-contact-card">
                <span className="about-contact-label">{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
