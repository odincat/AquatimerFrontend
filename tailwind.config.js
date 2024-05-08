/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: "0.7fr 0.3fr"
      }
    },
  },
  plugins: [],
}

