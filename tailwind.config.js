import { statColors } from './src/common/constants';
const safelist = [
  ...statColors.flatMap((c) => [`text-${c}-700`, `bg-${c}-600`]),
]
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist
}

