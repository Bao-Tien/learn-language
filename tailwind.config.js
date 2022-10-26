/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        'system-highlight': '#ea7aa0',
        'system-base': '#32323d',
      },
      backgroundImage: {
        'system-theme-img':
          'url(https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/lisa.jpeg)',
      },
      backgroundColor: {},
      borderColor: {
        'system-border': '#CC3373',
      },
      backgroundColor: {
        'system-sidebar-item': 'rgba(0,0,0,0.05)',
        'system-sidebar-lg': 'hsla(0,0%,100%,0.3)',
        'system-sidebar': '#fbd3d2',
      },
      borderRadius: {
        'system-default': '0.5rem',
        'system-circle': '50%',
      },
    },
  },
  plugins: [],
}
