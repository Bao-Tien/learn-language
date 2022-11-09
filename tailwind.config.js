/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        'system-highlight': 'var(--text-system-highlight)',
        'system-base': '#32323d',
        'system-placeholder': '#757575',
        'system-caption-highlight': '#ffed00',
        'system-caption-through': 'hsla(0,0%,100%,0.5)',
        'system-caption': '#ffffff',
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
        'system-shaded': 'rgba(0,0,0,0.05)',
        'system-sidebar-lg': 'hsla(0,0%,100%,0.3)',
        'system-sidebar': '#fbd3d2',
        'system-header': '#f1ddd8',
        'system-videoItem': '#373131',
      },
      borderRadius: {
        'system-default': '0.5rem',
        'system-circle': '50%',
        'system-input': '1.5rem',
      },
      padding: {
        'system-section': '0 3.5rem',
      },
    },
  },
  plugins: [],
}
