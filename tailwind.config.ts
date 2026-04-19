import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#ffd700',
        'light-gray': '#f5f5f5',
        'medium-gray': '#888888',
        'dark-gray': '#333333',
      },
      backgroundColor: {
        'primary-bg': '#000000',
        'secondary-bg': '#ffffff',
        'accent-bg': '#ffd700',
      },
    },
  },
  plugins: [],
}
export default config
