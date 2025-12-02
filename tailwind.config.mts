import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        'indian-khaki': {
          '50': '#FCFBF9',
          '100': '#F9F7F3',
          '200': '#F1EBE2',
          '300': '#E8DFD0',
          '400': '#D6C6AC',
          '500': '#C5AE89',
          '600': '#B19D7B',
          '700': '#766852',
          '800': '#594E3E',
          '900': '#3B3429'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        primaryForeground: 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        secondaryForeground: 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        mutedForeground: 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        accentForeground: 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        destructiveForeground: 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
      },

      fontFamily: {
        HandycheeraRegular: ['var(--font-handycheera-regular)', 'serif'],
        TangerineBold: ['var(--font-tangerine-bold)', 'cursive'],
        GaramondBold: ['var(--font-garamond-bold)', 'serif'],
        MeriendaRegular: ['var(--font-merienda-regular)', 'cursive'],
        ItaliannoRegular: ['var(--font-italianno-regular)', 'cursive'],
        PlaywriteCARegular: ['var(--font-playwriteCA-regular)', 'cursive'],
      },
      textShadow: {
        'custom-shadow': '2px 2px 2px rgb(0 0 0 / 0.8)',
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
  },
  plugins: [],
};

export default tailwindConfig;
