const createEventListenerSearchButton = () => {
  const button = document.getElementById("search-submit-button");
  button.addEventListener('click', getUserSearchText);
};

const getUserSearchText = (e) => {
  userInputRaw = e.target.parentNode.parentNode.childNodes[1].childNodes[2].nextElementSibling.value;
  e.target.parentNode.parentNode.childNodes[1].childNodes[2].nextElementSibling.value = "";  //resets input box to empty string
  processUserSearchText(userInputRaw);
};

const processUserSearchText = (input) => {
  input = input.replace(/[^A-Za-z\s]/g, "").toLowerCase();
  var inputArr = input.split(" ");
  sendXHRmini(inputArr);
};

// const hideAllPlanetCards = (e) => {  // Hide all mini-planet cards
//   const getChildren = document.getElementsByClassName("planet-card");
//   for (let i = 0; i < getChildren.length; i++) {
//     getChildren[i].remove();
//   }
// };
const hideAllPlanetCards = (e) => {  // Hide all mini-planet cards
  const getChildren = document.getElementsByClassName("planet-card");
  for (let i = 0; i < getChildren.length; i++) {
    getChildren[i].classList.add("hide");
  }
};

const showAllPlanetCards = (e) => {  // Show all mini-planet cards
  const planetCardsToShow = document.getElementsByClassName("planet-card");
  for (let i = 0; i < planetCardsToShow.length; i++) {
    planetCardsToShow[i].classList.remove("hide");
  }
};

const showBigPlanetCard = () => {  // Shows the big planet card
  const bigPlanetCardToShow = document.getElementById("planet-full");
  bigPlanetCardToShow.classList.remove("super-hide");
};

const hideBigPlanetCard = () => {  // Hides the big planet card
  const bigPlanetCardToHide = document.getElementById("planet-full");
  bigPlanetCardToHide.classList.add('super-hide');
};

const planetCardsMouseEnter = (e) => {  //Show image, hide text
  e.target.childNodes[3].classList.remove("hide");
  e.target.childNodes[1].classList.add("hide");
};

const planetCardsMouseLeave = (e) => {  //Hide image, show text
  e.target.childNodes[3].classList.add("hide");
  e.target.childNodes[1].classList.remove("hide");
};

const planetCardsClick = (e) => {  //Click on a mini-planet card
  hideAllPlanetCards(e);
  const planet = e.target.parentNode.childNodes[1].innerText;
  gatherPlanetName(planet);
};

const bigPlanetCardXClick = (e) => {
  sendXHR("default");
  hideBigPlanetCard();
};

const createEventListenerMiniCards = () => {
  const miniPlanetCards = document.getElementsByClassName("planet-card");
  for (let i = 0; i < miniPlanetCards.length; i++) {
    miniPlanetCards[i].addEventListener('mouseenter', planetCardsMouseEnter);
    miniPlanetCards[i].addEventListener('mouseleave', planetCardsMouseLeave);
    miniPlanetCards[i].addEventListener('click', planetCardsClick);
  }
};

const createEventListenerPlanetCardX = () => {
  const bigPlanetCards = document.getElementsByClassName("close-full-icon");
  bigPlanetCards[0].addEventListener('click', bigPlanetCardXClick);
};

const printToDom = (domString,divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildPlanetCards = (input) => {  //Mini-planet cards
  console.log("buildPlanetCards ", input);
  let domOutput = "";
  for (let i = 0; i < input.length; i++) {
    domOutput += `
              <div class="planet-card">
                <h1>${input[i].name}</h1>
                <img src="${input[i].imageURL}" class="hide">
              </div>`;
  }
  printToDom(domOutput,"planets-wrapper");
  createEventListenerMiniCards();
};

const gatherPlanetName = (input) => {
  sendXHR(input);
};

const buildBigPlanetCard = (input) => {  //BIG planet card
  let domOutput = "";
    domOutput += `
      <div class="close-full-icon">
        <img src="/images/redx.svg.png">
      </div>
      <div class="planet-full-info">
        <h1>${input.name}</h1>
        <img class="planet-full-main" src="${input.imageURL}">
        <!-- <img class="planet-full-comparison hide" src="${input.imageCompURL}">   on hover, show this  -->
        <div class="planet-full-description">
        <p>${input.description}</p> <!-- Bottom border -->
        <p class="center-text">Gas planet? ${input.isGasPlanet}</p>
        <p class="center-text">Number of moons: ${input.numberOfMoons}</p>
        <p class="center-text">Largest moon: ${input.nameOfLargestMoon}</p>
      </div>
    </div>`;
    showBigPlanetCard();
    printToDom(domOutput,"planet-full");
    createEventListenerPlanetCardX();
};

function XHRfailure() {
  console.log("Whoopsies!");
}

function XHRsuccessMini() {
  const data = JSON.parse(this.responseText);
  buildPlanetCards(data.planets);
}

function XHRsuccessBig() {
  const data = JSON.parse(this.responseText);
  buildBigPlanetCard(data.planets);
}

// will show ALL mini-planet cards,
//  or will show 0-8 cards, based on user input
const sendXHRmini = (input) => {
  const requestData = new XMLHttpRequest();
  if (typeof(input) !== "object") { //prints all mini-planet cards
    requestData.addEventListener('load', XHRsuccessMini);
  } else { //this is a SERACH request from the user
      requestData.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        let matchedCards = [];
        for (let i = 0; i < data.planets.length; i++) {
          if (data.planets[i].name.toLowerCase().includes(input[0]) ||
              data.planets[i].description.toLowerCase().includes(input[0])) {
            matchedCards.push(data.planets[i]);
          }
        }
        if (matchedCards.length > 0) {
          hideAllPlanetCards();
          buildPlanetCards(matchedCards);
          //TO DO:   ADD A RESET BUTTON
        }
      });
  }
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};

const sendXHR = (input) => {
  const requestData = new XMLHttpRequest();
  if (input === "default") {  // Always builds Mini-planet cards
    requestData.addEventListener('load', XHRsuccessMini);
  } else {  //Big planet card
    //call anonymous function to get JSON and then identify
    //  only the planet that was clicked and print it
    requestData.addEventListener('load', function() {
      const data = JSON.parse(this.responseText);
      for (let i = 0; i < data.planets.length; i++) {
        if (data.planets[i].name === input) {
          buildBigPlanetCard(data.planets[i]);
        }
      }
    });
  }
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};

const startUpApplication = () => {
  sendXHRmini("default"); //builds mini-planet cards
  createEventListenerSearchButton();
};
startUpApplication();