/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        info: colors.blue[500],
        success: colors.green[500],
        error: colors.red[500],
        warn: colors.yellow[500],
      },
    }
  },
  plugins: [],
}
