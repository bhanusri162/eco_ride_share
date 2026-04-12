export const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (date, time) => {
  if (!date && !time) return '';

  const value = time ? `${date}T${time}` : date;

  return new Date(value).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

export const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
};

export const truncateText = (text, length = 100) => {
  return text?.length > length ? text.substring(0, length) + '...' : text;
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'An error occurred';
};
