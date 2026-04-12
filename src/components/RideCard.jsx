import React from 'react';
import { Link } from 'react-router-dom';
import { LocationIcon, CalendarIcon, ClockIcon, UserIcon, CarIcon } from '../assets/icons';
import { formatDate, formatTime, formatCurrency, getInitials } from '../utils/helpers';
import './RideCard.css';

const RideCard = ({ ride }) => {
  return (
    <div className="ride-card">
      <div className="ride-header">
        <div className="driver-info">
          <div className="driver-avatar">
            {ride.driver?.avatar ? (
              <img src={ride.driver.avatar} alt={ride.driver.name} />
            ) : (
              <span>{getInitials(ride.driver?.name)}</span>
            )}
          </div>
          <div>
            <h4>{ride.driver?.name}</h4>
            <div className="rating">
              <span>⭐</span> {ride.driver?.rating || '4.5'}
            </div>
          </div>
        </div>
        <div className="ride-price">
          <span className="price">{formatCurrency(ride.price)}</span>
          <span className="per-seat">per seat</span>
        </div>
      </div>

      <div className="ride-route">
        <div className="location">
          <LocationIcon />
          <div>
            <label>From</label>
            <p>{ride.pickup}</p>
          </div>
        </div>
        <div className="route-line"></div>
        <div className="location">
          <LocationIcon />
          <div>
            <label>To</label>
            <p>{ride.destination}</p>
          </div>
        </div>
      </div>

      <div className="ride-details">
        <div className="detail">
          <CalendarIcon />
          <span>{formatDate(ride.date)}</span>
        </div>
        <div className="detail">
          <ClockIcon />
          <span>{formatTime(ride.date)}</span>
        </div>
        <div className="detail">
          <CarIcon />
          <span>{ride.vehicle}</span>
        </div>
        <div className="detail">
          <UserIcon />
          <span>{ride.availableSeats} seats left</span>
        </div>
      </div>

      <Link to={`/rides/${ride.id}`} className="btn btn-primary btn-full">
        View Details
      </Link>
    </div>
  );
};

export default RideCard;