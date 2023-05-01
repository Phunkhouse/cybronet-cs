import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let getHeight = window.innerHeight

addEventListener('resize', () => {
  getHeight = window.innerHeight
})

export function examplesScroll() {
  const wrapperEndPercentage = '+=230%'
  const wrapperExtender = 1500

  function breakpoint(breakpoint) {
    const varValue = getComputedStyle(document.documentElement).getPropertyValue(`--examples-breakpoint-${breakpoint}`)
    return varValue.substring(0, varValue.length - 2)
  }

  function examplesScrollBuilder({
    wrapperEnd,
    firstY,
    secondY,
    thirdY,
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
        end: wrapperEndPercentage,
        scrub: true,
      },
    })

    tl
      .to('.example--sportongo', {
        y: firstY,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
      .to('.example--vizit', {
        y: secondY,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
      .to('.example--daros', {
        y: thirdY,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
  }

  function examplesScrollMobile() {
    function mobileScrollBuilder({ name }) {
      gsap.from(`.example--${name} .example__content`, {
        scrollTrigger: {
          trigger: `.example--${name}`,
          start: 'top 70%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
      })

      gsap.from(`.example--${name} .example__img`, {
        scrollTrigger: {
          trigger: `.example--${name}`,
          start: 'top 20%',
        },
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
      })
    }

    mobileScrollBuilder({ name: 'sportongo' })
    mobileScrollBuilder({ name: 'vizit' })
    mobileScrollBuilder({ name: 'daros' })
    mobileScrollBuilder({ name: 'equi-team' })
  }

  const mediaQuery = gsap.matchMedia()

  mediaQuery.add(`(min-width: 2300px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight - 200 + wrapperExtender}px`,
      firstY: -getHeight,
      secondY: -getHeight,
      thirdY: -getHeight,
      duration: 200,
      delay: 20,
    })
  })

  mediaQuery.add(`(min-width: ${breakpoint('desktop-md')}px) and (max-width: 2299px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3) + wrapperExtender}px`,
      firstY: -getHeight,
      secondY: -getHeight,
      thirdY: -getHeight,
      duration: 200,
      delay: 20,
    })
  })

  mediaQuery.add(`(min-width: ${breakpoint('desktop-sm')}px) and (max-width: ${breakpoint('desktop-md') - 1}px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight + wrapperExtender}px`,
      firstY: -getHeight,
      secondY: -getHeight,
      thirdY: -getHeight,
      duration: 200,
      delay: 20,
    })
  })

  mediaQuery.add(`(min-width: ${breakpoint('mobile')}px) and (max-width: ${breakpoint('desktop-sm') - 1}px)`, () => {
    examplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3) + wrapperExtender}px`,
      firstY: -getHeight,
      secondY: -getHeight,
      thirdY: -getHeight,
      duration: 6,
      delay: 2,
    })
  })

  mediaQuery.add(`(max-width: ${breakpoint('mobile')}px)`, () => {
    examplesScrollMobile()
  })
}

