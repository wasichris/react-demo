/* Dynamic Exporter:
 * Dynamically export all pages in current folder
 */
const req = require.context('.', true, /[A-Za-z0-9]\/index\.js$/)

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.js/, '$1')
  module.exports[componentName] = req(key).default
})
