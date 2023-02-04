import { gsap } from 'gsap'

export function carousel() {
  const width = 940
  const slides = gsap.utils.toArray('.recommendations__slide')

  const prevBtn = document.getElementById('car-prev')
  const nextBtn = document.getElementById('car-next')

  gsap.to(slides[0], {
    duration: 0,
    autoAlpha: 1,
  })

  function createPagination() {
    const pgContainer = document.querySelector('.recommendations__pagination')

    slides.forEach((el, index) => {
      pgContainer.insertAdjacentHTML('beforeEnd', `
        <div class='recommendations__dot'></div>
      `)

      if (index === 0) {
        document.querySelector('.recommendations__dot').classList.add('js-active')
      }
    })
  }

  createPagination()
  const paginationItems = gsap.utils.toArray('.recommendations__dot')

  nextBtn.addEventListener('click', () => {
    let nextSlide, nextDot
    prevBtn.classList.add('js-not-clickable')
    nextBtn.classList.add('js-not-clickable')

    slides.forEach((el, index) => {
      if (el.classList.contains('js-active')) {
        el.classList.remove('js-active')
        paginationItems[index].classList.remove('js-active')

        if (index === (slides.length - 1)) {
          nextSlide = slides[0]
          nextDot = paginationItems[0]
        } else {
          nextSlide = slides[index + 1]
          nextDot = paginationItems[index + 1]
        }

        const tl = gsap.timeline()
        tl.to(el, {
          duration: 0.3,
          autoAlpha: 0,
        })
        tl.to(nextSlide, {
          duration: 0.3,
          autoAlpha: 1,
          onComplete: () => {
            prevBtn.classList.remove('js-not-clickable')
            nextBtn.classList.remove('js-not-clickable')
          }
        })
      }
    })

    nextSlide.classList.add('js-active')
    nextDot.classList.add('js-active')
  })

  prevBtn.addEventListener('click', () => {
    let prevSlide, prevDot
    prevBtn.classList.add('js-not-clickable')
    nextBtn.classList.add('js-not-clickable')

    slides.forEach((el, index) => {
      if (el.classList.contains('js-active')) {
        el.classList.remove('js-active')
        paginationItems[index].classList.remove('js-active')

        if (index === 0) {
          prevSlide = slides[slides.length - 1]
          prevDot = paginationItems[slides.length - 1]
        } else {
          prevSlide = slides[index - 1]
          prevDot = paginationItems[index - 1]
        }

        const tl = gsap.timeline()
        tl.to(el, {
          duration: 0.3,
          autoAlpha: 0,
        })
        tl.to(prevSlide, {
          duration: 0.3,
          autoAlpha: 1,
          onComplete: () => {
            prevBtn.classList.remove('js-not-clickable')
            nextBtn.classList.remove('js-not-clickable')
          }
        })
      }
    })

    prevSlide.classList.add('js-active')
    prevDot.classList.add('js-active')
  })
}
