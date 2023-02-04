import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let getHeight = window.innerHeight

addEventListener('resize', () => {
  getHeight = window.innerHeight
})

export function examplesScroll() {
  const mediaQuery = gsap.matchMedia()

  mediaQuery.add('(min-width: 1500px)', () => {
    gsap.to('.examples', {
      scrollTrigger: {
        trigger: '.examples',
        start: 'top',
        end: () => `${getHeight - 200}px`,
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
        y: -700,
        stagger: 0.3,
        ease: "power2.inOut",
        duration: 2,
      })
      .to('.example--slozite-systemy', {
        y: -650,
        stagger: 0.3,
        ease: "power2.inOut",
        duration: 2,
      })
  })

  mediaQuery.add('(min-width: 1151px) and (max-width: 1499px)', () => {
    gsap.to('.examples', {
      scrollTrigger: {
        trigger: '.examples',
        start: 'top',
        end: () => `${getHeight}px`,
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
        y: -600,
        stagger: 0.3,
        ease: "power2.inOut",
        duration: 1,
      })
      .to('.example--slozite-systemy', {
        y: -580,
        stagger: 0.3,
        ease: "power2.inOut",
        duration: 1,
      })
  })

  mediaQuery.add('(min-width: 601px) and (max-width: 1150px)', () => {
    gsap.to('.examples', {
      scrollTrigger: {
        trigger: '.examples',
        start: 'top',
        end: () => `${getHeight + (getHeight / 3)}px`,
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
        y: () => `${-getHeight + 60}px`,
        ease: "power2.inOut",
        duration: 6,
        delay: 2,
      })
      .to('.example--slozite-systemy', {
        y: () => `${-getHeight + 100}px`,
        ease: "power2.inOut",
        duration: 6,
        delay: 2,
      })
  })

  mediaQuery.add('(max-width: 600px)', () => {
    gsap.to('.examples', {
      scrollTrigger: {
        trigger: '.examples',
        start: 'top',
        end: () => `${getHeight + (getHeight / 3)}px`,
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
        y: () => `${-getHeight + 60}px`,
        ease: "power2.inOut",
        duration: 6,
        delay: 2,
      })
      .to('.example--slozite-systemy', {
        y: () => `${-getHeight + 100}px`,
        ease: "power2.inOut",
        duration: 6,
        delay: 2,
      })
  })
}

