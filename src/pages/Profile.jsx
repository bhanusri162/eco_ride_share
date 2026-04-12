import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiGet } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { getInitials } from '../utils/helpers';
import Loader from '../components/Loader';
import { UserIcon, MailIcon, PhoneIcon, StarIcon, EditIcon } from '../assets/icons';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, showNotification } = useApp();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserStats();
  }, []);

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const data = await apiGet(`${API_ENDPOINTS.PROFILE}/stats`);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalRides: 0,
        rating: 4.5,
        co2Saved: 0,
        memberSince: new Date().toISOString(),
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
      });
      setIsEditing(false);
    } catch (error) {
      showNotification('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-cover"></div>
          
          <div className="profile-info">
            <div className="profile-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{getInitials(user?.name)}</span>
              )}
            </div>
            
            <div className="profile-details">
              <div className="profile-name-section">
                <h1>{user?.name}</h1>
                <div className="profile-rating">
                  <StarIcon filled />
                  <span>{stats?.rating || '4.5'}</span>
                </div>
              </div>
              
              <p className="profile-bio">{user?.address || 'No address added yet'}</p>
              
              <div className="profile-meta">
                <span><MailIcon /> {user?.email}</span>
                <span><PhoneIcon /> {user?.phone || 'Not provided'}</span>
                <span>Role: {user?.role || 'rider'}</span>
                <span>Gender: {user?.gender?.replaceAll('_', ' ') || 'Prefer not to say'}</span>
                <span>📅 Member since {new Date(stats?.memberSince || user?.memberSince || Date.now()).getFullYear()}</span>
              </div>
              <div className="profile-badges">
                <span className="profile-badge">{Number(stats?.rating || 0) >= 4 ? 'Trusted commuter' : 'Community member'}</span>
                <span className="profile-badge">Student & office commute ready</span>
              </div>
            </div>
            
            {!isEditing && (
              <button className="btn btn-outline edit-profile-btn" onClick={() => setIsEditing(true)}>
                <EditIcon /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="profile-edit-section">
            <div className="card">
              <h2>Edit Profile</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className={`input-field ${errors.firstName ? 'error' : ''}`}
                    value={formData.firstName}
                    onChange={handleChange}
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
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`input-field ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`input-field ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Address</label>
                  <textarea
                    name="address"
                    className="input-field"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="profile-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">🚗</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.totalRides || 0}</span>
                  <span className="stat-label">Total Rides</span>
                </div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.rating || '4.5'}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">🌿</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.co2Saved || 0}kg</span>
                  <span className="stat-label">CO₂ Saved</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary" onClick={() => navigate('/rides')}>
                View Rides
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/activity')}>
                Ride History
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/messages')}>
                Messages
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/bikes')}>
                Browse Bikes
              </button>
            </div>
            <div className="profile-links">
              <Link to={`/commuters/${user?.id}`}>View my public commuter profile</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
