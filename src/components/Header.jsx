import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MenuIcon, CloseIcon, UserIcon, CarIcon, BikeIcon } from '../assets/icons';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">EcoRide Share</span>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            {!isAuthenticated && <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>}
            <Link to="/rides" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Rides</Link>
            <Link to="/bikes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Bikes</Link>
            {isAuthenticated && <Link to="/messages" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Messages</Link>}
            {isAuthenticated && <Link to="/activity" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Activity</Link>}
            {!isAuthenticated && <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>}
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/dashboard" className="btn btn-outline btn-sm">
                  <UserIcon /> Dashboard
                </Link>
                <Link to="/profile" className="btn btn-primary btn-sm">
                  {user?.firstName || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-sm logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
              </div>
            )}
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
