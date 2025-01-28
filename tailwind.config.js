/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inder", "ui-sans-serif"],
      serif: ['"DMSerifDisplay"', "ui-serif", "Georgia"],
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "secondary-surface": "rgb(var(--secondary-surface) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        "secondary-text": "rgb(var(--secondary-text) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-hover": "rgb(var(--secondary-hover) / <alpha-value>)",
        "secondary-active": "rgb(var(--secondary-active) / <alpha-value>)",
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        "on-secondary-hover": "rgb(var(--on-secondary-hover) / <alpha-value>)",
        "on-secondary-active":
          "rgb(var(--on-secondary-active) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
