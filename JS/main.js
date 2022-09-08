"use strict";
import * as h_Functions from "./helper-functions.js";
// main Elements
const sections = [...h_Functions.getByDataAll("section")];
const sectionsLinks = [
  ...h_Functions.getById("section-links-container").children,
];
const navBar = h_Functions.getByData("nav-bar");
const burgerMenu = h_Functions.getById("burger-shape");

// toggle show menu
burgerMenu.onclick = () => {
  h_Functions.getById("section-links-container").classList.toggle("show");
};
burgerMenu.children[3].addEventListener("mouseenter", () => {
  sectionsLinks[0].parentElement.classList.add("show");
});
sectionsLinks.forEach((e) => {
  e.addEventListener("click", () => {
    h_Functions.activeThis(sectionsLinks, e, "active");
    e.parentElement.classList.remove("show");
  });
});

// active menu depend on which section you on
function activeMenu(arrayOfSections, linksToActive) {
  let position = window.scrollY;
  arrayOfSections.forEach((section) => {
    if (
      position >= section.offsetTop &&
      position < section.offsetTop + section.offsetHeight
    ) {
      let currentLink = h_Functions.getByData(`section-link=${section.id}`);
      if (currentLink.classList.contains("active")) return;
      h_Functions.activeThis(linksToActive, currentLink, "active");
    }
  });
}

// update quote on each one
let quotesArray = [];
let currentQuote = 0;
const quoteHolder = h_Functions.getByData("head-quote");
const copyTheQuote = h_Functions.getByData("copy-quote");
const nextQuoteBtn = h_Functions.getByData("next-quote");
nextQuoteBtn.onclick = nextQuote;
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
  if (currentQuote >= quotesArray.length - 1) {
    // prevent multiple clickes
    nextQuoteBtn.style.cursor = "wait";
    nextQuoteBtn.style.pointerEvents = "none";
    await getQuote();
    nextQuote();
    return;
  }
  // reduce amount of quotes you can store in the array
  if (quotesArray.length > 4) {
    currentQuote--;
    quotesArray.splice(0, 1);
  }
  quoteHolder.textContent = quotesArray[++currentQuote];
  nextQuoteBtn.style.pointerEvents = "all";
  nextQuoteBtn.style.cursor = "pointer";
}

function previousQuote() {
  if (currentQuote === 0) return;
  --currentQuote;
  quoteHolder.textContent = quotesArray[currentQuote];
}

// copy the current quote and make some
copyTheQuote.addEventListener("click", () => {
  let copyText = quoteHolder.textContent;
  navigator.clipboard.writeText(copyText);

  // some styling
  let spans = copyTheQuote.children;
  spans[0].classList.add("hide");
  spans[1].classList.remove("hide");
  copyTheQuote.style.setProperty("--main-color", "white");
  setTimeout(() => {
    copyTheQuote.style.removeProperty("--main-color");
    spans[0].classList.remove("hide");
    spans[1].classList.add("hide");
  }, 1000);
});

// shrink nav bar
function shrinkNav(element) {
  if (window.scrollY <= 10) {
    element.classList.add("shrink");
    return;
  }
  if (!element.classList.contains("shrink")) return;
  element.classList.remove("shrink");
}

// filter portfolio using catagory

const portfolioCatagories = h_Functions.getByDataAll("portfolio-filter");
portfolioCatagories.forEach((filter) => {
  filter.addEventListener("click", () => {
    h_Functions.activeThis(portfolioCatagories, filter, "active");
    filterPortfolio(filter);
  });
});
function filterPortfolio(current) {
  let works = h_Functions.getByData("my-works").children;
  [...works].forEach((item) => {
    if (item.classList.contains(current.dataset.portfolioFilter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
// all on scroll functions
window.addEventListener("scroll", () => {
  shrinkNav(navBar);
  activeMenu(sections, sectionsLinks);
});
