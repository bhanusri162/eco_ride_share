 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiGet } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import RideCard from '../components/RideCard';
import Loader from '../components/Loader';
import { CarIcon, BikeIcon, UserIcon } from '../assets/icons';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useApp();
  const [stats, setStats] = useState(null);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ridesRes] = await Promise.all([
        apiGet('/api/dashboard/stats'),
        apiGet(`${API_ENDPOINTS.RIDES}/upcoming`),
      ]);
      setStats(statsRes);
      setUpcomingRides(ridesRes.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's what's happening with your rides</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <CarIcon />
            <div>
              <span className="stat-card-value">{stats?.totalRides || 0}</span>
              <span className="stat-card-label">Total Rides</span>
            </div>
          </div>
          
          <div className="stat-card">
            <BikeIcon />
            <div>
              <span className="stat-card-value">{stats?.bikeRentals || 0}</span>
              <span className="stat-card-label">Bike Rentals</span>
            </div>
          </div>
          
          <div className="stat-card">
            <span>🌿</span>
            <div>
              <span className="stat-card-value">{stats?.co2Saved || 0}kg</span>
              <span className="stat-card-label">CO₂ Saved</span>
            </div>
          </div>
          
          <div className="stat-card">
            <span>⭐</span>
            <div>
              <span className="stat-card-value">{user?.rating || '4.5'}</span>
              <span className="stat-card-label">Your Rating</span>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/rides/create" className="btn btn-primary">
            <CarIcon /> Post a Ride
          </Link>
          <Link to="/rides" className="btn btn-outline">
            Find Rides
          </Link>
          <Link to="/bikes" className="btn btn-outline">
            <BikeIcon /> Rent a Bike
          </Link>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Rides</h2>
            <Link to="/my-rides">View All</Link>
          </div>
          
          {upcomingRides.length > 0 ? (
            <div className="rides-grid">
              {upcomingRides.map(ride => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No upcoming rides</p>
              <Link to="/rides" className="btn btn-primary">Find a Ride</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;