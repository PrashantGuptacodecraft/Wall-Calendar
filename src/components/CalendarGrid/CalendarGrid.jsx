import React from 'react';
import styles from './CalendarGrid.module.css';
import { formatMonthYear, isSameDay, isToday } from '../../utils/dateUtils';
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

  const getDayClasses = (item) => {
    const classes = [styles.dateCellWrapper];
    
    const dayOfWeek = item.date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) classes.push(styles.isWeekend);
    
    if (!item.isCurrentMonth) classes.push(styles.isPrevNextMonth);
    if (isToday(item.date)) classes.push(styles.isToday);
    if (isSameDay(item.date, startDate) || isSameDay(item.date, endDate)) {
      classes.push(styles.isSelected);
    }

    return classes.join(' ');
  };

  const getRangeRibbon = (date) => {
    if (!startDate) return null;

    if (startDate && !endDate && hoverDate) {
      const min = startDate < hoverDate ? startDate : hoverDate;
      const max = startDate < hoverDate ? hoverDate : startDate;
      
      if (date >= min && date <= max) {
        if (isSameDay(date, min)) return <div className={`${styles.rangeRibbon} ${styles.rangeStartRibbon}`} />;
        if (isSameDay(date, max)) return <div className={`${styles.rangeRibbon} ${styles.rangeEndRibbon}`} />;
        return <div className={styles.rangeRibbon} />;
      }
    }

    if (startDate && endDate) {
      if (date >= startDate && date <= endDate) {
        if (isSameDay(date, startDate)) return <div className={`${styles.rangeRibbon} ${styles.rangeStartRibbon}`} />;
        if (isSameDay(date, endDate)) return <div className={`${styles.rangeRibbon} ${styles.rangeEndRibbon}`} />;
        return <div className={styles.rangeRibbon} />;
      }
    }

    return null;
  };

  return (
    <div className={styles.calendarGridContainer}>
      <div className={styles.calendarHeader}>
        <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-main)' }}>
          {formatMonthYear(date)}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={styles.navButton} onClick={onPrev}><FiChevronLeft size={20} /></button>
          <button className={styles.navButton} onClick={onNext}><FiChevronRight size={20} /></button>
        </div>
      </div>
      
      <div className={styles.daysHeader}>
        {daysOfWeek.map(day => <span key={day}>{day}</span>)}
      </div>
      
      <div className={styles.daysGrid} onMouseLeave={() => onHover(null)}>
        {days.map((item, i) => (
          <div 
            key={i} 
            className={getDayClasses(item)}
            onMouseEnter={() => onHover(item.date)}
          >
            {getRangeRibbon(item.date)}
            <button 
              className={styles.dateCellBtn}
              onClick={() => onClick(item.date)}
            >
              {item.date.getDate()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
