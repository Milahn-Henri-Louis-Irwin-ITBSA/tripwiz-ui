import { useState, useEffect } from 'react';

// Custom hook for debouncing a value
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value after the specified delay
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout when the value or delay changes, or when the component unmounts
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);

  // Return the debounced value
  return debouncedValue;
};
