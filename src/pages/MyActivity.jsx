import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { formatCurrency, formatDate, formatTime } from '../utils/helpers';
import Loader from '../components/Loader';
import './MyActivity.css';

const MyActivity = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    postedRides: [],
    rideBookings: [],
    bikeBookings: [],
  });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const [postedRides, rideBookings, bikeBookings] = await Promise.all([
          apiGet(`${API_ENDPOINTS.RIDES}/my/list`),
          apiGet(`${API_ENDPOINTS.BOOKINGS}/rides/my`),
          apiGet(`${API_ENDPOINTS.BOOKINGS}/bikes/my`),
        ]);

        setData({ postedRides, rideBookings, bikeBookings });
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

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
              </div>
            )) : <p>No ride bookings yet.</p>}
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
