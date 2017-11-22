import intl from 'react-intl-universal'
import { find } from 'lodash'

// support locals for this app
const supportLocals = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: '繁體中文',
    value: 'zh-TW'
  }
]

// locale data
const locales = {
  'en-US': require('../locales/en-US.json'),
  'zh-TW': require('../locales/zh-TW.json')
}

// init and return promise, when it resolved
// remember to re-render view, ex. this.setState / this.forceUpdate() ....
const initLocale = (locale) => {
  // find current locale
  let currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang'
  })

  // force to use specific locale
  if (locale) {
    currentLocale = locale
  }

  // set default locale if not support
  if (!find(supportLocals, { value: currentLocale })) {
    currentLocale = 'en-US'
  }

  // initial react-intl-universal
  return intl.init({
    currentLocale,
    locales: {
      [currentLocale]: locales[currentLocale]
    }
  })
}

export default { supportLocals, initLocale }
