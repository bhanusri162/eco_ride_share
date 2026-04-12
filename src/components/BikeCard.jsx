import React from 'react';
import { Link } from 'react-router-dom';
import { LocationIcon, BikeIcon } from '../assets/icons';
import { formatCurrency } from '../utils/helpers';
import './BikeCard.css';

const BikeCard = ({ bike }) => {
  return (
    <div className="bike-card">
      <div className="bike-image">
        {bike.image ? (
          <img src={bike.image} alt={bike.name} />
        ) : (
          <div className="bike-placeholder">
            <BikeIcon />
          </div>
        )}
        <span className={`bike-status ${bike.status}`}>
          {bike.status === 'available' ? 'Available' : 'Booked'}
        </span>
      </div>

      <div className="bike-content">
        <h3 className="bike-name">{bike.name}</h3>
        
        <div className="bike-location">
          <LocationIcon />
          <span>{bike.location}</span>
        </div>

        <div className="bike-specs">
          <div className="spec">
            <span>Type:</span>
            <span>{bike.type || 'Standard'}</span>
          </div>
          <div className="spec">
            <span>Gears:</span>
            <span>{bike.gears || '7-speed'}</span>
          </div>
        </div>

        <div className="bike-footer">
          <div className="bike-price">
            <span className="price">{formatCurrency(bike.pricePerHour)}</span>
            <span className="unit">/ hour</span>
          </div>
          
          <Link to={`/bikes/${bike.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;