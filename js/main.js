import webpackScripts from './webpack-scripts'

import { animations } from './components/animations'
import { navigation } from './components/navigation'
import { contactForm } from './components/contact-form'

const homePage = document.getElementById('home')
const careerPage = document.getElementById('career-page')

webpackScripts()

window.addEventListener('load', function () {
  navigation()

  if (homePage) {
    animations()
    contactForm({ homePage })
  }
  careerPage && contactForm({ homePage: false })
})
