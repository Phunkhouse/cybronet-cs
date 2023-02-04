export function contactForm({ homePage }) {
  function renderButtons() {
    return `
      <div class='contact-form__options'>
        <h5 class='contact-form__options-title'>Mám zájem o:</h5>
        <div id='form-type-options' class='contact-form__options-buttons'>
          <button class='contact-form__options-button'>Webové aplikace</button>
          <button class='contact-form__options-button'>Konzultace</button>
          <button class='contact-form__options-button'>Školení</button>
          <button class='contact-form__options-button'>Internet of things</button>
          <button class='contact-form__options-button'>Mobilní aplikace</button>
          <button class='contact-form__options-button'>Web design</button>
          <button class='contact-form__options-button'>UX/UI design</button>
          <button class='contact-form__options-button'>Jiné</button>
        </div>
      </div>
      <div class='contact-form__options'>
        <h5 class='contact-form__options-title'>Očekávaný budget:</h5>
        <div id='form-budget-options' class='contact-form__options-buttons'>
          <button class='contact-form__options-button'>Méně než 50K</button>
          <button class='contact-form__options-button'>50K - 150K</button>
          <button class='contact-form__options-button'>150K - 500K</button>
          <button class='contact-form__options-button'>Více než 500k</button>
        </div>
      </div>
    `
  }

  function buildForm() {
    const wrapper = document.getElementById('contact-form-wrapper')

    wrapper.insertAdjacentHTML('beforeend', `
    <div class='contact-form'>
      ${homePage ? renderButtons() : ''}
      <form id='contact-form' action="https://formsubmit.co/krapka.david@icloud.com" method="POST" class='contact-form__form'>
        <div class='contact-form__inputs'>
          <div class='contact-form__input-container'>
            <input id='form-name' type='text' placeholder='Jméno' class='contact-form__input' />
          </div>
          <div class='contact-form__input-container'>
            <input id='form-email' type='email' placeholder='Váš email' class='contact-form__input' />
          </div>
          <div class='contact-form__input-container'>
            <input id='form-company' type='text' placeholder='Firma' class='contact-form__input' />
          </div>
          <div class='contact-form__input-container'>
            <textarea id='form-more' type='text' placeholder='Co vás vede k Cybronetu?' class='contact-form__textarea'></textarea>
          </div>
        </div>
        <div id='form-type' class='contact-form__hidden-input-area'></div>
        <div id='form-budget' class='contact-form__hidden-input-area'></div>
        <label class='contact-form__checkbox'>Souhlasím s podmínkami a se zpracováním osobních údajů
          <input id='form-checkbox' type='checkbox' class='contact-form__checkbox-hidden'></type>
          <span class='contact-form__checkbox-inner'></span>
        </label>
        <button type='submit' id='submit-btn' class='btn btn--primary contact-form__send-btn'>Odeslat</button>
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
        <input type='text' name='${type}' value='${content}' />
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
        <div class='contact-form__error'>Prosím, vyberte:</div>
      `)
      return false
    }
  }

  function formValidationInput(type) {
    const input = document.getElementById(`form-${type}`)
    const inputContainer = input.parentNode

    if (!input.value) {
      inputContainer.insertAdjacentHTML('beforeend', `
        <div class='contact-form__error'>Prosím, vyplňte:</div>
      `)
    }
  }

  function formValidationCheckbox() {
    const checkbox = document.getElementById('form-checkbox')
    const checkboxWrapper = checkbox.parentNode

    if (!checkbox.checked) {
      checkboxWrapper.insertAdjacentHTML('beforeend', `
        <div class='contact-form__error contact-form__error--checkbox'>Prosím, zaškrtněte:</div>
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

  buildForm()
  homePage && formOptions();
  submitControl()
}
