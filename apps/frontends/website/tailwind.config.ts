import typographyPlugin from '@tailwindcss/typography';
import containerQueriesPlugin from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#7C3AED',
          dark: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#5B21B6',
          light: '#5B21B6',
          dark: '#5B21B6',
        },
        accent: {
          DEFAULT: '#C084FC',
          light: '#C084FC',
          dark: '#C084FC',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#161436',
        },
        default: {
          light: '#1E1B4B',
          dark: '#FDFCFE',
        },
        muted: {
          light: 'rgba(30, 27, 75, 0.6)',
          dark: 'rgba(253, 252, 254, 0.6)',
        },
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--aw-font-mono, JetBrains Mono)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'heading-tight': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-sm': '0 10px 30px rgba(124, 58, 237, 0.3)',
        'glow-hover': '0 15px 40px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'fade': 'fadeInUp 0.6s both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'gradient': 'gradient 3s ease infinite',
        'scan': 'scanPulse 5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanPulse: {
          '0%, 100%': { top: '0%', opacity: '0.5' },
          '50%': { top: '100%', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(to right, var(--aw-color-primary), var(--aw-color-accent))',
      },
    },
  },
  plugins: [
    typographyPlugin,
    containerQueriesPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};

export default config;