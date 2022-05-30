module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'space-cadet': '#273043',
        'cool-gray': '#9197AE',
        'mint-cream': '#EFF6EE',
        'imperial-red': '#F02D3A',
        'medium-candy-apple-red': '#DD0426',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
