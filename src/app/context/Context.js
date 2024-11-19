'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const DarkModeContext = createContext();
const LoadingContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}> 
      {children}
    </DarkModeContext.Provider>
  );
}

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to use dark mode context
export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function useLoading() {
  return useContext(LoadingContext);
}