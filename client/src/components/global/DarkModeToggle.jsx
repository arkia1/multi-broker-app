import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const darkMode = !isDarkMode;
    setIsDarkMode(darkMode);
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center p-2 bg-gray-200 rounded-full dark:bg-gray-800 transition-all duration-300 w-16"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isDarkMode ? "transform translate-x-6 bg-yellow-500" : "bg-gray-500"
        }`}
      >
        {isDarkMode ? (
          <FaSun className="text-white" />
        ) : (
          <FaMoon className="text-white" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
