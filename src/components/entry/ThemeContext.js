import React, { createContext, useContext } from 'react';

const ThemeContext = createContext(false);

export function ThemeProvider({ children, darkMode }) {
  return (
    <ThemeContext.Provider value={darkMode}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}