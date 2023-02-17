import {en, ru} from './lang.js';
import {showDay, showTime} from './date.js';
import showGreeting from './showGreeting.js';
import {getWeather, setCityName, city} from './getWeather.js';
import getQuotes from './getQuotes.js';
import  './background.js';
import  './player.js';

let lang;

if(!localStorage.getItem(`lang`)) {
  lang = en;
} else {
  lang = JSON.parse(localStorage.getItem(`lang`));
}

export {lang}

showTime();
showGreeting ();
setCityName();
getWeather();
getQuotes();

const main = document.querySelector(".main");
const player = document.querySelector(".player");
const playerContainer = document.querySelector(".player-container");
const playListContainer = document.querySelector(".play-list");
const dropdownList = document.querySelector(".dropdown-list");
const weather = document.querySelector(".weather");
const greetingBlock = document.querySelector('.greeting-container');
const day = document.querySelector(".day");
const time = document.querySelector(".time");
const quotes = document.querySelector(".quotes");
const settings = document.querySelector(".settings");
const generalSetting = document.querySelector(".general-setting")
const imagesSetting = document.querySelector(".images-setting")
const settingGeneralContainer = document.querySelector(".setting-general-container");
const settingImagesContainer = document.querySelector(".setting-images-container");
const settingIcon = document.querySelector(".setting-icon");
const settingHeading = document.querySelectorAll(".set-text");
const enIcon = document.querySelector(".en-lang");
const ruIcon = document.querySelector(".ru-lang");
const setcheckbox = document.querySelectorAll(".checkbox");
const imageTag = document.querySelector(".image-tag");
const visibleBlock = [time, day, weather, greetingBlock, quotes, player];

imageTag.placeholder = lang.tag;

generalSetting.addEventListener("click", () => {
  imagesSetting.classList.remove("settings-name-active")
  settingGeneralContainer.classList.remove("container-unactive");
  settingImagesContainer.classList.add("container-unactive");
  generalSetting.classList.add("settings-name-active")
})

imagesSetting.addEventListener("click", () => {
  generalSetting.classList.remove("settings-name-active")
  settingImagesContainer.classList.remove("container-unactive");
  settingGeneralContainer.classList.add("container-unactive");
  imagesSetting.classList.add("settings-name-active")
})

// Смена языка

const changeLanguage = (language, town) => {
  const city = document.querySelector(".city");
  const name = document.querySelector(".name");
  if (!localStorage.getItem('city')) {
    city.value = town;
  }
  lang = language;
  localStorage.setItem("lang", JSON.stringify(lang));
  name.placeholder = lang.name;
  imageTag.placeholder = lang.tag;
  getQuotes();
  getWeather();

  settingHeading.forEach((el, index) => {
    el.textContent = lang.setting[index];
  })
}

enIcon.addEventListener("click", () => {
  changeLanguage(en, "Minsk");
})

ruIcon.addEventListener("click", () => {
  changeLanguage(ru, "Минск");
})

settingHeading.forEach((el, index) => {
  el.textContent = lang.setting[index];
})

// Сохранение положения чекбокса

function saveCheckbox (name, checkbox) {
  let arrOfCheckbox = []
  checkbox.forEach(input => {
    arrOfCheckbox.push({ id: input.id, checked: input.checked });
  })
  localStorage.setItem(`${name}`, JSON.stringify(arrOfCheckbox));
}

setcheckbox.forEach((el, index) => {
  el.addEventListener("click", () => {
    saveCheckbox('arrOfHiddenCheckbox', setcheckbox);
    visibleBlock[index].classList.toggle("block-hidden");
  });
})

// Скрытие блоков

function showBlocks () {
  const arrOfCheckbox = JSON.parse(localStorage.getItem('arrOfHiddenCheckbox'));
  arrOfCheckbox.forEach(input => {
    document.getElementById(input.id).checked = input.checked;
  })

  setcheckbox.forEach ((input, index) => {
    if(input.checked) {
      visibleBlock[index].classList.add("block-hidden");
    }
  })
}

if (localStorage.getItem("arrOfHiddenCheckbox")) {
  showBlocks();
}

// Адаптив

settingIcon.addEventListener("click", () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (screenHeight < 910) {
    playerContainer.classList.toggle("active--hidden");
    dropdownList.classList.toggle("active--hidden");
  }

  if (screenWidth < 1020) {
    main.classList.toggle("active--hidden");
    quotes.classList.toggle("active--hidden");
  }

  settings.classList.toggle("settings-active");
  playListContainer.classList.remove("open-list");
})

// Показывать содержимое страницы только тогда, когда она будет полностью готова к отображению

window.addEventListener('load', function () {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});

