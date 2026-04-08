import React, { useEffect } from 'react';
import styles from './HeroSection.module.css';
import { getMonthName, getYear } from '../../utils/dateUtils';

// custom feature: theming!
const themes = [
  { img: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#0ea5e9" }, // Jan: Winter
  { img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#ec4899" }, // Feb: Valentine
  { img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#10b981" }, // Mar: Spring nature
  { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#8b5cf6" }, // Apr: Rain/Purple
  { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#f59e0b" }, // May: Summer peaks
  { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#06b6d4" }, // Jun: Sunflowers
  { img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#eab308" }, // Jul: Mountain Climber
  { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#3b82f6" }, // Aug: Rain/River duplicated
  { img: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#f97316" }, // Sep: Fall leaves
  { img: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#a855f7" }, // Oct: Halloween vibes
  { img: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#64748b" }, // Nov: Fall leaves duplicated
  { img: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", color: "#ef4444" }  // Dec: Winter duplicated
];

export function HeroSection({ date }) {
  // choosing the theme based on the current month index
  let monthIndex = date.getMonth();
  let currentTheme = themes[monthIndex];

  // updating the CSS root variable whenever the month changes
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', currentTheme.color);
  }, [monthIndex, currentTheme.color]);

  return (
    <div className={styles.calendarHero}>
      {/* make image fade nicely when switching */}
      <img 
        key={currentTheme.img} 
        src={currentTheme.img} 
        alt="Month Theme Background" 
        className={styles.heroImage} 
        style={{ animation: 'fadeIn 0.5s ease-in' }}
      />
      <div className={styles.heroOverlay}>
        <div className={styles.year}>{getYear(date)}</div>
        <div className={styles.month}>{getMonthName(date)}</div>
      </div>
    </div>
  );
}
