/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-background': '#F9F9F9',
        'light-cyan': '#97E7E1',
        'light-blue': '#6AD4DD',
        'light-purple': '#7AA2E3',
      },
    },
  },
  plugins: [],
};
