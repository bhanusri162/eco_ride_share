export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: '/ecorideshare/autenticate/login',
  REGISTER: '/ecorideshare/autenticate/register',
  RIDES: '/api/rides',
  BIKES: '/api/bikes',
  PROFILE: '/api/profile',
  BOOKINGS: '/api/bookings',
  COMMENTS: '/api/comments',
  MESSAGES: '/api/messages',
  CONTACT: '/contact',
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
