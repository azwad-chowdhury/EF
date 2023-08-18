import "./style.css";
import "./responsive.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
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

    console.log(games);
    games.forEach((game, index) => {
      console.log(game);
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
  } catch (error) {
    console.error(error);
  }
}

fetchGames();

//
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
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
