import { useState, useEffect } from "react";

/**
 * Theme hook for light/dark mode management
 * Respects OS preference on first load
 * Persists choice in localStorage
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Default to Dark Mode
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
};


