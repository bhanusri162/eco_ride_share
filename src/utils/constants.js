export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888/eco-ride-share-api';

export const API_ENDPOINTS = {
  LOGIN: '/ymhs/autenticate/login',
  REGISTER: '/ymhs/autenticate/register',
  RIDES: '/api/rides',
  BIKES: '/api/bikes',
  PROFILE: '/api/profile',
};

export const STORAGE_KEYS = {
  TOKEN: 'eco_token',
  USER: 'eco_user',
};

export const RIDE_STATUS = {
  ACTIVE: 'active',
  FULL: 'full',
  COMPLETED: 'completed',
};

export const MAP_DEFAULTS = {
  center: { lat: 51.5074, lng: -0.1278 },
  zoom: 12,
};