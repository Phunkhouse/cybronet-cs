import webpackScripts from './webpack-scripts'
import { getHeights } from './utilites'

import { animations } from './components/animations'
import { navigation } from './components/navigation'
import { contactForm } from './components/contact-form'

const homePage = document.getElementById('home')
const careerPage = document.getElementById('career-page')
const careersPage = document.getElementById('careers')

webpackScripts()

window.addEventListener('load', function () {
  navigation()

  // Set the year in the footer
  document.getElementById('getYear').innerHTML = new Date().getFullYear()

  if (homePage) {
    getHeights()
    animations()
    contactForm({ homePage })

    // Scroll to the contact form if the url has #contact
    if (location.hash === '#contact') {
      setTimeout(() => {
        document.getElementById(location.hash.substring(1)).scrollIntoView()
      }, 10)
    }
  }
  careerPage && contactForm({ homePage: false })
  careersPage && contactForm({ homePage: false })
})
