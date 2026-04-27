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
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSubmitError('');
  };

  const validateForm = () => {
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const address = formData.address.trim();
    const newErrors = {};
    
    if (!firstName) newErrors.firstName = 'First name is required';
    else if (firstName.length < 2) newErrors.firstName = 'First name must be at least 2 characters';
    else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(firstName)) newErrors.firstName = 'Use letters only';

    if (!lastName) newErrors.lastName = 'Last name is required';
    else if (lastName.length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
    else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(lastName)) newErrors.lastName = 'Use letters only';

    if (!formData.gender) newErrors.gender = 'Gender is required';
    else if (!['male', 'female', 'other', 'prefer_not_to_say'].includes(formData.gender)) {
      newErrors.gender = 'Select a valid gender';
    }

    if (!formData.role) newErrors.role = 'Role is required';
    else if (!['rider', 'driver'].includes(formData.role)) newErrors.role = 'Select a valid role';

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address';

    if (!phone) newErrors.phone = 'Contact number is required';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) newErrors.phone = 'Enter a valid contact number';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must include letters and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await register({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      gender: formData.gender,
      role: formData.role,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    
    if (result.success) {
      navigate('/dashboard');
      return;
    }

    setSubmitError(result.error || 'Registration failed');
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
                {submitError && (
                  <div className="auth-alert auth-alert-error" role="alert">
                    {submitError}
                  </div>
                )}

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
                      minLength="2"
                      required
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
                      minLength="2"
                      required
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
                      required
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
                      minLength="6"
                      required
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
                      minLength="6"
                      required
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
                      required
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="input-group auth-grid-span-2">
                    <label className="input-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className={`input-field ${errors.address ? 'error' : ''}`}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      required
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
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
