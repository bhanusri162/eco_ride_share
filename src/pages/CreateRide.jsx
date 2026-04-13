import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiPost } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import MapPicker from '../components/MapPicker';
import Loader from '../components/Loader';
import { CalendarIcon, ClockIcon, UserIcon, CarIcon } from '../assets/icons';
import './CreateRide.css';

const CreateRide = () => {
  const navigate = useNavigate();
  const { showNotification } = useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pickup: { address: '', lat: null, lng: null },
    destination: { address: '', lat: null, lng: null },
    date: '',
    time: '',
    seats: 1,
    price: '',
    vehicle: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [activeMap, setActiveMap] = useState('pickup'); // 'pickup' or 'destination'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleLocationSelect = (type, location) => {
    setFormData({
      ...formData,
      [type]: location,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pickup.address) newErrors.pickup = 'Pickup location is required';
    if (!formData.destination.address) newErrors.destination = 'Destination is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.seats || formData.seats < 1) newErrors.seats = 'At least 1 seat is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.vehicle) newErrors.vehicle = 'Vehicle type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const rideData = {
        ...formData,
        dateTime: `${formData.date}T${formData.time}`,
      };
      
      await apiPost(API_ENDPOINTS.RIDES, rideData);
      showNotification('Ride posted successfully!', 'success');
      navigate('/rides');
    } catch (error) {
      showNotification('Failed to create ride', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="create-ride-page">
      <div className="container">
        <div className="page-header">
          <h1>Post a Ride</h1>
          <p>Share your journey with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="create-ride-form">
          <div className="form-section">
            <h2>Route Information</h2>
            
            <div className="map-tabs">
              <button
                type="button"
                className={`map-tab ${activeMap === 'pickup' ? 'active' : ''}`}
                onClick={() => setActiveMap('pickup')}
              >
                Pickup Location
              </button>
              <button
                type="button"
                className={`map-tab ${activeMap === 'destination' ? 'active' : ''}`}
                onClick={() => setActiveMap('destination')}
              >
                Destination
              </button>
            </div>

            {activeMap === 'pickup' && (
              <div className="input-group">
                <label className="input-label">Pickup Location *</label>
                <MapPicker
                  onLocationSelect={(location) => handleLocationSelect('pickup', location)}
                  initialLocation={formData.pickup.lat ? formData.pickup : null}
                />
                {errors.pickup && <span className="error-message">{errors.pickup}</span>}
              </div>
            )}

            {activeMap === 'destination' && (
              <div className="input-group">
                <label className="input-label">Destination *</label>
                <MapPicker
                  onLocationSelect={(location) => handleLocationSelect('destination', location)}
                  initialLocation={formData.destination.lat ? formData.destination : null}
                />
                {errors.destination && <span className="error-message">{errors.destination}</span>}
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Schedule</h2>
            
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">
                  <CalendarIcon /> Date *
                </label>
                <input
                  type="date"
                  name="date"
                  className={`input-field ${errors.date ? 'error' : ''}`}
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">
                  <ClockIcon /> Time *
                </label>
                <input
                  type="time"
                  name="time"
                  className={`input-field ${errors.time ? 'error' : ''}`}
                  value={formData.time}
                  onChange={handleInputChange}
                />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Ride Details</h2>
            
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">
                  <UserIcon /> Available Seats *
                </label>
                <input
                  type="number"
                  name="seats"
                  className={`input-field ${errors.seats ? 'error' : ''}`}
                  value={formData.seats}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                />
                {errors.seats && <span className="error-message">{errors.seats}</span>}
              </div>

              <div className="input-group">
                <label className="input-label">
                  💷 Price per Seat (£) *
                </label>
                <input
                  type="number"
                  name="price"
                  className={`input-field ${errors.price ? 'error' : ''}`}
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <CarIcon /> Vehicle Type *
              </label>
              <select
                name="vehicle"
                className={`input-field ${errors.vehicle ? 'error' : ''}`}
                value={formData.vehicle}
                onChange={handleInputChange}
              >
                <option value="">Select vehicle type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                className="input-field"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any additional information for passengers..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/rides')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              Post Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRide;
