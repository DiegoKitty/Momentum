// Часы и календарь

const time = document.querySelector(".time");
const day = document.querySelector(".day");
const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};

const showDay = () => {
    const date = new Date();
    const currentDay = date.toLocaleDateString('ru-RU', options);
    day.textContent = currentDay;
}

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDay()
    setTimeout(showTime, 1000);
}

showTime();

// Часы и календарь


// Приветствие

const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const greetings = {
    0: "Night",
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
}

const showGreeting = () => {
    const date = new Date();
    const hours = date.getHours();
    greeting.textContent = `Good ${greetings[Math.floor(hours / 6)]},`;
    setTimeout(showGreeting, 1000);
    return greetings[Math.floor(hours / 6)];
}

showGreeting ();

// Сохранение имени пользователя в local storage

function setLocalStorage () {
    localStorage.setItem('name', name.value);
  }

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }

window.addEventListener('load', getLocalStorage);

// Приветствие


// Слайдер

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

// Загружать рандомный фон при загрузке

const getRandomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20);

const setBg = () => {
    const greeting = showGreeting().toLowerCase();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    getRandomNum(1, 20);

    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${bgNum}.jpg`;

    img.onload = () => {      
        document.body.style.backgroundImage = `url(${img.src})`
      }; 
}

setBg();

// Менять фон при клике на слайдер

const getSlideNext = () => {
    randomNum += 1;
  if (randomNum === 21) {
    randomNum = 1;
  }
      setBg();
}

const getSlidePrev = () => {
    randomNum -= 1;
  if (randomNum === 1) {
    randomNum = 20;
  }
      setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// Слайдер
 















