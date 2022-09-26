/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        'system-highlight': 'red',
      },
      backgroundImage: {
        'system-theme-img':
          'url(https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/lisa.jpeg)',
      },
      backgroundColor: {
        'system-sidebar-lg': 'hsla(0,0%,100%,0.3)',
        'system-sidebar': '#fbd3d2',
      },
    },
  },
  plugins: [],
}
