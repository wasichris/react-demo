// 依據建置環境選擇對應變數定義檔
const env = process.env.NODE_ENV
const envConstant = require('./' + env + '.js').default
export default envConstant
