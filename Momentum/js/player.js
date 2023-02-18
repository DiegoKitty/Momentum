import playList from "./playList.js";

const playListContainer = document.querySelector(".play-list");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const play = document.querySelector(".play");
const volumeBtn = document.querySelector(".volume-button");
const volumeSlider = document.querySelector(".volume-slider");
const audio = new Audio();
let playAudioNum = 0;
audio.src = playList[playAudioNum].src;

let isPlay = false;
let indexOfActiveAudio = null;
let playListArray;

const songName = document.querySelector(".song-name");
const songTime = document.querySelector(".song-time");
const authorName = document.querySelector(".author-name");
const timeline = document.querySelector(".timeline");

// Генерация списка из песен 

playList.forEach(el => {
  const li = document.createElement("li");
  li.textContent = el.title;
  li.classList.add("play-item");
  playListContainer.append(li);
})

const audioPlayList = document.querySelectorAll(".play-item");

audio.onloadedmetadata = function() {
  songName.textContent = playList[playAudioNum].title;
  authorName.textContent = playList[playAudioNum].author;
};

// Запуск песни 

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
  el.classList.add("pause");
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
const settings = document.querySelector(".settings");
const openList = document.querySelector(".dropdown-list");

openList.addEventListener("click", () => {
  if (!settings.classList.contains("settings-active")) {
    playListContainer.classList.toggle("open-list");
  }
})

volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("volume-button--mute");
  audio.muted = !audio.muted;
})

volumeBtn.addEventListener("mousemove", () => {
  volumeSlider.classList.add("volume-slider--active");
})

volumeBtn.addEventListener("mouseleave", () => {
  volumeSlider.classList.remove("volume-slider--active");
})

 // Обновление текущей секунды аудио

setInterval(() => {
  songTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

// Получить currentTime при клике на таймлайн

timeline.addEventListener("click", e => {
  const timelineWidth = getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
})

setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  songTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 100);


volumeSlider.addEventListener("click", (e) => {
  const sliderWidth = getComputedStyle(volumeSlider).width;
  let newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume > 1 ? 1 : newVolume >= 0? newVolume : 0 ;
})

// Автоматическое переключение аудио

audio.addEventListener("ended", () => {
  audioPlayList[getIndexOfActiveAudio()].classList.remove("pause");
  playAudioNum += 1;
  if(playAudioNum === playList.length) {
    playAudioNum = 0;
  }
  audioPlayList[playAudioNum].classList.add("pause");
  audio.src = playList[playAudioNum].src;
  playAudio();
})

