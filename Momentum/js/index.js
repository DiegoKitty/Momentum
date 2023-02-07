// Показывать содержимое страницы только тогда, когда она будет полностью готова к отображению

window.addEventListener('load', function () {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});

// Получение данных из local storage
// localStorage.clear();

function getLocalStorage() {
  if(localStorage.getItem(`name`)) {
    name.value = localStorage.getItem(`name`);
  }
}

window.addEventListener('load', getLocalStorage);

// Часы и календарь

const time = document.querySelector(".time");
const day = document.querySelector(".day");
const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};

const showDay = () => {
    const date = new Date();
    const currentDay = date.toLocaleDateString('en-US', options);
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

name.addEventListener('change', () => {
  localStorage.setItem(`name`, name.value);
})

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
    const bgNum = randomNum.toString().padStart(2, 0);
    const img = new Image();
    getRandomNum(1, 20);
    // img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greeting}/${bgNum}.jpg`;
    img.src = `https://github.com/DiegoKitty/Momentum/blob/background-image/images/${greeting}/${bgNum}.jpg?raw=true`;

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

// Погода 

const city = document.querySelector(".city");

if (localStorage.getItem('city')) {
  city.value = localStorage.getItem('city');
} else {
  city.value = "Minsk"
}

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=b25a46f3be30efc5d4073ed15168bb49&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (res.ok === false) {
    alert ("Вы ввели некорректное название города, попробуйте еще раз.","");
    temperature.textContent = `°C: неизвестно`;
    wind.textContent = `Ветер: неизвестно`;
    weatherDescription.textContent = "";
    humidity.textContent = `Влажность: неизвестно`
  } else {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  }
}

getWeather();

city.addEventListener('change', () => {
  localStorage.city = city.value;
  getWeather();
})

// Погода 

// Цитаты

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

let randomNumOfQuote = getRandomNum(0, 101);

async function getQuotes() {  
  const quotes = './json/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

  quote.textContent = `"${data[randomNumOfQuote].quote}"`;
  author.textContent = data[randomNumOfQuote].author;
}

getQuotes();

changeQuote.addEventListener("click", () => {
  randomNumOfQuote = getRandomNum(0, 101);
  getQuotes();
})

// Цитаты




 















