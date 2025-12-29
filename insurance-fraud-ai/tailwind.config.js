/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        fontFamily: {
          // names here must match what you use in @apply
          display: ["Space Grotesk", "sans-serif"],
          body: ["Inter", "sans-serif"],
        },
        colors: {
          accent: "#7c3aed",
          soft: "#94a3b8",
        },
      },
    },
    plugins: [],
  };
  