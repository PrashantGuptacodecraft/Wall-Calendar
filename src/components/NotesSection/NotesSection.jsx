import React from 'react';
import styles from './NotesSection.module.css';

export function NotesSection({ notes, onChange }) {
  return (
    <div className={styles.notesSection}>
      <div className={styles.notesHeader}>Notes & Goals</div>
      <textarea 
        className={styles.notesTextarea} 
        value={notes} 
        onChange={onChange}
        placeholder="Write down your tasks or goals for this month..."
      />
    </div>
  );
}
