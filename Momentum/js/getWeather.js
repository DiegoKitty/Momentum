import {lang} from './index.js'

const city = document.querySelector(".city");
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

const setCityName = () => {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else if (localStorage.getItem("lang")) {
    city.value = lang.city;
  } else {
    city.value = "Minsk"
  }
}

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang.weather.lang}&appid=b25a46f3be30efc5d4073ed15168bb49&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const isResOk = res.ok;
    if (!res.ok) {
      alert (lang.weather.alert,"");
    } 
    temperature.textContent = isResOk ? `${Math.round(data.main.temp)}°C`: ''
    weatherDescription.textContent = isResOk ? data.weather[0].description : ''
    wind.textContent = isResOk ? `${lang.weather.wind} ${Math.round(data.wind.speed)} ${lang.weather.metre}`: ''
    humidity.textContent = isResOk ? `${lang.weather.humidity} ${data.main.humidity}%`: ''
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  }
  
  city.addEventListener('change', () => {
    localStorage.city = city.value;
    getWeather();
  })

export {getWeather, setCityName, city}