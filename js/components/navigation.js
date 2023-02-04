export function navigation() {
  let contentWidth = window.innerWidth
  const heroContainer = document.getElementById('hero')
  const mainContainer = document.querySelector('main')
  const body = document.querySelector('body')

  let previousScrollposition = window.scrollY

  window.onscroll = () => {
    let currentScrollPosition = window.scrollY

    if (previousScrollposition > currentScrollPosition || currentScrollPosition === 0) {
      document.querySelector('.js-header').classList.remove('js-hidden')
    } else {
      document.querySelector('.js-header').classList.add('js-hidden')
    }

    if (currentScrollPosition > 0) {
      document.querySelector('.js-header').classList.add('js-notOnTop')
    } else {
      document.querySelector('.js-header').classList.remove('js-notOnTop')
    }

    previousScrollposition = currentScrollPosition
  }

  function createMobileHeader() {
    heroContainer.insertAdjacentHTML('afterbegin', `
      <header class='header-mobile js-header'>
        <a href='/'>
          <svg class='header-mobile__logo' alt='Cybronet logo'>
            <use xlink:href='./bundles/img/sprite.svg#cybronet-logo'></use>
          </svg>
        </a>
        <button id='hamburger' class='header-mobile__hamburger'>
          <div class='header-mobile__hamburger-line'></div>
          <div class='header-mobile__hamburger-line'></div>
          <div class='header-mobile__hamburger-line'></div>
        </button>
      </header>
      <nav class='header-mobile__menu'>
        <ul class='header-mobile__menu-inner'>
          <li>
            <a href='#' class='btn'>
              Otevřené pozice
            </a>
          </li>
          <li>
            <a href='#' class='btn btn--primary'>
              Napiš nám
            </a>
          </li>
        </ul>
      </nav>
    `)

    const hamburgerBtn = document.getElementById('hamburger')
    const menu = document.querySelector('.header-mobile__menu')

    hamburgerBtn.addEventListener('click', () => {
      menu.classList.toggle('js-active')
      body.classList.toggle('js-isFixed')
      hamburgerBtn.classList.toggle('js-menuOpened')
    })
  }

  if (contentWidth < 750) {
    mainContainer.classList.add('js-isMobile')
    createMobileHeader()
  }

  addEventListener('resize', () => {
    contentWidth = window.innerWidth

    if (contentWidth <= 750 && !mainContainer.classList.contains('js-isMobile')) {
      mainContainer.classList.add('js-isMobile')
      createMobileHeader()
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
