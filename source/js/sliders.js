'use strict';

(function () {

  const sliderElement = document.querySelector('.slider');
  const slideElements = sliderElement.querySelectorAll('.slider-slides__group');
  const slideButtonElements = sliderElement.querySelectorAll('.slide-btn');
  const sliderContainerElement = sliderElement.querySelector('.slider-slides');

  const advantageSliderElement = document.querySelector('.advantage__slides');
  const advantageElements = advantageSliderElement.querySelectorAll('.advantage__group');
  const advantageButtonElements = advantageSliderElement.querySelectorAll('.advantage-controls-btn');

  const teamElement = document.querySelector('.our-teams');
  const teamGroupelements = teamElement.querySelectorAll('.our-teams__group');
  const teamButtonElements = teamElement.querySelectorAll('.our-teams-controls-btn');

  let checkClass = (evt, slides, buttons) => {
    slides.forEach((element) => {
      element.classList.remove('slider-slides__group--active');
    });
    buttons.forEach((element) => {
      element.classList.remove('slide-btn--active');
    });

    evt.target.classList.add('slide-btn--active');

    let value = evt.target.value;

    Array.from(slideElements)[value].classList.add('slider-slides__group--active');
    sliderContainerElement.style.backgroundImage = 'url("../img/slider_phone-' + (parseInt(value, 10) + 1) + '.jpg")';
    sliderContainerElement.style.backgroundSize = '100% 100%';
  };

  let checkAdvantage = (evt) => {
    if (advantageSliderElement) {
      advantageElements.forEach((element) => {
        element.classList.remove('advantage__group--active');
      });
      advantageButtonElements.forEach((element) => {
        element.classList.remove('slide-btn--active');
      });
      evt.target.classList.add('slide-btn--active');

      let value = evt.target.value;

      Array.from(advantageElements)[value].classList.add('advantage__group--active');
    }
  };

  let checkTeams = (evt) => {
    if (teamElement) {
      teamGroupelements.forEach((element) => {
        element.classList.remove('our-teams__group--active');
      });
      teamButtonElements.forEach((element) => {
        element.classList.remove('slide-btn--active');
      });
      evt.target.classList.add('slide-btn--active');

      let value = evt.target.value;

      Array.from(teamGroupelements)[value].classList.add('our-teams__group--active');
    }
  };

  let onSliderButtonClick = (evt) => {
    checkClass(evt, slideElements, slideButtonElements);
  };

  let onSliderAdvantageButtonClick = (evt) => {
    checkAdvantage(evt);
  };

  let onTeamButtonClick = (evt) => {
    checkTeams(evt);
  }
  window.slides = {
    check: slideButtonElements.forEach((element) => {
      element.addEventListener('click', onSliderButtonClick);
    }),
    checkAdvantage: advantageButtonElements.forEach((element) => {
      element.addEventListener('click', onSliderAdvantageButtonClick);
    }),
    checkTeams: teamButtonElements.forEach((element) => {
      element.addEventListener('click', onTeamButtonClick);
    })
  }
})();
