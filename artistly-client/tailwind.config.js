/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: {max: "400px"},
        tablet: { max: "1280px" },
        laptop: "1280px",
      },
      container: {
        center: true,
        padding: {
          sm: "0.25rem",
          lg: "0.5rem",
          tablet: "0.5rem",
          laptop: "2rem",
          "2xl": "8rem",
        },
      },
    },
  },
  plugins: [],
};
