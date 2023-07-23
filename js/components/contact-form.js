import { capitalize } from '../utilites'
import { contactFormContent } from './contact-form-locales'

export function contactForm({ homePage }) {
  const locale = document.documentElement.lang

  function renderButtons() {
    return `
      <div class='contact-form__options'>
        <h5 class='contact-form__options-title'>${contactFormContent[locale].interest.title}</h5>
        <div id='form-type-options' class='contact-form__options-buttons'>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[0]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[1]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[2]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[3]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[4]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[5]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[6]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].interest.options[7]}</button>
        </div>
      </div>
      <div class='contact-form__options'>
        <h5 class='contact-form__options-title'>${contactFormContent[locale].budget.title}</h5>
        <div id='form-budget-options' class='contact-form__options-buttons'>
          <button class='contact-form__options-button'>${contactFormContent[locale].budget.options[0]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].budget.options[1]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].budget.options[2]}</button>
          <button class='contact-form__options-button'>${contactFormContent[locale].budget.options[3]}</button>
        </div>
      </div>
    `
  }

  function buildForm() {
    const wrapper = document.getElementById('contact-form-wrapper')
    const domain = 'https://cybronet.com'
    const pathRaw = window.location.pathname
    const path = pathRaw.substring(0, pathRaw.length - 5)
    const url = domain + path

    wrapper.insertAdjacentHTML('beforeend', `
    <div class='contact-form'>
      ${homePage ? renderButtons() : ''}
      <form id='contact-form' action="https://formsubmit.co/mail@cybronet.com" method="POST" class='contact-form__form'>
        <div class='contact-form__inputs'>
          <div class='contact-form__input-container'>
            <input id='form-name' name='${contactFormContent[locale].name}' type='text' placeholder='${contactFormContent[locale].name}' class='contact-form__input' />
          </div>
          <div class='contact-form__input-container'>
            <input id='form-email' name='${contactFormContent[locale].email}' type='email' placeholder='${contactFormContent[locale].email}' class='contact-form__input' />
          </div>
          <div class='contact-form__input-container'>
            <input id='form-company' name='${contactFormContent[locale].company}' type='text' placeholder='${contactFormContent[locale].company}' class='contact-form__input' />
          </div>
          <div class='contact-form__input-container'>
            <textarea id='form-more' name='${contactFormContent[locale].more}' type='text' placeholder='${contactFormContent[locale].more}' class='contact-form__textarea'></textarea>
          </div>
          <input type='hidden' name='_next' value='${url}#thanks'>
        </div>
        <div id='form-type' class='contact-form__hidden-input-area'></div>
        <div id='form-budget' class='contact-form__hidden-input-area'></div>
        <label class='contact-form__checkbox'>${contactFormContent[locale].checkbox}
          <input id='form-checkbox' type='checkbox' class='contact-form__checkbox-hidden'></type>
          <span class='contact-form__checkbox-inner'></span>
        </label>
        <button type='submit' id='submit-btn' class='btn btn--primary contact-form__send-btn'>${contactFormContent[locale].send}</button>
      </form>
    </div>
  `)
  }

  function formOptions() {
    function highlightClickedButton(button, type) {
      const buttonsWrapper = document.getElementById(`form-${type}-options`)
      const buttons = Array.from(buttonsWrapper.children)

      buttons.map(button => {
        button.classList.contains('js-active') && button.classList.remove('js-active')
      })
      button.classList.add('js-active')
    }

    function createInputOnClick(e, type) {
      const inputWrapper = document.getElementById(`form-${type}`)
      const content = e.target.textContent
      inputWrapper.innerHTML = ''

      highlightClickedButton(e.target, type)

      inputWrapper.insertAdjacentHTML('beforeend', `
        <input type='text' name='${capitalize(type)}' value='${content}' />
      `)
    }

    function buttonsListener(type) {
      const buttonGroup = document.getElementById(`form-${type}-options`).querySelectorAll('.contact-form__options-button')

      buttonGroup.forEach(button => {
        button.addEventListener('click', e => createInputOnClick(e, type))
      })
    }

    buttonsListener('type')
    buttonsListener('budget')
  }

  function formValidationBtn(type) {
    const formOptions = document.getElementById(`form-${type}-options`)
    const buttons = Array.from(formOptions.children)
    let passed = false

    buttons.map(button => {
      if (button.classList.contains('js-active')) {
        passed = true
      }
    })

    if (passed) {
      return true
    } else {
      formOptions.insertAdjacentHTML('beforeend', `
        <div class='contact-form__error'>${contactFormContent[locale].choose}</div>
      `)
      return false
    }
  }

  function formValidationInput(type) {
    const input = document.getElementById(`form-${type}`)
    const inputContainer = input.parentNode

    if (!input.value) {
      inputContainer.insertAdjacentHTML('beforeend', `
        <div class='contact-form__error'>${contactFormContent[locale].fill}</div>
      `)
    }
  }

  function formValidationCheckbox() {
    const checkbox = document.getElementById('form-checkbox')
    const checkboxWrapper = checkbox.parentNode

    if (!checkbox.checked) {
      checkboxWrapper.insertAdjacentHTML('beforeend', `
        <div class='contact-form__error contact-form__error--checkbox'>${contactFormContent[locale].check}</div>
      `)
    }
  }

  function cleanValidation() {
    const errors = document.querySelectorAll('.contact-form__error')

    if (errors) {
      Array.from(errors).map(error => {
        error.remove()
      })
    }
  }

  function validationFinalCheck() {
    const form = document.getElementById('contact-form')
    const errors = document.querySelectorAll('.contact-form__error')

    if (Array.from(errors).length === 0) form.submit()
  }

  function submitControl() {
    const form = document.getElementById('contact-form')
    const submitBtn = document.getElementById('submit-btn')

    submitBtn.addEventListener('click', e => {
      e.preventDefault()
      cleanValidation()

      if (homePage) {
        formValidationBtn('type')
        formValidationBtn('budget')
      }

      formValidationInput('name')
      formValidationInput('email')
      formValidationInput('company')
      formValidationInput('more')
      formValidationCheckbox()

      validationFinalCheck()
    })
  }

  function detectSentForm() {
    if (window.location.hash === '#thanks') {
      const wrapper = document.querySelector('main')

      wrapper.insertAdjacentHTML('beforeend', `
        <div class='contact-form__sent'>${contactFormContent[locale].thanks}</div>
      `)
    }

    if (document.querySelector('.contact-form__sent')) {
      setInterval(() => {
        const sentMessage = document.querySelector('.contact-form__sent')
        sentMessage.remove()
      }, 3000)
    }
  }

  detectSentForm()
  buildForm()
  homePage && formOptions();
  submitControl()
}
