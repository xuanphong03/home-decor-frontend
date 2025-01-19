/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      textColor: {
        primary: "#FFA800",
        secondary: "#323232",
      },
      backgroundColor: {
        primary: "#FFA800",
        secondary: "#323232",
      },
      borderColor: {
        primary: "#FFA800",
        secondary: "#323232",
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1300px",
      },
      colors: {
        primary: "#FFA800",
        secondary: "#323232",
      },
    },
  },
  plugins: [],
};
