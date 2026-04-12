import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPost } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';
import Loader from '../components/Loader';
import { BikeIcon, LocationIcon } from '../assets/icons';
import './BikeDetail.css';

const BikeDetail = () => {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await apiGet(`${API_ENDPOINTS.BIKES}/${bikeId}`);
        setBike(data);
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Unable to load bike details');
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [bikeId]);

  const estimatedTotal = useMemo(() => {
    if (!formData.startTime || !formData.endTime || !bike?.pricePerHour) return null;
    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    const totalHours = Math.max((end - start) / (1000 * 60 * 60), 0);
    if (!Number.isFinite(totalHours) || totalHours <= 0) return null;
    return totalHours * Number(bike.pricePerHour);
  }, [bike, formData.endTime, formData.startTime]);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage('');
  };

  const handleBookBike = async (event) => {
    event.preventDefault();
    if (!formData.startTime || !formData.endTime) {
      setMessage('Please select a valid start and end time.');
      return;
    }

    setBookingLoading(true);
    try {
      const response = await apiPost(`${API_ENDPOINTS.BOOKINGS}/bikes/${bikeId}`, formData);
      setMessage(`Bike booked successfully. Estimated total: ${formatCurrency(response.totalPrice)}`);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Bike booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!bike) return <div className="container page-state">{message || 'Bike not found'}</div>;

  return (
    <div className="bike-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/bikes')}>← Back to Bikes</button>

        <div className="bike-detail-grid">
          <section className="card bike-overview-card">
            <div className="bike-detail-image">
              {bike.image ? <img src={bike.image} alt={bike.name} /> : <BikeIcon />}
            </div>

            <div className="bike-detail-copy">
              <span className={`bike-detail-status ${bike.status}`}>{bike.status}</span>
              <h1>{bike.name}</h1>
              <p>{bike.description || 'A reliable bike for short-distance city travel and last-mile commuting.'}</p>

              <div className="bike-detail-meta">
                <span><LocationIcon /> {bike.location}</span>
                <span>Type: {bike.type}</span>
                <span>Gears: {bike.gears || 7}</span>
                <span>{formatCurrency(bike.pricePerHour)} / hour</span>
                {bike.pricePerDay ? <span>{formatCurrency(bike.pricePerDay)} / day</span> : null}
              </div>

              {bike.owner ? (
                <div className="bike-owner-panel">
                  <p className="section-tag">Bike owner</p>
                  <h3>{bike.owner.name}</h3>
                  <div className="owner-actions">
                    <Link to={`/commuters/${bike.owner.id}`} className="btn btn-outline">View Profile</Link>
                    <Link
                      to={`/messages?user=${bike.owner.id}&name=${encodeURIComponent(bike.owner.name)}`}
                      className="btn btn-primary"
                    >
                      Contact Owner
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          <aside className="card booking-panel">
            <h2>Reserve This Bike</h2>
            <p>Best for students and office commuters handling the final stretch after a shared ride.</p>

            <form onSubmit={handleBookBike} className="bike-booking-form">
              <div className="input-group">
                <label className="input-label">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  className="input-field"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  className="input-field"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>

              {estimatedTotal ? (
                <div className="booking-summary">
                  <span>Estimated total</span>
                  <strong>{formatCurrency(estimatedTotal)}</strong>
                </div>
              ) : null}

              {message ? <p className="booking-message">{message}</p> : null}

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={bookingLoading || bike.status !== 'available'}
              >
                {bookingLoading ? 'Booking...' : bike.status === 'available' ? 'Book Bike' : 'Currently Unavailable'}
              </button>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BikeDetail;
