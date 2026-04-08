# Wall Calendar Web App

A polished, interactive wall calendar web application inspired by a physical hanging calendar.  
This project was built as a **frontend assignment** using **React + Vite** with a focus on UI quality, responsiveness, and clean component structure.

## Features

- Premium **wall calendar aesthetic**
- Large **hero image** section inspired by a printed calendar
- **Month navigation** for previous and next months
- **Date range selection**
  - select start date
  - select end date
  - highlight dates in between
- Integrated **Notes & Goals** section
- **localStorage persistence** for notes and selected range
- **Responsive design** for desktop and mobile
- Smooth visual states for:
  - today
  - weekends
  - selected dates
  - selected range

## Tech Stack

- React
- Vite
- JavaScript
- CSS / CSS Modules
- localStorage

## Project Structure

```bash
src/
├── components/
│   ├── WallCalendar/
│   ├── HeroSection/
│   ├── NotesSection/
│   ├── CalendarGrid/
│   └── RangeSummary/
├── hooks/
│   ├── useCalendarLogic.js
│   └── useLocalStorage.js
├── App.jsx
├── main.jsx
└── index.css
```

## How to Run Locally

1. **Navigate to the project folder:**
   ```bash
   cd calender
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in Browser:**
   Click the local URL provided in your terminal (usually `http://localhost:5173/`).
