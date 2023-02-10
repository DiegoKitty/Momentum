import playList from './playList.js';

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
    const currentTime = date.toLocaleTimeString('en-US');
    time.textContent = currentTime;
    showDay()
    setTimeout(showTime, 1000);
}

showTime();

// Часы и календарь ----------------------------------------------------------------


// Приветствие ---------------------------------------------------------------------

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

// Приветствие ---------------------------------------------------------------------


// Слайдер -------------------------------------------------------------------------

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

// Загружать рандомный фон при загрузке

const getRandomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setBg = () => {
  const greeting = showGreeting().toLowerCase();
  const bgNum = randomNum.toString().padStart(2, 0);
  const img = new Image();
  getRandomNum(1, 20);
  img.src = `https://github.com/DiegoKitty/Momentum/blob/background-image/images/${greeting}/${bgNum}.jpg?raw=true`;
  
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`
  }; 
}

let randomNum = getRandomNum(1, 20);
setBg();

// Менять фон при клике на слайдер ------------------------------------------------

const getSlideNext = () => {
  randomNum += 1;
  if (randomNum === 21) {
    randomNum = 1;
  }
  setBg();
}

const getSlidePrev = () => {
  randomNum -= 1;
  if (randomNum === 0) {
    randomNum = 20;
  }
  setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// Слайдер -----------------------------------------------------------------------

// Погода  -----------------------------------------------------------------------

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
    temperature.textContent = `°C: unknown`;
    wind.textContent = `Wind speed: unknown`;
    weatherDescription.textContent = "";
    humidity.textContent = `Humidity: unknown`
  } else {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  }
}

city.addEventListener('change', () => {
  localStorage.city = city.value;
  getWeather();
})

getWeather();

// Погода -----------------------------------------------------------------------

// Цитаты -----------------------------------------------------------------------

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

changeQuote.addEventListener("click", () => {
  randomNumOfQuote = getRandomNum(0, 101);
  getQuotes();
})

getQuotes();

// Цитаты -----------------------------------------------------------------------

// Аудиоплеер -------------------------------------------------------------------

const playListContainer = document.querySelector(".play-list");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const play = document.querySelector(".play");
const volumeBtn = document.querySelector(".volume-button");
const volumeSlider = document.querySelector(".volume-slider");
const volumeLine = document.querySelector(".volume-line");
const audio = new Audio();
let playAudioNum = 0;
audio.src = playList[playAudioNum].src;

let isPlay = false;
let indexOfActiveAudio = null;
let playListArray;

const songName = document.querySelector(".song-name");
const songTime = document.querySelector(".song-time");
const authorName = document.querySelector(".author-name");

// Генерация списка из песен ----------------------------------------------------

playList.forEach(el => {
  const li = document.createElement('li');
  li.textContent = el.title;
  li.classList.add("play-item")
  playListContainer.append(li);
})

const audioPlayList = document.querySelectorAll(".play-item");

audio.onloadedmetadata = function() {
  let volume = parseFloat((getComputedStyle(volumeLine).width))/ 10;
  songName.textContent = playList[playAudioNum].title;
  authorName.textContent = playList[playAudioNum].author;

  if(volumeSlider.classList.contains("volume-slider--active")) {
    volume /= 10;
  }
  audio.volume = volume;
};

// Запуск песни -----------------------------------------------------------------

function playAudio() {
  audioPlayList.forEach(audio => {
    audio.classList.remove("play-item--active");
  })
  
  audioPlayList[playAudioNum].classList.add("play-item--active");
  if(!isPlay) {
    audio.pause();
  } else {
    audio.play();
  }
}

// Получить индекс активного аудио

function getIndexOfActiveAudio () {
  playListArray = Array.from(audioPlayList).filter((el, index) => {
    if(el.classList.contains("play-item--active")) {
      indexOfActiveAudio = index;
    }
  })
  return indexOfActiveAudio;
}

// Кнопка включить/остановить проигрывание

play.addEventListener("click", () => {
  if (isPlay) {
    audioPlayList.forEach(el => {
      el.classList.remove("pause");
    })
  }

  if (getIndexOfActiveAudio() !== null && !isPlay) audioPlayList[getIndexOfActiveAudio()].classList.add("pause");
  else if (getIndexOfActiveAudio() && isPlay) audioPlayList[getIndexOfActiveAudio()].classList.remove("pause");
  else if (getIndexOfActiveAudio() === null) audioPlayList[0].classList.add("pause");

  play.classList.toggle("pause");
  isPlay = !isPlay;
  playAudio();
})

// Переключатель музыки вперед/назад

const playOtherAudio = () => {
  
  play.classList.add("pause");
  if(!isPlay) {
    isPlay = !isPlay;
  }
  audio.src = playList[playAudioNum].src;

  // Убрать иконку паузы у предыдущей песни, после добавить текущей

  if (getIndexOfActiveAudio() !== null) audioPlayList[getIndexOfActiveAudio()].classList.remove("pause"); 
  audioPlayList[playAudioNum].classList.add("pause");
  playAudio();
}

playNext.addEventListener("click", () => {
  playAudioNum += 1;
  if (playAudioNum === playList.length) {
    playAudioNum = 0;
  }
  playOtherAudio();
}) 

playPrev.addEventListener("click", () => {
  playAudioNum -= 1;
  if (playAudioNum === -1) {
    playAudioNum = playList.length -1;
  }
  playOtherAudio();
}) 

// Переключить песню при клике на трек из списка

const changeActiveAudio = (index) => {
  playAudioNum = index;
  audio.src = playList[playAudioNum].src;
  playAudio();
}

const addPauseIcon = (el) => {
  play.classList.add("pause");
  el.classList.add("pause")
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  return `${minutes}:${String(seconds % 60).padStart(2, 0)} / ${playList[playAudioNum].duration}`;
}

// Запуск песни при клике на элемент списка + смена иконки паузы

audioPlayList.forEach((el, index) => {
  el.addEventListener("click", () => {
    if(!el.classList.contains("play-item--active") && isPlay) {
      audioPlayList.forEach(el => {
        el.classList.remove("pause");
      })
      changeActiveAudio(index);
      play.classList.remove("pause");
      playAudio();

    } else if(!el.classList.contains("play-item--active")) {
      isPlay = !isPlay;
      changeActiveAudio(index);
      addPauseIcon(el);
      playAudio();

    } else if (el.classList.contains("play-item--active")) {
      isPlay = !isPlay;
      play.classList.remove("pause");
      el.classList.remove("pause");
      playAudio();
    }
    
    if (el.classList.contains("play-item--active") && isPlay) addPauseIcon(el);
  })
})


// Продвинутый плеер -------------------------------------------------------------

const openList = document.querySelector(".dropdown-list");

openList.addEventListener("click", () => {
  playListContainer.classList.toggle("open-list");
})

volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("volume-button--mute")
  audio.muted = !audio.muted;
})

volumeBtn.addEventListener("mousemove", () => {
  volumeSlider.classList.add("volume-slider--active")
})

volumeBtn.addEventListener("mouseleave", () => {
  volumeSlider.classList.remove("volume-slider--active")
})

 // Обновление текущей секунды аудио

setInterval(() => {
  songTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

// Получить currentTime при клике на таймлайн

const timeline = document.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
});

setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  songTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 100);


volumeSlider.addEventListener('click', (e) => {
  const sliderWidth = getComputedStyle(volumeSlider).width;
  let newVolume = e.offsetX / parseInt(sliderWidth);
  if (newVolume >= 0) {
    audio.volume = newVolume;
    volumeLine.style.width = newVolume * 100 + '%';
  }
  else {
    newVolume = 0;
    volumeLine.style.width = '1%';
  }
})

// Автоматическое переключение аудио

audio.addEventListener("ended", () => {
  audioPlayList[getIndexOfActiveAudio()].classList.remove("pause")
  playAudioNum += 1;
  if(playAudioNum === 4) {
    playAudioNum = 0;
  }
  audioPlayList[playAudioNum].classList.add("pause");
  audio.src = playList[playAudioNum].src
  playAudio();
});
















