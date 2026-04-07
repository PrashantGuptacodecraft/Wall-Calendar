import { useState, useCallback } from 'react';

export function useCalendarLogic() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Selection ranges
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Hover state for range preview
  const [hoverDate, setHoverDate] = useState(null);

  const prevMonth = useCallback(() => {
    setCurrentDate(prev => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  }, []);
  
  const resetRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  }, []);

  const handleDateClick = useCallback((date) => {
    if (!startDate || (startDate && endDate)) {
      // Start fresh
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // If clicking a date before start date, swap or just prevent?
      // Let's swap
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const handleDateHover = useCallback((date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  }, [startDate, endDate]);

  return {
    currentDate,
    prevMonth,
    nextMonth,
    startDate,
    endDate,
    hoverDate,
    handleDateClick,
    handleDateHover,
    resetRange,
  };
}
