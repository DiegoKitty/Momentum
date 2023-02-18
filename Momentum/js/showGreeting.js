import {lang} from "./index.js"

const name = document.querySelector(".name");
const greeting = document.querySelector(".greeting");
const greetings = {
    0: "Night",
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
  }

const showGreeting = () => {
  name.placeholder = lang.name;
  const date = new Date();
  const hours = date.getHours();
  greeting.textContent = `${lang.greetings[Math.floor(hours / 6)]},`;
  setTimeout(showGreeting, 1000);
  return greetings[Math.floor(hours / 6)];
}

name.addEventListener("change", () => {
  localStorage.setItem("name", name.value);
})

function getLocalStorage() {
  if(localStorage.getItem("name")) {
    const name = document.querySelector(".name");
    name.value = localStorage.getItem("name");
  }
}

window.addEventListener("load", getLocalStorage);

export default showGreeting