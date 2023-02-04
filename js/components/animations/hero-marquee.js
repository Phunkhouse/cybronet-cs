import gsap from 'gsap'

export function heroMarquee() {
  function clean() {
    const marqueeInner = document.querySelector('.hero__marquee-inner')

    marqueeInner.innerHTML = ''
  }

  function renderHeroMarquee() {
    clean()

    //--- CONTROLS ---//
    const logosArr = ['google', 'slack', 'netflix']
    const marqueeItemGap = 22
    const marqueeItemWidth = 111
    const marqueeSpeed = 22
  
    //--- LOGIC ---//
    const requiredMarqueeItemWidth = marqueeItemWidth + marqueeItemGap
    const marqeeInitialWidth = (requiredMarqueeItemWidth * logosArr.length) - requiredMarqueeItemWidth
    const requiredArrClones = Math.ceil((window.innerWidth / marqeeInitialWidth))
    const requiredDuration = Math.floor(window.innerWidth / marqueeSpeed)

    let newLogosArray = []

    for (let i = 0; i < requiredArrClones; i++) {
      newLogosArray.push([...logosArr])
    }

    const requiredLogosArray = newLogosArray.flat()
    const marqueeRequiredWidth = (requiredMarqueeItemWidth * requiredLogosArray.length) - requiredMarqueeItemWidth

    const marqee = document.querySelector('.hero__marquee')
    const marqueeInner = document.querySelector('.hero__marquee-inner')
    const marqueeLogoContainer = 'hero__marquee-logo-container'

    requiredLogosArray.map(logo => {
      marqueeInner.insertAdjacentHTML('beforeend', `
        <div class='${marqueeLogoContainer}'>
          <div class='hero__marquee-logo-inner'>
            <svg class='hero__marquee-logo'>
              <use xlink:href='./bundles/img/sprite.svg#marq-${logo}'></use>
            </svg>
          </div>
        </div>
      `)
    })

    marqee.style.setProperty('--marquee-width', `${marqueeRequiredWidth}px`)
    marqee.style.setProperty('--marquee-item-width', `${requiredMarqueeItemWidth}px`)

    gsap.set(`.${marqueeLogoContainer}`, {
      x: (i) => i * requiredMarqueeItemWidth
    })

    gsap.to(`.${marqueeLogoContainer}`, {
      duration: requiredDuration,
      ease: 'none',
      x: `+=${marqueeRequiredWidth + requiredMarqueeItemWidth}`,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (marqueeRequiredWidth + requiredMarqueeItemWidth))
      },
      repeat: -1
    })
  }

  renderHeroMarquee()

  window.addEventListener('resize', () => {
    renderHeroMarquee()
  })
}
