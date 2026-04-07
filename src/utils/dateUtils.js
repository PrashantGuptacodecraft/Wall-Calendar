/**
 * Utility functions for date math and calendar generation.
 */

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const day = new Date(year, month, 1).getDay();
  // Adjust to make Monday the first day of the week (0) and Sunday the last (6)
  return day === 0 ? 6 : day - 1; 
};

export const generateCalendarDates = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  
  const dates = [];
  
  // Previous month dates
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false
    });
  }
  
  // Current month dates
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Next month dates to fill the 6x7 grid (42 days)
  const daysRemaining = 42 - dates.length;
  for (let i = 1; i <= daysRemaining; i++) {
    dates.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return dates;
};

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date) => {
  const today = new Date();
  return isSameDay(date, today);
};

export const formatMonthYear = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
};

export const getMonthName = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
};

export const getYear = (date) => {
  return date.getFullYear();
};
