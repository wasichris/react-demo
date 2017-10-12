/* Dynamic Exporter:
 * Dynamically export all routes in current folder
 */
const req = require.context('.', true, /[A-Za-z0-9]\/index\.js$/)

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.js/, '$1')
  console.log(key) // 想要設計 資料夾名稱 + 檔案名稱相同 這樣比較好搜尋
  module.exports[componentName] = req(key).default
})
