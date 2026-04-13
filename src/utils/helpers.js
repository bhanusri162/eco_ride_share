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

  const formatFromDate = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle MySQL TIME values like "08:00:00" or "08:00".
  if (typeof time === 'string') {
    const timeMatch = time.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (timeMatch) {
      const [, hours, minutes, seconds = '00'] = timeMatch;
      const normalizedDate = typeof date === 'string' && date ? date.slice(0, 10) : '1970-01-01';
      const formatted = formatFromDate(`${normalizedDate}T${hours.padStart(2, '0')}:${minutes}:${seconds}`);
      if (formatted) return formatted;
    }
  }

  // Handle full datetime-like time strings.
  if (time) {
    const formatted = formatFromDate(time);
    if (formatted) return formatted;
  }

  const value = date && time ? `${date}T${time}` : (time || date);
  const formatted = formatFromDate(value);
  if (formatted) return formatted;

  // Last fallback: show raw time text instead of "Invalid Date".
  if (typeof time === 'string' && time.trim()) return time;

  return '';
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
