import {lang} from "./index.js"

const day = document.querySelector(".day");
const options = {weekday: "long", month: "long", day: "numeric", timeZone: "UTC"};

const showDay = () => {
  const date = new Date();
  const currentDay = date.toLocaleDateString(`${lang.day}`, options);
  day.textContent = currentDay;
}

const showTime = () => {
  const time = document.querySelector(".time");
  const date = new Date();
  const currentTime = date.toLocaleTimeString(lang.time);
  time.textContent = currentTime;
  showDay();
  setTimeout(showTime, 1000);
}

export {showDay, showTime}