const blockTrigger = document.querySelector('.header__navigate');
const burgerMenu = document.querySelector('.header__burgermenu ');
const socialLinksMenu = document.querySelector('.social-links');
const asideMenu = document.querySelector('.aside-menu');
const cancelAsideMenu = document.querySelector('.aside-menu__cancel');
const blurFirstBlock = document.querySelector('.first-block');
const form = document.getElementById('form');

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


  for (const input of allInputs) {
    removeError(input)
    if (input.value == '') {
      input.style.border = 'transparent'
      console.log('Ошибка поля');
      createError(input, 'Поле не заполнено!')
      result = false
    }
  }
  return result
}

function sendingForm(e) {
  e.preventDefault();
  if (validation(this) == true) {
    alert('Форма проверена успешно и отправлена!')
  }
  const formData = new FormData(form)
  formData.append('message', document.querySelector('.contact-data__textarea').value)
  //Адрес, на который отправляется запрос, используется как моковый
  axios.post('https://httpbin.org/post', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

blockTrigger.addEventListener('click', activateMenu);
cancelAsideMenu.addEventListener('click', cancelMenu);
form.addEventListener('submit', sendingForm)