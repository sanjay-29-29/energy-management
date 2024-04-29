module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-gray': '#D3D3D3',
        'colombia' : '#EAF8FF',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};