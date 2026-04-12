import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import RideCard from '../components/RideCard';
import Loader from '../components/Loader';
import { SearchIcon, LocationIcon } from '../assets/icons';
import './Rides.css';

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ pickup: '', destination: '' });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const data = await apiGet(API_ENDPOINTS.RIDES);
      setRides(data);
      setFilteredRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const filtered = rides.filter(ride => {
      const pickupMatch = ride.pickup.toLowerCase().includes(search.pickup.toLowerCase());
      const destMatch = ride.destination.toLowerCase().includes(search.destination.toLowerCase());
      return pickupMatch && destMatch;
    });
    
    setFilteredRides(filtered);
  };

  if (loading) return <Loader />;

  return (
    <div className="rides-page">
      <div className="container">
        <div className="page-header">
          <h1>Find Available Rides</h1>
          <Link to="/rides/create" className="btn btn-primary">Post a Ride</Link>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-inputs">
              <div className="search-input">
                <LocationIcon />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={search.pickup}
                  onChange={(e) => setSearch({ ...search, pickup: e.target.value })}
                />
              </div>
              <div className="search-input">
                <LocationIcon />
                <input
                  type="text"
                  placeholder="Destination"
                  value={search.destination}
                  onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              <SearchIcon /> Search
            </button>
          </form>
        </div>

        <div className="rides-grid">
          {filteredRides.length > 0 ? (
            filteredRides.map(ride => (
              <RideCard key={ride.id} ride={ride} />
            ))
          ) : (
            <div className="empty-state">
              <p>No rides found</p>
              <Link to="/rides/create" className="btn btn-primary">Post the First Ride</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rides;