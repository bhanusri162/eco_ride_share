import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getUserData,
  setUserData,
  clearAuth,
  isAuthenticated,
  setAuthToken,
} from '../utils/auth';
import { apiGet, apiPost, apiPut } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { getErrorMessage } from '../utils/helpers';

const AppContext = createContext();

const normalizeUser = (user) => {
  if (!user) return null;

  const firstName = user.firstName || user.first_name || '';
  const lastName = user.lastName || user.last_name || '';
  const fullName = user.name || `${firstName} ${lastName}`.trim() || user.user_name || 'User';

  return {
    id: user.id || user.user_id || null,
    username: user.username || user.user_name || '',
    name: fullName,
    firstName,
    lastName,
    email: user.email || '',
    phone: user.phone || user.mobile_no || '',
    address: user.address || '',
    gender: user.gender || 'prefer_not_to_say',
    role: user.role || '',
    rating: user.rating || 0,
    ratingCount: user.ratingCount || user.rating_count || 0,
    memberSince: user.memberSince || user.created_at || null,
  };
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(normalizeUser(getUserData()));
    }
    setLoading(false);
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const login = async (email, password) => {
    try {
      const response = await apiPost(API_ENDPOINTS.LOGIN, { email, password });
      const normalizedUser = normalizeUser(response.user);

      setAuthToken(response.token);
      setUser(normalizedUser);
      setUserData(normalizedUser);
      showNotification('Login successful!', 'success');
      return { success: true };
    } catch (error) {
      showNotification(getErrorMessage(error), 'error');
      return { success: false, error: getErrorMessage(error) };
    }
  };

  const register = async (formData) => {
    try {
      await apiPost(API_ENDPOINTS.REGISTER, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        mobileNo: formData.phone,
        gender: formData.gender,
        role: formData.role,
        acceptedTerms: true,
        address: formData.address || '',
      });

      return login(formData.email, formData.password);
    } catch (error) {
      showNotification(getErrorMessage(error), 'error');
      return { success: false, error: getErrorMessage(error) };
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await apiGet(API_ENDPOINTS.PROFILE);
      const normalizedUser = normalizeUser(profile);

      setUser(normalizedUser);
      setUserData(normalizedUser);
      return normalizedUser;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  const updateProfile = async (profileData) => {
    try {
      await apiPut(API_ENDPOINTS.PROFILE, profileData);
      const updatedUser = await refreshProfile();
      showNotification('Profile updated successfully!', 'success');
      return updatedUser;
    } catch (error) {
      showNotification(getErrorMessage(error), 'error');
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    showNotification('Logged out successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        notification,
        login,
        register,
        updateProfile,
        refreshProfile,
        logout,
        showNotification,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
