import "./style.css";
import "./responsive.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const apiKey = "64b6900de1864cb18cce3b016b4b1a39";
const gameListContainer = document.getElementById("products");
const priceAndDiscountList = [
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: true },
  { price: 50.99, previousPrice: 51.99, discount: 2, dlc: false },
  { price: 19.5, previousPrice: 27.0, discount: 28, dlc: false },
  { price: 10.29, previousPrice: 18.99, discount: 46, dlc: false },
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: false },
  { price: 50.99, previousPrice: 51.99, discount: 2, dlc: true },
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: true },
  { price: 19.5, previousPrice: 27.0, discount: 28, dlc: true },
  { price: 10.29, previousPrice: 18.99, discount: 46, dlc: false },
  { price: 10.29, previousPrice: 18.99, discount: 46, dlc: false },
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: false },
  { price: 19.5, previousPrice: 27.0, discount: 28, dlc: false },
  { price: 10.29, previousPrice: 18.99, discount: 46, dlc: false },
  { price: 50.99, previousPrice: 51.99, discount: 2, dlc: false },
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: false },
  { price: 50.99, previousPrice: 51.99, discount: 2, dlc: false },
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: false },
  { price: 50.99, previousPrice: 51.99, discount: 2, dlc: false },
  { price: 50.64, previousPrice: 51.64, discount: 2, dlc: false },
  { price: 50.99, previousPrice: 51.99, discount: 2, dlc: true },
];
const carouselImages = [];
const carouselItems = [];
const slideContainer = document.querySelector(".slide-container");

document.querySelector("#products").innerHTML = `
  <div class='products-header'>
    <h1 class='header-title'>Trending</h1>
    <button class="cta-button">View All</button>
  </div>

`;

// for game data
async function fetchGames() {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
    const data = await response.json();

    const games = data.results;

    // console.log(games);

    // game-card building
    games.forEach((game, index) => {
      // console.log(game);
      const card = document.createElement("div");
      card.classList.add("game-card", "hidden");

      const price = priceAndDiscountList[index].price;
      const discount = priceAndDiscountList[index].discount;
      const previousPrice = priceAndDiscountList[index].previousPrice;
      const dlc = priceAndDiscountList[index].dlc;

      card.innerHTML = `  
        <div class="header" >
        <img src="${game.background_image}" alt="${game.name}">
        <div class="discount">
          <span>-${discount}%</span>
        </div>

        </div>
        <div class="game-info">
            <div class="title-tag">       
            ${dlc ? '<div class="dlc-tag">DLC</div>' : ""}
            <h2 class="game-title">${game.name}</h2>
            </div> 
      
          <p class="game-price">
          <span class="previous-price"> <s>$${previousPrice}</s> </span>  
          <span class="current-price">$${price}</span>

          </p>
        </div>

      `;

      observer.observe(card);
      gameListContainer.appendChild(card);
    });

    // for carousel materials
    for (let i = 16; i < 18; i++) {
      carouselImages.push(games[i].background_image);
      carouselItems.push(games[i]);
    }
    updateImage();
  } catch (error) {
    console.error(error);
  }
}

fetchGames();
console.log(carouselImages);
let currentImageIndex = 0;

function updateImage() {
  slideContainer.innerHTML = "";

  // for slide image
  const img = document.createElement("img");
  img.src = carouselImages[currentImageIndex];
  img.classList.add("slide-image");
  slideContainer.appendChild(img);

  // for slide info
  const info = document.createElement("div");
  info.classList.add("slide-info");
  slideContainer.appendChild(info);

  //in days tag
  const days = document.createElement("span");
  days.textContent = "In 15 days";
  days.classList.add("days-tag");
  info.appendChild(days);

  // for slide info text
  const infoText = document.createElement("p");
  infoText.textContent = carouselItems[currentImageIndex].name;
  infoText.classList.add("info-text");
  info.appendChild(infoText);

  const slidePrice = document.createElement("div");
  info.append(slidePrice);
  slidePrice.classList.add("slide-price");

  //for slide discount
  const discountText = document.createElement("p");
  discountText.textContent = "-10%";
  discountText.classList.add("discount-text");
  slidePrice.appendChild(discountText);

  //for slide price
  const priceText = document.createElement("p");
  priceText.textContent = "39.90$";
  priceText.classList.add("price-text");
  slidePrice.appendChild(priceText);

  currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
}

setInterval(updateImage, 10000);

// intersection observer for animation, for div that has hidden class

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      // entry.target.classList.remove("show");
      //removed for avoiding continous animation
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// nav unhovered opacity change

document.addEventListener("DOMContentLoaded", function () {
  const catElements = document.querySelectorAll("#nav-container .cat");
  const modal = document.getElementById("modal");
  const close = document.getElementById("close-btn");

  // modal display and category opacity change for unclicked category
  catElements.forEach((cat) => {
    cat.addEventListener("click", function () {
      if (cat.style.opacity === "0.5") {
        catElements.forEach((otherCat) => {
          otherCat.style.opacity = "1";
        });
        if ((modal.style.display = "block")) {
          modal.style.display = "none";
        }
      } else {
        catElements.forEach((otherCat) => {
          if (otherCat !== cat) {
            otherCat.style.opacity = "0.5";
            if ((modal.style.display = "none")) {
              modal.style.display = "block";
              modal.classList.add("modal-animation");
            }
          }
        });
      }
    });
  });

  // close button
  // modal removal and category opacity restore
  close.addEventListener("click", function () {
    modal.style.display = "none";
    catElements.forEach((otherCat) => {
      otherCat.style.opacity = "1";
    });
    // alert("hi");
  });
});
