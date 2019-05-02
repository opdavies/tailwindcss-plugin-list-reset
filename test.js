const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function generatePluginCss(options = {}) {
  return postcss(
    tailwindcss({
      corePlugins: false,
      plugins: [plugin(options)]
    })
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the list reset class', () => {
  const output = `
    .list-reset {
      list-style: none;
      padding: 0
    }
  `

  generatePluginCss().then(result => {
    expect(result.css).toMatchCss(output)
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

  generatePluginCss({ variants: ['hover', 'focus'] }).then(result => {
    expect(result.css).toMatchCss(output)
  })
})
