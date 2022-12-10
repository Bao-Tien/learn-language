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
        'system-disable': '#d9dde8',
        'system-disable-light': '#d9dde8',
        'system-login': '#1876d3',
      },
      backgroundImage: {
        'system-theme-img':
          'url(https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/lisa.jpeg)',
        'system-login-img':
          'url(https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/cat.png)',
      },
      backgroundColor: {
        'system-shaded': 'rgba(0,0,0,0.05)',
        'system-shaded-alpha-40': 'rgba(0,0,0,0.4)',
        'system-sidebar-lg': 'hsla(0,0%,100%,0.3)',
        'system-sidebar': '#fbd3d2',
        'system-header': '#f1ddd8',
        'system-videoItem': '#373131',
        'system-card': 'var(--card-system-background)',
        'system-highlight': 'var(--text-system-highlight)',
        'system-login': '#f08517',
        'system-line': '#CC3373',
      },
      borderRadius: {
        'system-default': '0.5rem',
        'system-circle': '50%',
        'system-input': '1.5rem',
      },
      padding: {
        'system-section': '0 3.5rem',
      },
      boxShadow: {
        'system-card': '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
      },
      borderColor: {
        'system-bottom': 'transparent transparent var(--text-system-highlight)',
        'system-highlight': '#CC3373',
        'system-card': '#f6f7fb',
      },
    },
  },
  plugins: [],
}
