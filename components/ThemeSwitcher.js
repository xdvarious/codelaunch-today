"use client";

import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "retro" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm gap-2 normal-case font-mono text-xs border border-primary/30 hover:border-primary/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <svg
        className="w-4 h-4 fill-primary"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
      </svg>
      <span className="hidden sm:inline text-primary">{theme === "dark" ? "DARK" : "RETRO"}</span>
    </button>
  );
};

export default ThemeSwitcher;
