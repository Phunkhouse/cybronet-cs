import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let getHeight = window.innerHeight

addEventListener('resize', () => {
  getHeight = window.innerHeight
})

export function examplesScroll() {
  function expamplesScrollBuilder({
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
      },
    })

    tl
      .to('.example--fresh-design', {
        y: firstY,
        stagger: 0.3,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
      .to('.example--slozite-systemy', {
        y: secondY,
        stagger: 0.3,
        ease: "power2.inOut",
        duration: duration,
        delay: delay,
      })
  }

  ScrollTrigger.normalizeScroll(true)
  const mediaQuery = gsap.matchMedia()

  mediaQuery.add('(min-width: 1500px)', () => {
    expamplesScrollBuilder({
      wrapperEnd: `${getHeight - 200}px`,
      firstY: -700,
      secondY: -650,
      duration: 2,
      delay: 0,
    })
  })

  mediaQuery.add('(min-width: 1151px) and (max-width: 1499px)', () => {
    expamplesScrollBuilder({
      wrapperEnd: `${getHeight}px`,
      firstY: -600,
      secondY: -580,
      duration: 1,
      delay: 0,
    })
  })

  mediaQuery.add('(min-width: 601px) and (max-width: 1150px)', () => {
    expamplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3)}px`,
      firstY: `${-getHeight + 60}px`,
      secondY: `${-getHeight + 100}px`,
      duration: 6,
      delay: 2,
    })
  })

  mediaQuery.add('(max-width: 600px)', () => {
    expamplesScrollBuilder({
      wrapperEnd: `${getHeight + (getHeight / 3)}px`,
      firstY: `${-getHeight + 20}px`,
      secondY: `${-getHeight + 40}px`,
      duration: 6,
      delay: 2,
    })
  })
}

