import { useState } from 'react';

// custom hook to save data in local storage so it doesnt disappear on refresh
export function useLocalStorage(key, initialValue) {
  // state for storing value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get from local storage by key
      let item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return initialValue;
    } catch (error) {
      console.log("error reading local storage", error);
      return initialValue;
    }
  });

  // function to update the state and the localstorage at once
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("error setting local storage", error);
    }
  };

  return [storedValue, setValue];
}
