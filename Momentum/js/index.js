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
    time.textContent = currentTime.toUpperCase();
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















