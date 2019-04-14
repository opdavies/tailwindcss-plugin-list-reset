const _ = require('lodash')
const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const generatePluginCss = (options = {}) => {
  return postcss(
    tailwindcss({
      corePlugins: disableCorePlugins(),
      plugins: [plugin(options)]
    })
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
  .then(result => {
    return result.css
  })
};

const disableCorePlugins = () => {
  return _.mapValues(defaultConfig.variants, plugin => {
    return false
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the class', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .list-reset {
        list-style: none;
        padding: 0;
      }
    `)
  })
})

test('it generates the class with variants', () => {
  return generatePluginCss({ variants: ['hover', 'focus'] }).then(css => {
    expect(css).toMatchCss(`
      .list-reset {
        list-style: none;
        padding: 0;
      }
      .hover\\:list-reset:hover {
        list-style: none;
        padding: 0;
      }
      .focus\\:list-reset:focus {
        list-style: none;
        padding: 0;
      }
    `)
  })
})
