/* Dynamic Exporter:
 * Dynamically export all files (except self) in current folder
 */

// 排除 .effect.js 文件 (因為不是 model )
const req = require.context('.', false, /^((?!\.effect).)*\.js$/)

req.keys().forEach((key) => {
  const name = key.replace(/^\.\/(.*)\.js/, '$1')

  if (name !== 'index') {
    module.exports[name] = req(key).default
  }
})
