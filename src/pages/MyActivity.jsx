import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiPut } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import Loader from '../components/Loader';
import './MyActivity.css';

const MyActivity = () => {
  const { showNotification } = useApp();
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [data, setData] = useState({
    postedRides: [],
    rideBookings: [],
    rideRequests: [],
    bikeBookings: [],
  });

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const [postedRides, rideBookings, rideRequests, bikeBookings] = await Promise.all([
        apiGet(`${API_ENDPOINTS.RIDES}/my/list`),
        apiGet(`${API_ENDPOINTS.BOOKINGS}/rides/my`),
        apiGet(`${API_ENDPOINTS.BOOKINGS}/rides/requests/my`),
        apiGet(`${API_ENDPOINTS.BOOKINGS}/bikes/my`),
      ]);

      setData({ postedRides, rideBookings, rideRequests, bikeBookings });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (bookingId, status) => {
    setProcessingId(bookingId);
    try {
      const response = await apiPut(
        `${API_ENDPOINTS.BOOKINGS}/rides/requests/${bookingId}/status`,
        { status }
      );
      showNotification(response?.message || 'Request updated', 'success');
      await fetchActivity();
    } catch (error) {
      showNotification(error?.response?.data?.message || 'Failed to update request', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="activity-page">
      <div className="container">
        <div className="page-header">
          <h1>My Commute Activity</h1>
          <p>Track rides you posted, rides you joined, and bike reservations in one place.</p>
        </div>

        <div className="activity-grid">
          <section className="card activity-section">
            <div className="section-header">
              <h2>Rides I Posted</h2>
              <Link to="/rides/create">Create another ride</Link>
            </div>
            {data.postedRides.length ? data.postedRides.map((ride) => (
              <Link key={ride.ride_id} to={`/rides/${ride.ride_id}`} className="activity-item">
                <strong>{ride.pickup_address} → {ride.destination_address}</strong>
                <span>{formatDate(ride.ride_date)} at {formatTime(ride.ride_date, ride.ride_time)}</span>
                <span>{ride.available_seats}/{ride.total_seats} seats left</span>
              </Link>
            )) : <p>No rides posted yet.</p>}
          </section>

          <section className="card activity-section">
            <div className="section-header">
              <h2>Rides I Joined</h2>
              <Link to="/rides">Find more rides</Link>
            </div>
            {data.rideBookings.length ? data.rideBookings.map((booking) => (
              <div key={booking.booking_id} className="activity-item">
                <strong>{booking.pickup_address} → {booking.destination_address}</strong>
                <span>{formatDate(booking.ride_date)} at {formatTime(booking.ride_date, booking.ride_time)}</span>
                <span>{booking.seats_booked} seat(s) booked • {formatCurrency(booking.total_price)}</span>
                <span className={`status-chip status-${booking.status || 'pending'}`}>
                  {booking.status || 'pending'}
                </span>
              </div>
            )) : <p>No ride bookings yet.</p>}
          </section>

          <section className="card activity-section">
            <div className="section-header">
              <h2>Ride Requests To Approve</h2>
              <Link to="/rides">View rides</Link>
            </div>
            {data.rideRequests.length ? data.rideRequests.map((request) => (
              <div key={request.booking_id} className="activity-item">
                <strong>{request.first_name} {request.last_name}</strong>
                <span>{request.pickup_address} → {request.destination_address}</span>
                <span>
                  {formatDate(request.ride_date)} at {formatTime(request.ride_date, request.ride_time)} •
                  {' '}Requested {request.seats_booked} seat(s)
                </span>
                <div className="activity-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={processingId === request.booking_id}
                    onClick={() => handleRequestAction(request.booking_id, 'confirmed')}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    disabled={processingId === request.booking_id}
                    onClick={() => handleRequestAction(request.booking_id, 'cancelled')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )) : <p>No pending requests right now.</p>}
          </section>

          <section className="card activity-section">
            <div className="section-header">
              <h2>Bike Bookings</h2>
              <Link to="/bikes">Browse bikes</Link>
            </div>
            {data.bikeBookings.length ? data.bikeBookings.map((booking) => (
              <div key={booking.booking_id} className="activity-item">
                <strong>{booking.bike_name}</strong>
                <span>{booking.location_address}</span>
                <span>{formatDate(booking.start_time)} to {formatDate(booking.end_time)}</span>
                <span>{formatCurrency(booking.total_price)}</span>
              </div>
            )) : <p>No bike bookings yet.</p>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
