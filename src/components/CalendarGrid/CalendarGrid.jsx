import React from 'react';
import styles from './CalendarGrid.module.css';
import { formatMonthYear, isSameDay, isToday, getHoliday } from '../../utils/dateUtils';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function CalendarGrid({ 
  date, 
  days, 
  startDate, 
  endDate, 
  hoverDate, 
  onClick, 
  onHover,
  onPrev,
  onNext
}) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // getting all the class names for the day cell
  const getDayClasses = (dayObj) => {
    let classes = [styles.dateCellWrapper];
    
    let dayOfWeek = dayObj.date.getDay();
    // 0 is sunday, 6 is saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) classes.push(styles.isWeekend);
    
    // gray out days not in this month
    if (!dayObj.isCurrentMonth) classes.push(styles.isPrevNextMonth);
    // highlight today
    if (isToday(dayObj.date)) classes.push(styles.isToday);
    
    // check if this is the start or end date selected
    if (isSameDay(dayObj.date, startDate) || isSameDay(dayObj.date, endDate)) {
      classes.push(styles.isSelected);
    }

    return classes.join(' ');
  };

  // function to render the blue background when selecting dates
  const renderSelectionBackground = (currentCellDate) => {
    if (!startDate) return null;

    // if only start date is picked and user is hovering
    if (startDate && !endDate && hoverDate) {
      // figure out which one is smaller
      let min = startDate < hoverDate ? startDate : hoverDate;
      let max = startDate < hoverDate ? hoverDate : startDate;
      
      if (currentCellDate >= min && currentCellDate <= max) {
        if (isSameDay(currentCellDate, min)) return <div className={`${styles.rangeRibbon} ${styles.rangeStartRibbon}`} />;
        if (isSameDay(currentCellDate, max)) return <div className={`${styles.rangeRibbon} ${styles.rangeEndRibbon}`} />;
        return <div className={styles.rangeRibbon} />;
      }
    }

    // if both start and end are picked
    if (startDate && endDate) {
      if (currentCellDate >= startDate && currentCellDate <= endDate) {
        if (isSameDay(currentCellDate, startDate)) return <div className={`${styles.rangeRibbon} ${styles.rangeStartRibbon}`} />;
        if (isSameDay(currentCellDate, endDate)) return <div className={`${styles.rangeRibbon} ${styles.rangeEndRibbon}`} />;
        return <div className={styles.rangeRibbon} />;
      }
    }

    return null;
  };

  return (
    <div className={styles.calendarGridContainer}>
      <div className={styles.calendarHeader}>
        {/* showing the month and year */}
        <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-main)' }}>
          {formatMonthYear(date)}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {/* prev/next buttons */}
          <button className={styles.navButton} onClick={onPrev}><FiChevronLeft size={20} /></button>
          <button className={styles.navButton} onClick={onNext}><FiChevronRight size={20} /></button>
        </div>
      </div>
      
      <div className={styles.daysHeader}>
        {daysOfWeek.map(day => <span key={day}>{day}</span>)}
      </div>
      
      {/* mouse leave resets the hover effect */}
      <div className={styles.daysGrid} onMouseLeave={() => onHover(null)}>
        {days.map((dayObj, i) => (
          <div 
            key={i} 
            className={getDayClasses(dayObj)}
            onMouseEnter={() => onHover(dayObj.date)}
            title={getHoliday(dayObj.date)?.name}
          >
            {renderSelectionBackground(dayObj.date)}
            <button 
              className={styles.dateCellBtn}
              onClick={() => onClick(dayObj.date)}
            >
              {dayObj.date.getDate()}
              {/* Extra Feature: Holiday Markers! */}
              {getHoliday(dayObj.date) && (
                <span className={styles.holidayIcon}>
                  {getHoliday(dayObj.date).icon}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
