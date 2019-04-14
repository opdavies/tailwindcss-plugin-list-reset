module.exports = (variants) => {
  return function ({ addUtilities }) {
    addUtilities({
      '.list-reset': {
        listStyle: 'none',
        padding: 0
      }
    }, variants)
  }
}
