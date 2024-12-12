/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      xs: "480px", // Extra small devices (mobile, 480px and up)
      sm: "640px", // Small devices (landscape phones, 640px and up)
      md: "768px", // Medium devices (tablets, 768px and up)
      lg: "1024px", // Large devices (desktops, 1024px and up)
      xl: "1280px", // Extra large devices (large desktops, 1280px and up)
      "2xl": "1536px", // 2x extra large devices (larger desktops, 1536px and up)
      "3xl": "1920px", // 3x extra large devices (ultra-wide screens, 1920px and up)
      "max-sm": { max: "639px" }, // For devices smaller than 640px
      "max-md": { max: "767px" }, // For devices smaller than 768px
      "max-lg": { max: "1023px" }, // For devices smaller than 1024px
      "max-xl": { max: "1279px" }, // For devices smaller than 1280px
    },
  },
  plugins: [],
};
