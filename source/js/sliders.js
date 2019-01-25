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

  const classActiveSliderGrout = 'slider-slides__group--active';
  const classActiveAdvantageGroup = 'advantage__group--active';
  const classActiveTeamsGroup = 'our-teams__group--active';
  const classActiveSliderButton = 'slide-btn--active';

  const backgroundSize = 'auto';

  const slider = {
    slides: slideElements,
    buttons: slideButtonElements,
    classActiveGroup: classActiveSliderGrout,
    classActiveButton: classActiveSliderButton
  };

  const advantage = {
    slides: advantageElements,
    buttons: advantageButtonElements,
    classActiveGroup: classActiveAdvantageGroup,
    classActiveButton: classActiveSliderButton
  };

  const teams = {
    slides: teamGroupelements,
    buttons: teamButtonElements,
    classActiveGroup: classActiveTeamsGroup,
    classActiveButton: classActiveSliderButton
  };

  let slide = (evt, slideObject) => {
    slideObject.slides.forEach((slide) => {
      slide.classList.remove(slideObject.classActiveGroup);
    });
    slideObject.buttons.forEach((button) => {
      button.classList.remove(slideObject.classActiveButton);
    });

    evt.target.classList.add(slideObject.classActiveButton);

    let value = evt.target.value;

    Array.from(slideObject.slides)[value].classList.add(slideObject.classActiveGroup);
  };

  let onSliderButtonClick = (evt) => {
    slide(evt, slider);

    let value = evt.target.value;
    sliderContainerElement.style.backgroundImage = 'url("../img/slider_phone-' + (parseInt(value, 10) + 1) + '.jpg")';
    sliderContainerElement.style.backgroundSize = backgroundSize;
  };

  let onSliderAdvantageButtonClick = (evt) => {
    slide(evt, advantage);
  };

  let onTeamButtonClick = (evt) => {
    slide(evt, teams);
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
