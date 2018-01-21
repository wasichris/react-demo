import React, { Component } from 'react'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'
import { setupLocale } from 'setup'

export class PlayIntlUniversal extends Component {
  componentWillMount = () => {

  }

  changeLocale = (locale) => {
    this.props.setIsReady2Lanuch(false)
    setupLocale.initLocale(locale).then(() => {
      // After loading CLDR locale data, start to render from root
      this.props.setIsReady2Lanuch(true)
    })
  }

  handleUsClick = (e) => {
    this.changeLocale('en-US')
  }
  handleTwClick = (e) => {
    this.changeLocale('zh-TW')
  }

  render () {
    return <div className='container'>
      <h2>Internationalization (i18n)</h2>
      <hr />
      <div>
        <button className='btn btn-primary mr-2' onClick={this.handleTwClick}>繁</button>
        <button className='btn btn-primary' onClick={this.handleUsClick}>英</button>
      </div>

      <div className='mt-3'>
        <h5>{intl.get('EXAMPLE')}</h5>
        <ul>
          {/* 使用HTML樣式 */}
          <li>{intl.getHTML('USE_HTML')}</li>
          {/* 預設值 */}
          <li>{intl.get('TITLE').d('糟糕這個沒有定義到！')}</li>
          {/* 變數 */}
          <li>{intl.get('HELLO', { name: 'Tony', where: 'Taiwan' })}</li>
          {/* 單複數 */}
          <li>{intl.get('PHOTO', { num: 0 })}</li>
          <li>{intl.get('PHOTO', { num: 1 })}</li>
          <li>{intl.get('PHOTO', { num: 1000000 })}</li>
          {/* 日期 */}
          <li>{intl.get('SALE_START', { start: new Date() })}</li>
          <li>{intl.get('SALE_END', { end: new Date() })}</li>
          {/* 貨幣 */}
          <li>{intl.get('SALE_PRICE', { price: 123456.78 })}</li>
          {/* 支援巢狀結構 */}
          <li>{intl.get('COMMON.SUCCESS')}</li>
        </ul>
      </div>

    </div>
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  setIsReady2Lanuch: (isReady) => dispatch({ type: 'app/setIsReady2Lanuch', payload: isReady })
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayIntlUniversal)
