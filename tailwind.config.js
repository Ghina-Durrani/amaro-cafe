/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cream: '#F3E5CA',
        paper: '#FBF3E2',
        parchment: '#EAD8B7',
        terracotta: { DEFAULT: '#A94F35', dark: '#8A3820', deep: '#7C2D16' },
        caramel: '#C8874C',
        olive: '#78805B',
        espresso: '#633D2A',
        forest: { DEFAULT: '#323B22', deep: '#242B17' },
        ink: '#211B0A',
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
      },
      // Fluid type: scales smoothly from 320px phones to 4K screens
      fontSize: {
        hero: ['clamp(2.2rem, 10.4vw, 9.5rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.9rem, 1.1rem + 3.4vw, 3.6rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.45rem, 1.1rem + 1.6vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        card: ['clamp(1.2rem, 1.05rem + 0.6vw, 1.55rem)', { lineHeight: '1.2' }],
        lead: ['clamp(1rem, 0.94rem + 0.3vw, 1.15rem)', { lineHeight: '1.65' }],
        body: ['clamp(0.92rem, 0.89rem + 0.15vw, 1rem)', { lineHeight: '1.65' }],
        label: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.16em' }],
      },
      boxShadow: {
        press: '4px 4px 0 0 #633D2A',
        'press-sm': '3px 3px 0 0 #633D2A',
        'press-dark': '4px 4px 0 0 #211B0A',
        'press-dark-sm': '3px 3px 0 0 #211B0A',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-46px) scaleX(1.5)', opacity: '0' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
        shimmer: { to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        steam: 'steam 3.8s cubic-bezier(.4,0,.2,1) infinite',
        bob: 'bob 6s ease-in-out infinite',
        'spin-slow': 'spin 34s linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
