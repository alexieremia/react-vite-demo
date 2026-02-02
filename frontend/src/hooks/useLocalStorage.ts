import { useState, useEffect } from "react";

/**
 * Hook to use localStorage.
 * @param key - The key to use for localStorage.
 * @param initialValue - The initial value to use for localStorage.
 * @returns An array containing the stored value and a function to set the stored value.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error("Failed to save to localStorage");
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
