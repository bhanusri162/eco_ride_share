const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const loginUser = (payload) =>
  request('/ecorideshare/autenticate/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const registerUser = (payload) =>
  request('/ecorideshare/autenticate/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const submitContactMessage = (payload) =>
  request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
