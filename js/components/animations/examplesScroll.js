import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let getHeight = window.innerHeight

addEventListener('resize', () => {
  getHeight = window.innerHeight
})

export function examplesScroll() {
  function breakpoint(breakpoint) {
    const varValue = getComputedStyle(document.documentElement).getPropertyValue(`--examples-breakpoint-${breakpoint}`)
    return varValue.substring(0, varValue.length - 2)
  }

  function examplesScrollBuilder({
    wrapperEnd,
    firstY,
    secondY,
    duration,
    delay
  }) {
    gsap.to('.examples', {
      scrollTrigger: {
        trigger: '.examples',
        start: 'top',
        end: () => wrapperEnd,
        pin: true,
        scrub: true,
      },
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.examples',
        start: 'top',
        end: 'bottom',
        scrub: true,
        snap: .5,
      },
    })

    tl
      .to('.example--fresh-design', {
        y: firstY,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
      .to('.example--slozite-systemy', {
        y: secondY,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
  }

  ScrollTrigger.normalizeScroll(true)
  const mediaQuery = gsap.matchMedia()

  mediaQuery.add(`(min-width: 2300px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight - 200}px`,
      firstY: -700,
      secondY: -650,
      duration: 2,
      delay: 0,
    })
  })

  mediaQuery.add(`(min-width: ${breakpoint('desktop-md')}px) and (max-width: 2299px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3)}px`,
      firstY: -650,
      secondY: -610,
      duration: 2,
      delay: 2,
    })
  })

  mediaQuery.add(`(min-width: ${breakpoint('desktop-sm')}px) and (max-width: ${breakpoint('desktop-md') - 1}px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight}px`,
      firstY: -590,
      secondY: -570,
      duration: 2,
      delay: 0,
    })
  })

  mediaQuery.add(`(min-width: ${breakpoint('mobile')}px) and (max-width: ${breakpoint('desktop-sm') - 1}px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3)}px`,
      firstY: `${-getHeight + 60}px`,
      secondY: `${-getHeight + 100}px`,
      duration: 6,
      delay: 2,
    })
  })

  mediaQuery.add(`(max-width: ${breakpoint('mobile')}px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3)}px`,
      firstY: `${-getHeight + 20}px`,
      secondY: `${-getHeight + 40}px`,
      duration: 6,
      delay: 2,
    })
  })
}

