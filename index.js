const blockTrigger = document.querySelector('.header__navigate');
const burgerMenu = document.querySelector('.header__burgermenu ');
const socialLinksMenu = document.querySelector('.social-links');
const asideMenu = document.querySelector('.aside-menu');
const cancelAsideMenu = document.querySelector('.aside-menu__cancel');
const blurFirstBlock = document.querySelector('.first-block');

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

blockTrigger.addEventListener('click', activateMenu);
cancelAsideMenu.addEventListener('click', cancelMenu);