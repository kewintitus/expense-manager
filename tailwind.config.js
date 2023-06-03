/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // purge: ['./src/**/*.jsx', './src/**/*.js'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // typography: (theme) => ({}),
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  // plugins: [require('@tailwindcss/typography')],
};
