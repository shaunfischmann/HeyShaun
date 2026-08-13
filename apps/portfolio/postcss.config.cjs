// apps/portfolio/postcss.config.cjs
const path = require('path');

module.exports = {
  plugins: [
    require('@csstools/postcss-global-data')({
      files: [
        path.resolve(__dirname, '../../packages/design-tokens/breakpoints.css')
      ]
    }),
    require('postcss-custom-media')(),
    require('autoprefixer')
  ]
};