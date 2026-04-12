import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Loader from '../components/Loader';
import authImage from '../assets/b1.jpg';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useApp();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-shell auth-shell-login">
            <div className="auth-aside">
              <div className="auth-aside-copy">
                <p className="auth-eyebrow">EcoRide Share</p>
                <h2>Commute with people you trust.</h2>
                <p>
                  Sign in to manage ride posts, join trusted campus and office routes, and book
                  last-mile bikes without leaving the platform.
                </p>
                <div className="auth-aside-points">
                  <span>🚗 Community ride posts</span>
                  <span>⭐ Ratings and trust signals</span>
                  <span>🚲 Bike support for short trips</span>
                </div>
              </div>

              <div className="auth-aside-visual">
                <img src={authImage} alt="EcoRide Share commuter illustration" />
                <div className="auth-aside-card">
                  <strong>Daily commute, simplified</strong>
                  <p>Find shared rides, coordinate quickly, and keep travel affordable.</p>
                </div>
              </div>
            </div>

            <div className="auth-card">
              <p className="auth-kicker">Welcome back</p>
              <h1>Sign In</h1>
              <p className="auth-subtitle">Access your commuter dashboard and continue where you left off.</p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-group">
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`input-field ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`input-field ${errors.password ? 'error' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg">
                  Sign In
                </button>
              </form>

              <p className="auth-footer">
                Don&apos;t have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
