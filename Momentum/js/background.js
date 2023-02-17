import {lang} from './index.js'

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const setcheckboxImage = document.querySelectorAll(".checkbox-image");
const gitHubCheckbox = document.getElementById("7");
const imageTag = document.querySelector(".image-tag");

const greetings = {
    0: "Night",
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
  }

const showGreeting = () => {
    const date = new Date();
    const hours = date.getHours();
    return greetings[Math.floor(hours / 6)];
  }

// Фон из GitGub

const getRandomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20);

const setBgFormGitHub = () => {
    let greeting = showGreeting().toLowerCase();
    const bgNum = randomNum.toString().padStart(2, 0);
    const img = new Image();
    getRandomNum(1, 20);
    img.src = `https://github.com/DiegoKitty/Momentum/blob/background-image/images/${greeting}/${bgNum}.jpg?raw=true`;
    img.onload = () => {      
      document.body.style.backgroundImage = `url(${img.src})`
    }; 
}

if (!localStorage.getItem("arrOfImageCheckbox")) {
    gitHubCheckbox.checked = true;
    setBgFormGitHub();
  }

// Фон из Unsplash

async function getBgFromUnsplash() {
  const greeting = imageTag.value ? imageTag.value : showGreeting().toLowerCase();
  const url = `https://api.unsplash.com/photos/random?query=${greeting}&client_id=7NzVZIHObJdTUnh304FuaJ5RlfUpUgq_HlqFrd9OjFU`;
  const res = await fetch(url);
  if(!res.ok) alert(lang.tagAlert, "")
  const data = await res.json();
  const img = new Image();
  
  img.src = `${data.urls.regular}`
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${data.urls.regular})`
  }; 
  localStorage.setItem("apiSrc", JSON.stringify(img.src));
}
  
// Фон из Flickr

async function getBgFromFlickr() {
  const greeting = imageTag.value ? imageTag.value : showGreeting().toLowerCase();
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=86957cc7622c95021b690c2ac91edef8&tags=${greeting}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  if(!data.photos.total) alert(lang.tagAlert, "");
  const arrLength = data.photos.photo.length - 1;
  const randomNum = getRandomNum(0, arrLength);
  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  localStorage.setItem("apiSrc", JSON.stringify(img.src));
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`
  }; 
}
  
// Сохранять положение чекбоксов

function saveCheckbox (name, checkbox) {
 let arrOfCheckbox = []
 checkbox.forEach(input => {
   arrOfCheckbox.push({ id: input.id, checked: input.checked });
 })
 localStorage.setItem(`${name}`, JSON.stringify(arrOfCheckbox));
}

// Поле для тэга

const showFieldTag = () => {
  const isGitHubChecked = document.getElementById(7).checked;
  if (!isGitHubChecked) {
    imageTag.classList.add("image-tag-active");
  } else {
    imageTag.classList.remove("image-tag-active");
  }
}

// Менять фон при выборе другого источника

setcheckboxImage.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    if(index === 1) getBgFromUnsplash();
    else if (index === 2) getBgFromFlickr();
    else {
      setBgFormGitHub();
    }

    setcheckboxImage.forEach(el => {
      el.checked = false;
      e.target.checked = true;
    })

    showFieldTag();
    saveCheckbox('arrOfImageCheckbox', setcheckboxImage);
  });
})

// Загружать положение чекбокса

if (localStorage.getItem("arrOfImageCheckbox")) {
  const arrOfCheckbox = JSON.parse(localStorage.getItem('arrOfImageCheckbox'));
  arrOfCheckbox.forEach(input => {
    document.getElementById(input.id).checked = input.checked;
  })
  showFieldTag();
}

// Менять фон при клике на слайдер

const changeBg = () => {
  const isGitHubChecked = document.getElementById("7").checked;
  const isUnsplashChecked = document.getElementById("8").checked;
  const isFlickerchecked = document.getElementById("9").checked;
  if(isUnsplashChecked) getBgFromUnsplash();
  else if (isFlickerchecked) getBgFromFlickr();
  return isGitHubChecked;
}

const getSlideNext = () => {
  if (changeBg()) {
    randomNum += 1;
  if (randomNum === 21) {
    randomNum = 1;
  }
  setBgFormGitHub();
  }
}

const getSlidePrev = () => {
  changeBg();
  if (changeBg()){
    randomNum -= 1;
  if (randomNum === 0) {
    randomNum = 20;
  }
  setBgFormGitHub();
  }
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// Установить последний фон при перезагрузке 

const setLastBg = () => {
  const isUnsplashchecked = document.getElementById(8).checked;
  const isFlickerchecked = document.getElementById(9).checked;

  if (isUnsplashchecked || isFlickerchecked) {
    const url = JSON.parse(localStorage.getItem('apiSrc'));
    document.body.style.backgroundImage = `url(${url})`
  } else {
    setBgFormGitHub();  // иначе установить фон из гитхаба
  }
}

setLastBg();
  
// Сохранить/ загрузить тэги поиска для API

imageTag.addEventListener("change", () => {
  const isUnsplashchecked = document.getElementById(8).checked;
  const isFlickerchecked = document.getElementById(9).checked;
  localStorage.setItem("imageTag", (imageTag.value));
  if(isUnsplashchecked) getBgFromUnsplash();
  else if (isFlickerchecked) getBgFromFlickr();
})

if (localStorage.getItem("imageTag")) {
  imageTag.value = localStorage.getItem("imageTag");
}


 

