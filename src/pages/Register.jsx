import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Loader from '../components/Loader';
import authImage from '../assets/b1.jpg';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'prefer_not_to_say',
    role: 'rider',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      role: formData.role,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-shell auth-shell-register">
            <div className="auth-aside">
              <div className="auth-aside-copy">
                <p className="auth-eyebrow">Join the community</p>
                <h2>Start sharing smarter daily commutes.</h2>
                <p>
                  Create your commuter profile to post rides, reserve seats, message other members,
                  and use bikes for the last mile.
                </p>
                <div className="auth-aside-points">
                  <span>🎓 Built for students</span>
                  <span>🏢 Great for office teams</span>
                  <span>🌿 Sustainable every day travel</span>
                </div>
              </div>

              <div className="auth-aside-visual">
                <img src={authImage} alt="EcoRide Share community travel illustration" />
                <div className="auth-aside-card">
                  <strong>From ride posts to bike pickups</strong>
                  <p>Everything is connected in one commuter-first platform.</p>
                </div>
              </div>
            </div>

            <div className="auth-card">
              <p className="auth-kicker">Create your profile</p>
              <h1>Sign Up</h1>
              <p className="auth-subtitle">Join EcoRide Share and start coordinating affordable, community-driven travel.</p>

              <form onSubmit={handleSubmit} className="auth-form auth-form-register">
                <div className="auth-form-grid">
                  <div className="input-group">
                    <label className="input-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className={`input-field ${errors.firstName ? 'error' : ''}`}
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className={`input-field ${errors.lastName ? 'error' : ''}`}
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>

                  <div className="input-group auth-grid-span-2">
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
                      placeholder="Create a password"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>

                  <div className="input-group auth-grid-span-2">
                    <label className="input-label">Gender</label>
                    <div className={`auth-radio-grid ${errors.gender ? 'auth-radio-grid-error' : ''}`}>
                      {[
                        { value: 'male', icon: '♂', label: 'Male' },
                        { value: 'female', icon: '♀', label: 'Female' },
                        { value: 'other', icon: '⚧', label: 'Other' },
                        { value: 'prefer_not_to_say', icon: '○', label: 'Prefer Not To Say' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`auth-radio-card ${formData.gender === option.value ? 'active' : ''}`}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={option.value}
                            checked={formData.gender === option.value}
                            onChange={handleChange}
                          />
                          <span className="auth-radio-icon">{option.icon}</span>
                          <span className="auth-radio-label">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Role</label>
                    <select
                      name="role"
                      className={`input-field ${errors.role ? 'error' : ''}`}
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="rider">Rider</option>
                      <option value="driver">Driver</option>
                    </select>
                    {errors.role && <span className="error-message">{errors.role}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Contact</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`input-field ${errors.phone ? 'error' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="input-group auth-grid-span-2">
                    <label className="input-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="input-field"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg">
                  Sign Up
                </button>
              </form>

              <p className="auth-footer">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
