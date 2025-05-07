// components/Header.tsx
"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if the user has previously selected dark mode
    if (localStorage.getItem("theme") === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <header className="p-4 bg-white dark:bg-gray-800">
      <button
        onClick={toggleTheme}
        className="text-xl text-gray-800 dark:text-white"
      >
        {isDark ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
