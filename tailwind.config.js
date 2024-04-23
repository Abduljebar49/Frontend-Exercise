/** @type {import('tailwindcss').Config} */

const colors = {
  // Background
  netural: "#F1F5F9",
  "netural-light": "#EBEBEB",
  "netural-dark": "#ECEBED",

  // Button
  "button-primary": "#4C42D7",
  "button-primary-hover": "#393388",
  "button-success": "#B5E2C4",
  "button-success-hover": "#6DA172",
  "button-warning": "#CCD01C40",
  "button-warning-hover": "#CCD01C",
  "button-danger": "#C8415680",
  "button-danger-hover": "#C84156",

  "button-disabled": "#E1E1E1",

  // Text
  primary: "#3C3C3C",
  "primary-dark": "#182952",
  secondary: "#6B7280",
  "secondary-dark": "#D9D9D9",
  tertiary: "#9CA3AF",

  //
  blur: "#0069FF",
  success: "#B5E2C4",
  "success-light": "#DCFCE7",
  "success-dark": "#6DA172",
  warning: "#FEFCE8",
  "warning-dark": "#CA8A04",
  error: "#C8415680",
  "error-light": "#FFF1F2",
  "error-dark": "#C84156",
  info: "#DBEAFE",
  "info-dark": "#2563EB",

  divider: "#8E9CB24A",

  pending: "#FB923C",
  confirmed: "#4ADE80",
  denied: "#FB7185",

  border: "#D1D5DB",
};


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}

