/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      "colors": {
       "nav": "#58afae",
       "Fonte": "#2d636b",
       "Animacao": "#004c57",
       "FonteBranca": "#ffffff",
       "navDark": "#444444",
       "btnNav": "#000000",
       "Pesquisa": "#3f3f3f",
       "iconMaisDark": "#bcbcbc",
       "DropDark": "#3d3d3d"
      },
      "borderRadius": {
       "none": "0",
       "xs": "0.125rem",
       "sm": "0.3125rem",
       "default": "0.5rem",
       "lg": "0.625rem",
       "xl": "1.25rem"
      }
     },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}