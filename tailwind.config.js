/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./source/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        gyst: {
          primary: '#000',
          'primary-focus': '#1a1a1a',
          'primary-content': '#ffffff',

          secondary: '#fff',
          'secondary-focus': '#1a1a1a',
          'secondary-content': '#ff0000',

          accent: '#1a1a1a',
          'accent-focus': '#1a1a1a',
          'accent-content': '#ffffff',

          neutral: '#1a1a1a',
          'neutral-focus': '#1a1a1a',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',

          info: '#1c92f2',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',

          '--rounded-box': '0rem',
          '--rounded-btn': '0rem',
          '--rounded-badge': '0rem',

          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'lowercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
};
