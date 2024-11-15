"use client";

import { AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeSwitchButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="dark:bg-dark-lighter fixed bottom-6 right-6 z-50 rounded-full bg-gray-100 p-3 shadow-lg transition-transform hover:scale-110"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <Sun className="h-6 w-6 text-yellow-500" />
        ) : (
          <Moon className="h-6 w-6 text-blue-500" />
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeSwitchButton;
