import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, setUserData, clearAuth, isAuthenticated } from '../utils/auth';
import { apiPost } from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';
import { getErrorMessage } from '../utils/helpers';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUserData());
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
      setUser(response.user);
      setUserData(response.user);
      showNotification('Login successful!', 'success');
      return { success: true };
    } catch (error) {
      showNotification(getErrorMessage(error), 'error');
      return { success: false, error: getErrorMessage(error) };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiPost(API_ENDPOINTS.REGISTER, userData);
      setUser(response.user);
      setUserData(response.user);
      showNotification('Registration successful!', 'success');
      return { success: true };
    } catch (error) {
      showNotification(getErrorMessage(error), 'error');
      return { success: false, error: getErrorMessage(error) };
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