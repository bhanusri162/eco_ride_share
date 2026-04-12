import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MAP_DEFAULTS } from '../utils/constants';
import { LocationIcon } from '../assets/icons';
import './MapPicker.css';

const MapPicker = ({ onLocationSelect, initialLocation, apiKey }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || MAP_DEFAULTS.center);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
  };

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    setSelectedLocation({ lat, lng });
    
    // Reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        onLocationSelect({
          lat,
          lng,
          address: results[0].formatted_address,
        });
      }
    });
  }, [onLocationSelect]);

  const handleSearch = () => {
    if (!searchQuery || !map) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        
        setSelectedLocation({ lat, lng });
        map.panTo({ lat, lng });
        map.setZoom(15);
        
        onLocationSelect({
          lat,
          lng,
          address: results[0].formatted_address,
        });
      }
    });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setSelectedLocation({ lat, lng });
          map?.panTo({ lat, lng });
          map?.setZoom(15);
          
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              onLocationSelect({
                lat,
                lng,
                address: results[0].formatted_address,
              });
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  if (!apiKey) {
    return (
      <div className="map-placeholder">
        <LocationIcon />
        <p>Please configure Google Maps API key</p>
      </div>
    );
  }

  return (
    <div className="map-picker">
      <div className="map-search">
        <input
          type="text"
          className="input-field"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="btn btn-outline" onClick={handleGetCurrentLocation}>
          Use Current Location
        </button>
      </div>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedLocation}
          zoom={MAP_DEFAULTS.zoom}
          onClick={handleMapClick}
          onLoad={setMap}
        >
          <Marker position={selectedLocation} />
        </GoogleMap>
      </LoadScript>

      {selectedLocation.address && (
        <div className="selected-location">
          <LocationIcon />
          <span>{selectedLocation.address}</span>
        </div>
      )}
    </div>
  );
};

export default MapPicker;