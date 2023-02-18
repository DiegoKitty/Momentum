import {lang} from "./index.js"

const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
let randomNumOfQuote = getRandomNum(0, 53);


async function getQuotes() {  
  let quotesUrl = lang.quotesUrl;
  let quotes = quotesUrl;
  const res = await fetch(quotes);
  const data = await res.json(); 
  quote.textContent = `"${data[randomNumOfQuote].quote}"`;
  author.textContent = data[randomNumOfQuote].author;
}

changeQuote.addEventListener("click", () => {
  randomNumOfQuote = getRandomNum(0, 53);
  getQuotes();
})

export default getQuotes