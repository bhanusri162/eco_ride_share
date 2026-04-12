import React, { useState, useEffect } from 'react';
import { apiGet } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import BikeCard from '../components/BikeCard';
import Loader from '../components/Loader';
import { SearchIcon, LocationIcon } from '../assets/icons';
import './Bikes.css';

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ location: '', type: '' });

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const data = await apiGet(API_ENDPOINTS.BIKES);
      setBikes(data);
      setFilteredBikes(data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
      // Mock data for demo
      const mockBikes = [
        { id: 1, name: 'City Cruiser', location: 'London Bridge', type: 'Standard', pricePerHour: 5, status: 'available' },
        { id: 2, name: 'Mountain Bike', location: 'Hyde Park', type: 'Mountain', pricePerHour: 8, status: 'available' },
        { id: 3, name: 'Electric Bike', location: 'Canary Wharf', type: 'Electric', pricePerHour: 12, status: 'available' },
        { id: 4, name: 'Folding Bike', location: 'King\'s Cross', type: 'Folding', pricePerHour: 6, status: 'booked' },
      ];
      setBikes(mockBikes);
      setFilteredBikes(mockBikes);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const filtered = bikes.filter(bike => {
      const locationMatch = bike.location.toLowerCase().includes(search.location.toLowerCase());
      const typeMatch = !search.type || bike.type === search.type;
      return locationMatch && typeMatch;
    });
    
    setFilteredBikes(filtered);
  };

  const handleReset = () => {
    setSearch({ location: '', type: '' });
    setFilteredBikes(bikes);
  };

  if (loading) return <Loader />;

  return (
    <div className="bikes-page">
      <div className="container">
        <div className="page-header">
          <h1>Available Bikes</h1>
          <p>Find and rent bikes for your short-distance trips</p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-inputs">
              <div className="search-input">
                <LocationIcon />
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={search.location}
                  onChange={(e) => setSearch({ ...search, location: e.target.value })}
                />
              </div>
              
              <select
                className="input-field"
                value={search.type}
                onChange={(e) => setSearch({ ...search, type: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="Standard">Standard</option>
                <option value="Mountain">Mountain</option>
                <option value="Electric">Electric</option>
                <option value="Folding">Folding</option>
              </select>
            </div>
            
            <div className="search-actions">
              <button type="submit" className="btn btn-primary">
                <SearchIcon /> Search
              </button>
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="bike-stats">
          <p>{filteredBikes.length} bikes available</p>
        </div>

        <div className="bikes-grid">
          {filteredBikes.length > 0 ? (
            filteredBikes.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))
          ) : (
            <div className="empty-state">
              <BikeIcon />
              <h3>No Bikes Found</h3>
              <p>Try adjusting your search criteria</p>
              <button className="btn btn-primary" onClick={handleReset}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bikes;