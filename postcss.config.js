'use strict'

module.exports = (ctx) => ({
  map: true,
  plugins: {
    autoprefixer: { cascade: false },
    cssnano: { preset:'default' }
  }
})