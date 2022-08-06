"use strict";
import * as h_Functions from "./helper-functions.js";
// main Elements
const sections = [...h_Functions.getByDataAll("section")];
const sectionsLinks = [
  ...h_Functions.getById("section-links-container").children,
];
const burgerMenu = h_Functions.getById("burger-shape");

// toggle show menu
burgerMenu.onclick = () => {
  h_Functions.getById("section-links-container").classList.toggle("show");
};
burgerMenu.children[3].addEventListener("mouseenter", () => {
  sectionsLinks[0].parentElement.classList.add("show");
});

// active menu depend on which section you on
function activeMenu() {
  let position = window.scrollY;
  sections.forEach((section) => {
    if (
      position >= section.offsetTop &&
      position < section.offsetTop + section.offsetHeight
    ) {
      sectionsLinks.forEach((link) => {
        link.classList.remove("active");
      });
      h_Functions
        .getByData(`section-link=${section.id}`)
        .classList.add("active");
    }
  });
}
activeMenu();
window.onscroll = activeMenu;

// update quote on each one
let quotesArray = [];
let currentQuote = 0;
const quoteHolder = h_Functions.getByData("head-quote");
const copyTheQuote = h_Functions.getByData("copy-quote");
h_Functions.getByData("next-quote").onclick = nextQuote;
h_Functions.getByData("previous-quote").onclick = previousQuote;

function getQuote() {
  return fetch("https://api.quotable.io/random?maxLength=40")
    .then((response) => {
      if (!response.ok)
        throw Error(
          `${response.statusText} \n Error Status ${response.status}`
        );
      return response.json();
    })
    .then((data) => {
      // remove quote end dote
      data.content = data.content.slice(0, -1);
      quotesArray.push(data.content);
    })
    .catch((error) => {
      console.error(error);
    });
}
async function nextQuote() {
  if (quotesArray[currentQuote] === undefined) {
    await getQuote();
    quoteHolder.textContent = quotesArray[currentQuote];
    currentQuote++;
    return;
  }
  currentQuote++;
  quoteHolder.textContent = quotesArray[currentQuote];
}

function previousQuote() {
  if (currentQuote === 0) return;
  --currentQuote;
  quoteHolder.textContent = quotesArray[currentQuote];
}

copyTheQuote.addEventListener("click", () => {
  console.log("clicked");
  let copyText = quoteHolder.textContent;
  navigator.clipboard.writeText(copyText);
  alert("copied" + copyText);
});
