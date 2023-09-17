import { navigationLocales } from './navigation-locales'

export function navigation() {
  let contentWidth = window.innerWidth
  const heroContainer = document.getElementById('hero')
  const mainContainer = document.querySelector('main')
  const body = document.querySelector('body')

  let previousScrollposition = window.scrollY

  if (contentWidth >= 750) {
    window.onscroll = () => {
      const header = document.querySelector('.js-header')
      let currentScrollPosition = window.scrollY

      if (currentScrollPosition > 1) {
        if (previousScrollposition >= currentScrollPosition || currentScrollPosition === 0) {
          header.classList.remove('js-hidden')
        } else {
          header.classList.add('js-hidden')
        }

        if (currentScrollPosition > 1) {
          header.classList.add('js-notOnTop')
        } else {
          header.classList.remove('js-notOnTop')
        }
      } else {
        header.classList.remove(...header.classList)
        header.classList.add('header', 'js-header')
      }

      previousScrollposition = currentScrollPosition
    }
  }

  function createMobileHeader() {
    const isAltLocale = document.documentElement.lang !== 'en'

    heroContainer.insertAdjacentHTML('afterbegin', `
      <header class='header-mobile js-header'>
        <a href='/'>
          <svg class='header-mobile__logo' alt='Cybronet logo'>
            <use xlink:href='.${isAltLocale ? '.' : ''}/bundles/img/sprite.svg#cybronet-logo'></use>
          </svg>
        </a>
        <button id='hamburger' class='header-mobile__hamburger'>
          <div class='header-mobile__hamburger-line'></div>
          <div class='header-mobile__hamburger-line'></div>
          <div class='header-mobile__hamburger-line'></div>
        </button>
      </header>
      <nav class='header-mobile__menu'>
        <ul id='mobile-menu' class='header-mobile__menu-inner'>
          <li style='display: none'>
            <a href='/kariera.html' class='btn'>
              Otevřené pozice
            </a>
          </li>
          <li>
            <a href='/#contact' class='btn btn--primary'>
              Napiš nám
            </a>
          </li>
        </ul>
        <ul id='locales-mobile' class='header-mobile__menu-locales'>
        </ul>
      </nav>
    `)

    const hamburgerBtn = document.getElementById('hamburger')
    const menu = document.querySelector('.header-mobile__menu')
    const mobileMenuItems = Array.from(document.getElementById('mobile-menu').children)

    hamburgerBtn.addEventListener('click', () => {
      menu.classList.toggle('js-active')
      body.classList.toggle('js-isFixed')
      hamburgerBtn.classList.toggle('js-menuOpened')
    })

    mobileMenuItems.map(item => {
      const anchor = item.children[0]

      anchor.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('js-menuOpened')
        menu.classList.toggle('js-active')
        body.classList.toggle('js-isFixed')
      })
    })
  }

  if (contentWidth < 750) {
    mainContainer.classList.add('js-isMobile')
    createMobileHeader()
    navigationLocales({ type: 'mobile' })

    let timer = null
    const headerMobile = document.querySelector('.header-mobile')

    window.addEventListener('scroll', () => {
      if (window.scrollY <= 1) {
        headerMobile.classList.remove(...headerMobile.classList)
        headerMobile.classList.add('header-mobile', 'js-header')
      } else {
        if (!headerMobile.classList.contains('js-notOnTop')) {
          headerMobile.classList.add('js-notOnTop')
        }
      }

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        if (window.scrollY > previousScrollposition) {
          headerMobile.classList.add('js-hidden')
        } else {
          headerMobile.classList.remove('js-hidden')
        }
        previousScrollposition = window.scrollY
      }, 150)
    })


    setTimeout(() => {
      headerMobile.style.opacity = 1
      headerMobile.classList.remove(...headerMobile.classList)
      headerMobile.classList.add('header-mobile', 'js-header')
    }, 300)
  }

  addEventListener('resize', () => {
    contentWidth = window.innerWidth

    if (contentWidth <= 750 && !mainContainer.classList.contains('js-isMobile')) {
      mainContainer.classList.add('js-isMobile')
      createMobileHeader()
      navigationLocales({ type: 'mobile' })
    } else if (contentWidth > 750 && mainContainer.classList.contains('js-isMobile')) {
      mainContainer.classList.remove('js-isMobile')
      document.getElementById('hamburger').removeEventListener('click', () => {
        menu.classList.toggle('js-active')
      })
      document.querySelector('.header-mobile').remove()
      document.querySelector('.header-mobile__menu').remove()
    }
  })
}
