export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bgPrimary: 'var(--color-bg-primary)',
        tBase: 'var(--color-text-base)',
        accent: 'var(--color-accent)',
      },
    },
  },
};
