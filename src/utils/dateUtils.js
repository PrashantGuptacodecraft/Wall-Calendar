// Some helpful functions for the calendar dates

// gets total days in any given month
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// gets what day of the week the month starts on
export const getFirstDayOfMonth = (year, month) => {
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  let day = new Date(year, month, 1).getDay();
  // make Monday the start of the week instead of Sunday
  return day === 0 ? 6 : day - 1; 
};

// main function to get all days for the grid
export const generateCalendarDates = (year, month) => {
  let daysInMonth = getDaysInMonth(year, month);
  let firstDay = getFirstDayOfMonth(year, month);
  
  let daysInPrevMonth = getDaysInMonth(year, month - 1);
  
  let dates = [];
  
  // add days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false
    });
  }
  
  // add days for this month
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // add days for next month so it fills up the 42 boxes completely
  let daysRemaining = 42 - dates.length;
  for (let i = 1; i <= daysRemaining; i++) {
    dates.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return dates;
};

// check if two dates are exactly the same
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// quick check for today's date
export const isToday = (date) => {
  let today = new Date();
  return isSameDay(date, today);
};

// format like "January 2026"
export const formatMonthYear = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
};

// just month name
export const getMonthName = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
};

// just the year
export const getYear = (date) => {
  return date.getFullYear();
};

// my custom extra feature: holidays!
const holidays = [
  { month: 0, date: 1, icon: "🎆", name: "New Year" },
  { month: 1, date: 14, icon: "💝", name: "Valentine's Day" },
  { month: 2, date: 17, icon: "🍀", name: "St. Patrick's" },
  { month: 3, date: 1, icon: "🃏", name: "April Fools" },
  { month: 6, date: 4, icon: "🎇", name: "Independence" },
  { month: 9, date: 31, icon: "🎃", name: "Halloween" },
  { month: 10, date: 28, icon: "🦃", name: "Thanksgiving" },
  { month: 11, date: 25, icon: "🎄", name: "Christmas" },
  { month: 11, date: 31, icon: "🍾", name: "NYE" }
];

export const getHoliday = (date) => {
  let found = holidays.find(h => h.month === date.getMonth() && h.date === date.getDate());
  return found ? found : null;
};
