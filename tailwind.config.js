/** @type {import('tailwindcss').Config} */
// Brand palette from the StadiumPlayer logo: Red #E01A22 · Charcoal #2D2D31 · Black #101010.
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#fff1f1', 100: '#ffdedf', 300: '#ff7176', 400: '#ff3b43', 500: '#e01a22', 600: '#b3141b', 700: '#8f1015' },
        ink: { 950: '#0b0b0c', 900: '#101010', 850: '#161618', 800: '#1c1c1f', 700: '#2d2d31', 600: '#3a3a40', border: '#3a3a40' },
        gold: '#fbbf24',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(224,26,34,0.25), 0 14px 50px -10px rgba(224,26,34,0.45)',
        card: '0 20px 50px -24px rgba(0,0,0,0.8)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        aurora: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(6%,-5%) scale(1.1)' } },
      },
      animation: { 'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both', aurora: 'aurora 20s ease-in-out infinite' },
    },
  },
  plugins: [],
}
