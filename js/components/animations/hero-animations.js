import gsap from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

export function heroAnimations() {
  const locale = document.documentElement.lang
  let heroTitleText

  if (locale === 'cs') {
    heroTitleText = 'Proměňte vaše vize ve skutečné projekty'
  } else {
    heroTitleText = 'Turn your visions into real projects'
  }

  gsap.registerPlugin(TextPlugin)
  const tl = gsap.timeline()

  tl.to('.hero__title-text', {
    text: {
      value: heroTitleText
    },
    duration: 2,
    ease: 'none',
  })

  tl.from('.hero__title-arrow', {
    opacity: 0,
    y: -30,
    x: -30,
    duration: .6,
    delay: .2,
  })

  tl.from('.hero__subtitle-item', {
    opacity: 0,
    y: 10,
    duration: .5,
    delay: -.4,
    stagger: .3,
  })
}
