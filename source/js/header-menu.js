'use strict';

(function () {

  const menuElement = document.querySelector('.main-header__menu');
  const menuButtonElement = document.querySelector('.main-header__menu-button');
  const menuListElement = document.querySelector('.main-header__menu-list');
  const crossElement = document.querySelector('.main-header__menu-cross');
  let toggleNavStatus = false;

  if (menuElement) {
    menuElement.classList.remove('main-header__menu--active');
    menuListElement.classList.remove('main-header__menu-list-active');
    menuButtonElement.classList.remove('main-header__menu-button--active');
    crossElement.classList.remove('main-header__menu-cross--active');

    let addClassesToMenu = () => {
      menuElement.classList.add('main-header__menu--active');
      menuButtonElement.classList.add('main-header__menu-button--active');
      menuListElement.classList.add('main-header__menu-list-active');
      crossElement.classList.add('main-header__menu-cross--active');
      toggleNavStatus = true;
    };

    let removeClassesFromMenu = () => {
      menuElement.classList.remove('main-header__menu--active');
      menuListElement.classList.remove('main-header__menu-list-active');
      menuButtonElement.classList.remove('main-header__menu-button--active');
      crossElement.classList.remove('main-header__menu-cross--active');
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
