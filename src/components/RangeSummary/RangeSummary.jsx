import React from 'react';
import styles from './RangeSummary.module.css';

export function RangeSummary({ startDate, endDate, onReset }) {
  const getDaysCount = () => {
    if (!startDate || !endDate) return "Selecting...";
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} Days`;
  };

  const formatDate = (date) => {
    if (!date) return '...';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className={styles.rangeSummaryPanel}>
      <div className={styles.rangeInfo}>
        <strong>Selected Range</strong>
        <span>{formatDate(startDate)} &mdash; {formatDate(endDate)} ({getDaysCount()})</span>
      </div>
      <button className={styles.resetBtn} onClick={onReset}>Clear</button>
    </div>
  );
}
