/**
 * Default dev server configuration.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBaseConfig = require('./base')
const chalk = require('chalk')
const webpack = require('webpack')

function showEnvironment () {
  var str = `
  ###########################
   ______   _______  __   __ 
  |      | |       ||  | |  |
  |  _    ||    ___||  |_|  |
  | | |   ||   |___ |       |
  | |_|   ||    ___||       |
  |       ||   |___  |     | 
  |______| |_______|  |___|  
                             
  ###########################
  `
  console.log(chalk.cyanBright.bold(str))
}

class WebpackDevConfig extends WebpackBaseConfig {
  constructor () {
    super()

    showEnvironment()

    this.config = {
      devtool: 'cheap-module-source-map',
      entry: [
        'babel-polyfill', // 需要加上這個才可以在 IE 使用 (還沒進入 index.js 就表示尚未 import polyfill ， 所以執行 react hot loader 就會噴錯)
        'react-hot-loader/patch',
        './index.js'
      ],
      output: {
        filename: 'output.[hash].bundle.js',
        publicPath: '/'
      },
      devServer: {
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000,
        overlay: {
          errors: true,
          warnings: false
        }
      },
      // 加入 default 的 plugins 設定
      plugins: this.defaultSettings.plugins.concat([
        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
        // HMR 更新時，會在瀏覽器上顯示異動的模組名稱，建議在開發階段使用。
        new webpack.NamedModulesPlugin()
      ])
    }
  }
}

module.exports = WebpackDevConfig
