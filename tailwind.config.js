/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-bg": "#f1faf5",
        "app-bg-muted": "#e3f2ec",
        "app-header": "#004d40",
        "app-accent": "#00c853",
        "app-body": "#2d3748",
      },
    },
  },
  plugins: [],
}
