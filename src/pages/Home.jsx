import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CarIcon, BikeIcon, UserIcon, LocationIcon } from '../assets/icons';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useApp();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Shared Commutes For <span>Students And Office Teams</span></h1>
            <p>EcoRide Share helps campus commuters and office employees post rides, match routes, book last-mile bikes, and build trust through ratings and community conversations.</p>
            
            <div className="hero-buttons">
              {isAuthenticated ? (
                <>
                  <Link to="/rides" className="btn btn-primary btn-lg">Find Rides</Link>
                  <Link to="/bikes" className="btn btn-outline btn-lg">Rent Bikes</Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
                  <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
                </>
              )}
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">Campus</span>
                <span className="stat-label">Student-ready routes</span>
              </div>
              <div className="stat">
                <span className="stat-value">Office</span>
                <span className="stat-label">Peak-hour commute support</span>
              </div>
              <div className="stat">
                <span className="stat-value">Bike+</span>
                <span className="stat-label">Last-mile eco travel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose EcoRide Share?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Eco-Friendly</h3>
              <p>Reduce your carbon footprint by sharing rides and using bikes.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Cost Effective</h3>
              <p>Split travel costs and save money on daily commutes.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Community Driven</h3>
              <p>Connect with trusted commuters in your area.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safe & Secure</h3>
              <p>Verified profiles and rating system for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up and verify your profile in minutes.</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Find or Post Rides</h3>
              <p>Search shared campus or office routes, or publish your own commute.</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Connect & Travel</h3>
              <p>Book, message the commuter, add comments, rate the trip, and use a bike for the final stretch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Eco-Friendly Journey?</h2>
            <p>Join thousands of users who are making a difference every day.</p>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-lg">Join Now - It's Free</Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
