import React, { useMemo } from 'react';
import styles from './WallCalendar.module.css';

import { useCalendarLogic } from '../../hooks/useCalendarLogic';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateCalendarDates, getYear } from '../../utils/dateUtils';

import { HeroSection } from '../HeroSection/HeroSection';
import { NotesSection } from '../NotesSection/NotesSection';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { RangeSummary } from '../RangeSummary/RangeSummary';

export function WallCalendar() {
  const {
    currentDate, prevMonth, nextMonth, startDate, endDate, hoverDate, handleDateClick, handleDateHover, resetRange
  } = useCalendarLogic();

  const monthKey = `${getYear(currentDate)}-${currentDate.getMonth()}`;
  const [notes, setNotes] = useLocalStorage(`calendar-notes-${monthKey}`, "");

  const calendarDays = useMemo(() => {
    return generateCalendarDates(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  return (
    <div className={styles.wallCalendar}>
      
      {/* Physical Bindings */}
      <div className={styles.hangingHook}></div>
      <div className={styles.bindingContainer}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`ring-${i}`} className={styles.bindingRing} />
        ))}
      </div>

      <HeroSection date={currentDate} />

      <div className={styles.calendarBody}>
        <NotesSection notes={notes} onChange={(e) => setNotes(e.target.value)} />
        
        <CalendarGrid 
          date={currentDate}
          days={calendarDays}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          onClick={handleDateClick}
          onHover={handleDateHover}
          onPrev={prevMonth}
          onNext={nextMonth}
        />
      </div>

      {startDate && (
        <RangeSummary startDate={startDate} endDate={endDate} onReset={resetRange} />
      )}
    </div>
  );
}
