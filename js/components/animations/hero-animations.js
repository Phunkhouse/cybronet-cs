import gsap from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

export function heroAnimations() {
  gsap.registerPlugin(TextPlugin)
  const tl = gsap.timeline()

  tl.to('.hero__title-text', {
    text: {
      value: 'Turn your visions into real projects'
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
