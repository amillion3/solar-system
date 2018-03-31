const hideAllPlanetCards = (e) => {  // Hide all mini-planet cards
  const getChildren = e.target.parentNode.parentNode.children;
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



//Need to verify this works still!!
const hideBigPlanetCard = () => {  // Hides the big planet card
  const bigPlanetCardToHide = document.getElementById("planet-full");
  bigPlanetCardToHide.classList.add("super-hide");
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
  console.log(e);
  //identify which planet clicked
};

const bigPlanetCardXClick = (e) => {
  showAllPlanetCards(e);
  hideBigPlanetCard(); //need to verify this works
}

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
  for (let i = 0; i < bigPlanetCards.length; i++) {
    bigPlanetCards[i].addEventListener('click', bigPlanetCardXClick)
  }
};

const printToDom = (domString,divId) => {
  document.getElementById(divId).innerHTML += domString;
};

const buildPlanetCards = (input) => {  //Mini-planet cards
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

const buildBigPlanetCard = (input) => {  //BIG planet cards
  let domOutput = "";
  for (let i = 0; i < input.length; i++) {
    domOutput += `
      <div class="close-full-icon">
        <img src="/images/redx.svg.png">
      </div>
      <div class="planet-full-info">
        <h1>${input[i].name}</h1>
        <img class="planet-full-main" src="${input[i].imageURL}">
        <!-- <img class="planet-full-comparison hide" src="${input[i].imageCompURL}">   on hover, show this  -->
        <div class="planet-full-description">
        <p>${input[i].description}</p> <!-- Bottom border -->
        <p class="center-text">Gas planet? ${input[i].isGasPlanet}</p>
        <p class="center-text">Number of moons: ${input[i].numberOfMoons}</p>
        <p class="center-text">Largest moon: ${input[i].nameOfLargestMoon}</p>
      </div>
    </div>`;
  }
  printToDom(domOutput,"planet-full");
  createEventListenerPlanetCardX();
};

function XHRfailure() {
  console.log("Whoopsies!");
}

function XHRsuccess() {
  const data = JSON.parse(this.responseText);
  buildPlanetCards(data.planets);
  buildBigPlanetCard(data.planets);
}

const startUpApplication = () => {
  const requestData = new XMLHttpRequest();
  requestData.addEventListener('load', XHRsuccess);
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};
startUpApplication();