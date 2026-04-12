import { STORAGE_KEYS } from './constants';

export const setAuthToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setUserData = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUserData = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getUserName = () => {
  const user = getUserData();
  return user?.name || 'User';
};

export const getUserId = () => {
  const user = getUserData();
  return user?.id || null;
};