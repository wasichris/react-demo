'use strict'
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const npmBase = path.join(__dirname, '../../node_modules')

class WebpackBaseConfig {
  constructor () {
    this._config = {}
  }
  get includedPackages () {
    return [].map(pkg => fs.realpathSync(path.join(npmBase, pkg)))
  }
  set config (data) {
    this._config = Object.assign({}, this.defaultSettings, data)
    return this._config
  }
  get config () {
    return this._config
  }
  get env () {
    return 'dev'
  }
  get srcPathAbsolute () {
    return path.resolve('./src')
  }
  get testPathAbsolute () {
    return path.resolve('./test')
  }
  get defaultSettings () {
    const cssModulesQuery = {
      modules: false,
      importLoaders: 1,
      localIdentName: '[name]-[local]-[hash:base64:5]'
    }

    return {
      context: this.srcPathAbsolute,
      devtool: 'eval',
      entry: './index.js',
      module: {
        // 因為 webpack 只看得懂 javascript 而已
        // 如果需要 import xxx.css 怎麼辦理
        // 所以 loader 就扮演很重要的角色來進行轉換
        rules: [
          {
            test: /\.(js|jsx)$/,
            include: [].concat(this.includedPackages, [this.srcPathAbsolute]),
            loaders: [{ loader: 'babel-loader' }]
          },
          {
            // 從最下 laoder 向上執行
            test: /\.(css|sass|scss)$/,
            loaders: [
              // adds CSS to the DOM by injecting <style>
              { loader: 'style-loader' },
              // import CSS
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              // loads a SASS/SCSS file and compiles it to CSS
              { loader: 'sass-loader' }
            ]
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
          }
        ]
      },
      output: {
        // 設樣設定要注意會因為 CWD (current working directory) 改變而改變
        // 基於目前呼叫位置的相對路徑，可能是A->B->C呼叫方式，所以C中使用path.resolve('./boo')相對路徑會是基於A的喔
        // path: path.resolve('./dist/assets')
        // -------------------------------------------------
        // 輸出資料夾位置 (絕對路徑)
        path: path.resolve(__dirname, '../../dist/assets'),
        // 輸出檔案名稱 (使用chunkhash避免快取問題)
        filename: '[name].[chunkhash].bundle.js',
        // 基於HTML頁面的相對路徑
        publicPath: 'assets/'
      },
      plugins: [
        new webpack.ProvidePlugin({
          // Automatically loads modules for bootstrap
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
        }),
        // 定義全域變數值
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify(this.env)
          }
        })],
      resolve: {
        alias: {
          // components: `${this.srcPathAbsolute}/components/`,
          // containers: `${this.srcPathAbsolute}/containers/`,
          static: `${this.srcPathAbsolute}/static/`,
          constant: `${this.srcPathAbsolute}/constant/`
        },
        // 在 require 時可以不用打副檔名
        extensions: [
          '.js',
          '.jsx'
        ],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      }
    }
  }
}
module.exports = WebpackBaseConfig
