const cssMatcher = require('jest-matcher-css')
const plugin = require('./index')
const { generateUtilities } = require('tailwindcss-plugin-test-helpers')

expect.extend({
  toMatchCss: cssMatcher,
})

test('it generates the list reset class', () => {
  const output = `
    .list-reset {
      list-style: none;
      padding: 0
    }
  `

  generateUtilities(plugin).then(result => {
    expect(result.css).toMatchCss(output)
    expect(result.warnings().length).toBe(0)
  })
})

test('it generates the list reset class with variants', () => {
  const output = `
    .list-reset {
      list-style: none;
      padding: 0
    }
    .hover\\:list-reset:hover {
      list-style: none;
      padding: 0
    }
    .focus\\:list-reset:focus {
      list-style: none;
      padding: 0
    }
  `

  generateUtilities(plugin, { variants: ['hover', 'focus'] }).then(result => {
    expect(result.css).toMatchCss(output)
    expect(result.warnings().length).toBe(0)
  })
})
