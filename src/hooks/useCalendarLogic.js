import { useState } from 'react';

export function useCalendarLogic() {
  // basic state stuff
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // start and end date for ranges
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // hover effect state
  const [hoverDate, setHoverDate] = useState(null);

  // flipping animation state!
  const [isFlipping, setIsFlipping] = useState(false);

  // function to go back a month
  const prevMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
      setIsFlipping(false);
    }, 250); // match animation duration
  };

  // function to go to next month
  const nextMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
      setIsFlipping(false);
    }, 250);
  };
  
  // clear everything
  const resetRange = () => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  };

  // clicking a date block logic
  const handleDateClick = (date) => {
    // console.log("clicked date: ", date)
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // user clicked a past date, so swap them
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  // hover logic 
  const handleDateHover = (date) => {
    if (startDate && !endDate) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  };

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
    isFlipping 
  };
}
