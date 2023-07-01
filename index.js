const blockTrigger = document.querySelector('.header__navigate');
const burgerMenu = document.querySelector('.header__burgermenu ');
const socialLinksMenu = document.querySelector('.social-links');
const asideMenu = document.querySelector('.aside-menu');
const cancelAsideMenu = document.querySelector('.aside-menu__cancel');
const blurFirstBlock = document.querySelector('.first-block');
const form = document.getElementById('form');
const labelName = document.getElementById('contact-data__name');
const labelMail = document.getElementById('contact-data__mail');
const validateEmail = document.getElementById('validateEmail');
const labelMessage = document.getElementById('contact-data__message');
const errorMessage = document.getElementById('contact-data__errormessage');
const dataInbox = document.querySelector('.contact-data__inbox');
const dataInboxEmail = document.querySelector('.email');

function activateMenu() {
  burgerMenu.classList.toggle('activate');
  socialLinksMenu.classList.toggle('hidden');
  asideMenu.classList.toggle('activate');
  blurFirstBlock.classList.toggle('bluring')
};

function cancelMenu() {
  burgerMenu.classList.remove('activate');
  socialLinksMenu.classList.remove('hidden');
  asideMenu.classList.remove('activate');
  blurFirstBlock.classList.remove('bluring')
}

function validation(form) {
  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove()
      parent.classList.remove('error')
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('label');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;
    parent.classList.add('error')
    parent.append(errorLabel)
  }

  let result = true;
  const allInputs = form.querySelectorAll('input');
  const message = document.querySelector('.contact-data__textarea');

  for (const input of allInputs) {
    function clearErrorField() {
      const labelError = document.querySelectorAll('.error-label');
      if (input.value !== '' || message.value !== '') {
        labelError.forEach(error => error.style.color = 'transparent')
        labelName.style.display = 'inline-block'
        labelMail.style.display = 'inline-block'
        labelMessage.style.display = "inline-block"
        message.style.border = "1px solid #000"
        message.style.marginTop = "0px"
        message.style.outline = "none"
        errorMessage.style.display = "none"
        dataInbox.classList.remove('error')
        dataInboxEmail.classList.remove('error')
        dataInbox.style.border = '1px solid #000'
        dataInboxEmail.style.border = '1px solid #000'
      }
    }

    message.addEventListener('input', clearErrorField)
    input.addEventListener('input', clearErrorField)
    removeError(input, message)
    if (input.value == '') {
      if(window.innerWidth < 576){
        message.style.marginLeft = '14px';
        errorMessage.style.marginLeft = '10px'
      }
      input.style.border = 'transparent'
      labelName.style.display = 'none'
      labelMail.style.display = 'none'
      message.style.outline = "4px solid red"
      message.style.outlineOffset = "-4px"
      message.style.marginTop = "20px"
      labelMessage.style.display = "none"
      errorMessage.style.display = "inline-block"
      createError(input, 'Поле не заполнено!')
      result = false
    } else {
      input.value = '';
      message.value = '';
      labelName.style.display = 'inline-block'
      labelMail.style.display = 'inline-block'
      labelMessage.style.display = "inline-block"
      message.style.border = "1px solid #000"
      message.style.marginTop = "0px"
      message.style.outline = "none"
      errorMessage.style.display = "none"
    }
  }
  return result
}

function sendingForm(e) {
  e.preventDefault();
  if (validation(this) == true) {
    const formData = new FormData(form)
    formData.append('message', document.querySelector('.contact-data__textarea').value)
    //Адрес, на который отправляется запрос, используется как моковый
    axios.post('https://httpbin.org/post', formData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    alert('Форма проверена успешно и отправлена!')
  }
}

blockTrigger.addEventListener('click', activateMenu);
cancelAsideMenu.addEventListener('click', cancelMenu);
form.addEventListener('submit', sendingForm)