const guestNavItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
]

const memberNavItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'rides', label: 'Rides' },
  { id: 'bikes', label: 'Bike Share' },
  { id: 'planner', label: 'Route Planner' },
  { id: 'community', label: 'Community' },
  { id: 'profile', label: 'Profile' },
]

function Header({ currentPage, isLoggedIn, onLogout, onNavigate, onOpenAuth }) {
  const navItems = isLoggedIn ? memberNavItems : guestNavItems

  return (
    <header className="topbar">
      <div className="brand-mark">
        <div className="brand-icon">ER</div>
        <div>
          <p className="eyebrow">Sustainable urban commuting</p>
          <h1 className="brand-name">EcoRide Share</h1>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={currentPage === item.id ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="auth-actions">
        {isLoggedIn ? (
          <button className="nav-link" onClick={onLogout} type="button">
            Logout
          </button>
        ) : (
          <>
            <button className="nav-link" onClick={() => onOpenAuth('login')} type="button">
              Login
            </button>
            <button className="primary-btn" onClick={() => onOpenAuth('register')} type="button">
              Register
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
