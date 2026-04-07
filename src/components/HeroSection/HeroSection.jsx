import React from 'react';
import styles from './HeroSection.module.css';
import { getMonthName, getYear } from '../../utils/dateUtils';

const UnsplashImage = "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

export function HeroSection({ date }) {
  return (
    <div className={styles.calendarHero}>
      <img src={UnsplashImage} alt="Mountain Climber" className={styles.heroImage} />
      <div className={styles.heroOverlay}>
        <div className={styles.year}>{getYear(date)}</div>
        <div className={styles.month}>{getMonthName(date)}</div>
      </div>
    </div>
  );
}
