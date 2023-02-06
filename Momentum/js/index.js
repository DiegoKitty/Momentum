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










