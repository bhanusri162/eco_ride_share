import { profileStats } from '../data/siteContent.js'

function Profile({ user }) {
  const userName = user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : 'Bhanu Sri'
  const userRole = user?.role || 'Community commuter'
  const userEmail = user?.email || 'member@ecoride-share.com'

  return (
    <section className="page page-profile">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">User profile</p>
          <h2>Visible profile and rating details help commuters trust each other.</h2>
          <p>
            The platform concept includes profile identity, ride history, and reputation so users
            can decide who they want to travel with inside the community.
          </p>
        </div>

        <article className="persona-card profile-card">
          <div className="persona-avatar">{userName.charAt(0)}</div>
          <div>
            <h3>{userName}</h3>
            <p className="persona-role">{userRole}</p>
            <p>{userEmail}</p>
            <p>Verified commuter in the EcoRide network</p>
          </div>
        </article>
      </section>

      <section className="content-grid">
        {profileStats.map((item) => (
          <article key={item.label} className="info-card">
            <p className="section-tag">Profile metric</p>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </article>
        ))}
      </section>
    </section>
  )
}

export default Profile
