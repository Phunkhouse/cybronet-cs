export function callUsMenu() {
  const trigger = document.getElementById('call-us')
  const isAltLocale = document.documentElement.lang !== 'en'

  trigger.addEventListener('click', e => {
    e.preventDefault()

    if (trigger.classList.contains('active')) {
      trigger.classList.remove('active')
      trigger.parentElement.querySelector('.header__call-us-menu').remove()
      return
    }

    trigger.classList.toggle('active')

    trigger.parentElement.insertAdjacentHTML('beforeend', `
      <ul class='header__call-us-menu'>
        <li>
          <a class='header__call-us-menu-item' href='tel:+420776033332'>
            <div class='header__call-us-menu-item-left'>
              <img src='.${isAltLocale ? '.' : ''}/bundles/img/cz-locale.svg' />
              <div>Prague</div>
            </div>
            <div>+420 776033332</div>
          </a>
        </li>
        <li>
          <a class='header__call-us-menu-item' href='tel:+1(786)927-2440'>
            <div class='header__call-us-menu-item-left'>
              <img src='.${isAltLocale ? '.' : ''}/bundles/img/us-locale.svg' />
              <div>Ft Lauderdale, FL</div>
            </div>
            <div>+1 (786) 927-2440</div>
          </a>
        </li>
        <li>
          <a class='header__call-us-menu-item' href='tel:+1(310)482-1938'>
            <div class='header__call-us-menu-item-left'>
              <img src='.${isAltLocale ? '.' : ''}/bundles/img/us-locale.svg' />
              <div>Los Angeles</div>
            </div>
            <div>+1 (310) 482-1938</div>
          </a>
        </li>
        <li>
          <a class='header__call-us-menu-item' href='tel:+1(416)671-6910'>
            <div class='header__call-us-menu-item-left'>
              <img src='.${isAltLocale ? '.' : ''}/bundles/img/ca-locale.svg' />
              <div>Toronto</div>
            </div>
            <div>+1 (416) 671-6910</div>
          </a>
        </li>
      </ul>
    `)
  })
}
