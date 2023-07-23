const locales = ['cs', 'en']
const currentLocale = document.documentElement.lang

export function navigationLocales({ type }) {
  const wrapper = type === 'desktop' ? document.getElementById('locales') : document.getElementById('locales-mobile')

  locales.map(locale => {
    if (locale !== currentLocale) {
      if (locale !== 'cs') {
        wrapper.insertAdjacentHTML('beforeend', `
          <li>
            <a class='${type === 'desktop' ? 'header__navigation-locale-item' : 'header-mobile__navigation-locale-item'}' href='/${locale}/'>${locale}</a>
          </li>
        `)
      } else {
        wrapper.insertAdjacentHTML('beforeend', `
          <li>
            <a class='${type === 'desktop' ? 'header__navigation-locale-item' : 'header-mobile__navigation-locale-item'}' href='/'>${locale}</a>
          </li>
        `)
      }
    }
  })
}
