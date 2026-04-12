import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiGet, apiPost } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import CommentSection from '../components/CommentSection';
import Loader from '../components/Loader';
import { LocationIcon, CalendarIcon, ClockIcon, UserIcon, CarIcon, StarIcon } from '../assets/icons';
import { formatDate, formatTime, formatCurrency, getInitials } from '../utils/helpers';
import './RideDetail.css';

const RideDetail = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, showNotification } = useApp();
  const [ride, setRide] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchRideDetails();
  }, [rideId]);

  const fetchRideDetails = async () => {
    try {
      const [rideData, commentsData] = await Promise.all([
        apiGet(`${API_ENDPOINTS.RIDES}/${rideId}`),
        apiGet(`${API_ENDPOINTS.RIDES}/${rideId}/comments`),
      ]);
      setRide(rideData);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching ride:', error);
      // Mock data
      setRide({
        id: rideId,
        driver: { id: 1, name: 'John Doe', rating: 4.8 },
        pickup: 'London Bridge',
        destination: 'Oxford Street',
        date: new Date().toISOString(),
        price: 15,
        availableSeats: 2,
        totalSeats: 4,
        vehicle: 'Toyota Prius',
        notes: 'No smoking please. I have space for small luggage.',
      });
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRide = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      await apiPost(`${API_ENDPOINTS.RIDES}/${rideId}/book`, {});
      showNotification('Ride booked successfully!', 'success');
      fetchRideDetails();
    } catch (error) {
      showNotification('Failed to book ride', 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await apiPost(`${API_ENDPOINTS.RIDES}/${rideId}/comments`, commentData);
      setComments([newComment, ...comments]);
      showNotification('Comment added!', 'success');
    } catch (error) {
      showNotification('Failed to add comment', 'error');
      throw error;
    }
  };

  if (loading) return <Loader />;
  if (!ride) return <div className="container">Ride not found</div>;

  const isDriver = user?.id === ride.driver?.id;
  const canBook = !isDriver && ride.availableSeats > 0 && isAuthenticated;

  return (
    <div className="ride-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/rides')}>
          ← Back to Rides
        </button>

        <div className="ride-detail-grid">
          <div className="ride-main">
            <div className="card ride-detail-card">
              <div className="ride-header">
                <div className="driver-info">
                  <div className="driver-avatar">
                    {getInitials(ride.driver?.name)}
                  </div>
                  <div>
                    <h2>{ride.driver?.name}</h2>
                    <div className="driver-rating">
                      <StarIcon filled />
                      <span>{ride.driver?.rating || '4.8'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="route-display">
                <div className="route-point">
                  <div className="point-marker pickup"></div>
                  <div>
                    <label>Pickup</label>
                    <p>{ride.pickup}</p>
                  </div>
                </div>
                <div className="route-line"></div>
                <div className="route-point">
                  <div className="point-marker destination"></div>
                  <div>
                    <label>Destination</label>
                    <p>{ride.destination}</p>
                  </div>
                </div>
              </div>

              <div className="ride-info-grid">
                <div className="info-item">
                  <CalendarIcon />
                  <div>
                    <label>Date</label>
                    <p>{formatDate(ride.date)}</p>
                  </div>
                </div>
                <div className="info-item">
                  <ClockIcon />
                  <div>
                    <label>Time</label>
                    <p>{formatTime(ride.date)}</p>
                  </div>
                </div>
                <div className="info-item">
                  <UserIcon />
                  <div>
                    <label>Available Seats</label>
                    <p>{ride.availableSeats} of {ride.totalSeats}</p>
                  </div>
                </div>
                <div className="info-item">
                  <CarIcon />
                  <div>
                    <label>Vehicle</label>
                    <p>{ride.vehicle}</p>
                  </div>
                </div>
              </div>

              {ride.notes && (
                <div className="ride-notes">
                  <h3>Additional Notes</h3>
                  <p>{ride.notes}</p>
                </div>
              )}
            </div>

            <CommentSection
              comments={comments}
              onAddComment={handleAddComment}
              rideId={rideId}
            />
          </div>

          <div className="ride-sidebar">
            <div className="card booking-card">
              <div className="price-section">
                <span className="price">{formatCurrency(ride.price)}</span>
                <span className="per-seat">per seat</span>
              </div>

              <div className="seats-info">
                <span className={`seats-available ${ride.availableSeats > 0 ? 'available' : 'full'}`}>
                  {ride.availableSeats > 0 ? `${ride.availableSeats} seats available` : 'Fully booked'}
                </span>
              </div>

              {canBook && (
                <button
                  className="btn btn-primary btn-full btn-lg"
                  onClick={handleBookRide}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : 'Book Now'}
                </button>
              )}

              {!isAuthenticated && (
                <button
                  className="btn btn-primary btn-full"
                  onClick={() => navigate('/login')}
                >
                  Login to Book
                </button>
              )}

              {isDriver && (
                <div className="driver-message">
                  <p>This is your ride</p>
                  <button className="btn btn-outline btn-full">Manage Ride</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetail;