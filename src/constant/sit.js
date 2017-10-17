import baseConstant from './dev'
let constant = baseConstant

// 僅調整與 dev 有差別的部分就好
constant = { ...constant, environment: 'sit' }
constant = { ...constant, apiUrl: '/api' }

export default constant
