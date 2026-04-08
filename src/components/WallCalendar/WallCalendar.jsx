import React from 'react';
import styles from './WallCalendar.module.css';

import { useCalendarLogic } from '../../hooks/useCalendarLogic';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateCalendarDates, getYear } from '../../utils/dateUtils';

import { HeroSection } from '../HeroSection/HeroSection';
import { NotesSection } from '../NotesSection/NotesSection';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { RangeSummary } from '../RangeSummary/RangeSummary';

export function WallCalendar() {
  // getting all the data from my custom hook
  const {
    currentDate, prevMonth, nextMonth, startDate, endDate, hoverDate, handleDateClick, handleDateHover, resetRange, isFlipping
  } = useCalendarLogic();

  // dynamic key so notes save per month
  let monthKey = `${getYear(currentDate)}-${currentDate.getMonth()}`;
  const [notes, setNotes] = useLocalStorage(`calendar-notes-${monthKey}`, "");

  // no need for useMemo here, it's fast enough!
  let calendarDays = generateCalendarDates(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className={styles.wallCalendar}>
      
      {/* this part is for the physical spiral bindings */}
      <div className={styles.hangingHook}></div>
      <div className={styles.bindingContainer}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`ring-${i}`} className={styles.bindingRing} />
        ))}
      </div>

      <HeroSection date={currentDate} />

      <div className={`${styles.calendarBody} ${isFlipping ? styles.flipAnimation : ''}`}>
        {/* passing notes down */}
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

      {/* only show summary when user selects a range */}
      {startDate && (
        <RangeSummary startDate={startDate} endDate={endDate} onReset={resetRange} />
      )}
    </div>
  );
}
