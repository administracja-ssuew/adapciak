/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  // 'hidden' jest przełączane przez JS (classList) — trzymamy je na pewno.
  safelist: ['hidden'],
  theme: {
    extend: {
      colors: {
        'primary':                  '#1B7A75',
        'primary-bright':           '#30BEB9',
        'primary-dark':             '#14605C',
        'accent':                   '#F2CB49',
        'accent-light':             '#8FD9CC',
        'orange':                   '#FF9657',
        'surface-border':           '#E5D5B5',
        'surface':                  '#FFFFFF',
        'surface-container-low':    '#FFF8ED',
        'on-surface':               '#1C1917',
        'surface-dim':              '#F5F0E8',
        'secondary':                '#78716C',
        'surface-container-lowest': '#FFF8ED',
        'surface-container':        '#FFF4E0',
        'surface-elevated':         '#FFFFFF',
        'surface-container-high':   '#FFE8C0',
        'surface-bright':           '#C2A882',
        'text-muted':               '#A8A29E',
        'background':               '#FFFBF0',
        'on-background':            '#1C1917',
      },
      borderRadius: {
        'DEFAULT': '0.5rem', 'lg': '0.75rem', 'xl': '1rem', '2xl': '1.25rem', 'full': '9999px'
      },
      spacing: {
        'margin-mobile': '16px', 'base': '8px',
        'margin-desktop': '64px', 'gutter': '24px', 'section-gap': '120px'
      },
      fontFamily: {
        'caption': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'], 'body-md': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'], 'label-bold': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'headline-lg': ['funkydori', 'Pacifico', 'cursive'], 'section-label': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'display-hero': ['funkydori', 'Pacifico', 'cursive'], 'body-lg': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'], 'headline-md': ['Baloo 2', 'Plus Jakarta Sans', 'sans-serif']
      },
      fontSize: {
        'caption':      ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'body-md':      ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-bold':   ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'headline-lg':  ['48px', { lineHeight: '1.18', fontWeight: '700' }],
        'section-label':['14px', { lineHeight: '20px', letterSpacing: '0.1em', fontWeight: '700' }],
        'display-hero': ['80px', { lineHeight: '1.2', fontWeight: '700' }],
        'body-lg':      ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-md':  ['32px', { lineHeight: '32px', fontWeight: '400' }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
