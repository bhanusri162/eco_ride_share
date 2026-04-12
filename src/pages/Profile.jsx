import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiGet, apiPut } from '../utils/api';
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
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const data = await apiGet('/api/profile/stats');
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
    
    if (!formData.name) newErrors.name = 'Name is required';
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
      await updateProfile(formData);
      showNotification('Profile updated successfully!', 'success');
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
              
              <p className="profile-bio">{user?.bio || 'No bio added yet'}</p>
              
              <div className="profile-meta">
                <span><MailIcon /> {user?.email}</span>
                <span><PhoneIcon /> {user?.phone || 'Not provided'}</span>
                <span>📅 Member since {new Date(stats?.memberSince).getFullYear()}</span>
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
                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`input-field ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
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
                  <label className="input-label">Bio</label>
                  <textarea
                    name="bio"
                    className="input-field"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
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
              <button className="btn btn-primary" onClick={() => navigate('/my-rides')}>
                View My Rides
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/my-bookings')}>
                View Bike Bookings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;