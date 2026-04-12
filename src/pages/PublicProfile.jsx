import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { formatDate, formatTime, getInitials } from '../utils/helpers';
import Loader from '../components/Loader';
import './PublicProfile.css';

const PublicProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiGet(`${API_ENDPOINTS.PROFILE}/${userId}`);
        setProfile(data);
      } catch (fetchError) {
        setError(fetchError?.response?.data?.message || 'Unable to load commuter profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <Loader />;
  if (!profile) return <div className="container page-state">{error || 'Commuter not found'}</div>;

  const trustedCommuter = Number(profile.ratingCount || 0) >= 1 || Number(profile.ridesOffered || 0) >= 1;

  return (
    <div className="public-profile-page">
      <div className="container">
        <section className="card public-profile-hero">
          <div className="public-avatar">{getInitials(profile.name)}</div>
          <div className="public-profile-copy">
            <p className="section-tag">Community commuter</p>
            <h1>{profile.name}</h1>
            <div className="public-profile-badges">
              <span className="badge">⭐ {Number(profile.rating || 0).toFixed(1)} rating</span>
              <span className="badge">{profile.ratingCount || 0} reviews</span>
              <span className={`badge ${trustedCommuter ? 'badge-success' : ''}`}>
                {trustedCommuter ? 'Trusted commuter' : 'New community member'}
              </span>
            </div>
            <p>
              Joined in {new Date(profile.memberSince).getFullYear()} and has participated in
              {` ${profile.ridesOffered || 0}`} posted rides and {` ${profile.ridesTaken || 0}`} joined rides.
            </p>
            <div className="public-profile-actions">
              <Link to={`/messages?user=${profile.id}&name=${encodeURIComponent(profile.name)}`} className="btn btn-primary">
                Message Commuter
              </Link>
            </div>
          </div>
        </section>

        <section className="public-profile-grid">
          <div className="card">
            <h2>Trust Snapshot</h2>
            <div className="public-stats">
              <div>
                <strong>{profile.ridesOffered || 0}</strong>
                <span>Rides posted</span>
              </div>
              <div>
                <strong>{profile.ridesTaken || 0}</strong>
                <span>Rides joined</span>
              </div>
              <div>
                <strong>{profile.ratingCount || 0}</strong>
                <span>Community reviews</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Recent Ride Activity</h2>
            {profile.recentRides?.length ? (
              <div className="public-rides">
                {profile.recentRides.map((ride) => (
                  <Link key={ride.id} to={`/rides/${ride.id}`} className="public-ride-item">
                    <strong>{ride.pickup} → {ride.destination}</strong>
                    <span>{formatDate(ride.date)} at {formatTime(ride.date, ride.time)}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No public ride history yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicProfile;
