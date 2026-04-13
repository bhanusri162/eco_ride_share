import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MAP_DEFAULTS } from '../utils/constants';
import { LocationIcon, SearchIcon } from '../assets/icons';
import './MapPicker.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

const MapEvents = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

const MapController = ({ onMapReady }) => {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
};

const MapPicker = ({ onLocationSelect, initialLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || MAP_DEFAULTS.center);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
  };

  useEffect(() => {
    if (initialLocation?.lat && initialLocation?.lng) {
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`
    );
    if (!response.ok) throw new Error('Reverse geocoding failed');
    return response.json();
  };

  const forwardGeocode = async (query) => {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/search?format=jsonv2&q=${encodeURIComponent(query)}&limit=1`
    );
    if (!response.ok) throw new Error('Location search failed');
    return response.json();
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({ lat, lng });

    try {
      const result = await reverseGeocode(lat, lng);
      onLocationSelect({
        lat,
        lng,
        address: result?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      });
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      onLocationSelect({
        lat,
        lng,
        address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery || !map) return;

    try {
      const results = await forwardGeocode(searchQuery);
      if (!results?.length) {
        alert('Location not found');
        return;
      }

      const location = results[0];
      const lat = Number(location.lat);
      const lng = Number(location.lon);

      setSelectedLocation({ lat, lng });
      map.setView([lat, lng], 15);

      onLocationSelect({
        lat,
        lng,
        address: location.display_name,
      });
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search location');
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setSelectedLocation({ lat, lng });
          map?.setView([lat, lng], 15);

          reverseGeocode(lat, lng)
            .then((result) => {
              onLocationSelect({
                lat,
                lng,
                address: result?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
              });
            })
            .catch((error) => {
              console.error('Reverse geocoding error:', error);
              onLocationSelect({
                lat,
                lng,
                address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
              });
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

  return (
    <div className="map-picker">
      <div className="map-search">
        <input
          type="text"
          className="input-field"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          <SearchIcon /> Search
        </button>
        <button type="button" className="btn btn-outline" onClick={handleGetCurrentLocation}>
          Use Current Location
        </button>
      </div>

      <MapContainer
        center={[selectedLocation.lat, selectedLocation.lng]}
        zoom={MAP_DEFAULTS.zoom}
        style={mapContainerStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
        <MapEvents onMapClick={handleMapClick} />
        <MapController onMapReady={setMap} />
      </MapContainer>

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
