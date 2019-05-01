module.exports = (variants) => ({ addUtilities }) => {
  addUtilities({
    '.list-reset': {
      listStyle: 'none',
      padding: 0
    }
  }, variants)
}
