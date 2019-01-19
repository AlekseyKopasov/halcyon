'use strict';

(function () {
  let menuElement = document.querySelector('.main-header__menu');
  let menuButtonElement = document.querySelector('.main-header__menu-button');
  let menuListElement = document.querySelector('.main-header__menu-list');
  let crossElement = document.querySelector('.main-header__menu-cross');
  let toggleNavStatus = false;

  if (menuElement) {
    let addClassesToMenu = () => {
      menuElement.classList.add('main-header__menu--open');
      menuButtonElement.classList.add('main-header__menu-button--open');
      menuListElement.classList.add('main-header__menu-list-show');
      crossElement.classList.add('main-header__menu-cross--onclick');
      toggleNavStatus = true;
    };

    let removeClassesFromMenu = () => {
      menuElement.classList.remove('main-header__menu--open');
      menuListElement.classList.remove('main-header__menu-list-show');
      menuButtonElement.classList.remove('main-header__menu-button--open');
      crossElement.classList.remove('main-header__menu-cross--onclick');
      toggleNavStatus = false;
    };

  window.main = {
    toggleNav: () => {
      if (toggleNavStatus === false) {
        addClassesToMenu();
      } else if (toggleNavStatus === true) {
        removeClassesFromMenu();
      }
    }
  }
}
})();
