import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function featuresScroll() {
  let getFeaturesHeight = document.querySelector('.about__features').offsetHeight
  let getPinHeight = getFeaturesHeight - 500
  let getScrollAmount = (getFeaturesHeight * -1)

  const mediaQuery = gsap.matchMedia()

  mediaQuery.add('(min-width: 750px)', () => {
    gsap.to('.about__wrapper', {
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top',
        end: `${getPinHeight}px`,
        pin: true,
        scrub: true,
        pinSpacing: false,
      },
    })

    gsap.to('.about__features', {
      scrollTrigger: {
        trigger: '.about__wrapper',
        start: 'top',
        end: 'bottom',
        scrub: true,
      },
      y: getScrollAmount,
    })
  })
}
