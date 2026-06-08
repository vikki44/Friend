import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        night: '#08040d',
        rose: '#f2c8d9',
        lavender: '#c9b8ff',
        mist: '#ede7ff',
      },
      boxShadow: {
        glass: '0 30px 80px rgba(8, 4, 13, 0.55)',
      },
      backgroundImage: {
        ambient: 'radial-gradient(circle at 20% 20%, rgba(242, 200, 217, 0.16), transparent 24%), radial-gradient(circle at 80% 15%, rgba(201, 184, 255, 0.16), transparent 22%), linear-gradient(180deg, rgba(8, 4, 13, 1) 0%, rgba(12, 8, 24, 1) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
