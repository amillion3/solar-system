const printToDom = (domString,divId) => {
  document.getElementById(divId).innerHTML = domString;
};

//--------------------Search box Functionality-----------------------------//
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
//------------------end Search box Functionality---------------------------//

//---------------Show or Hide mini or big planet card----------------------//
const hideAllPlanetCards = (e) => {  // Hide all mini-planet cards
  const getChildren = document.getElementsByClassName("planet-card");
  for (let i = 0; i < getChildren.length; i++) {
    getChildren[i].classList.add("hide");
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
//------------- end Show or Hide mini or big planet card-------------------//

//----------------------Event Listeners------------------------------------//
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
const createEventListenerSearchButton = () => {
  const button = document.getElementById("search-submit-button");
  button.addEventListener('click', getUserSearchText);
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
//------------------- end Event Listeners----------------------------------//

//---------------Build mini and big planet cards---------------------------//
const buildPlanetCards = (input) => {  //Mini-planet cards
  let domOutput = "";
  for (let i = 0; i < input.length; i++) {
    domOutput += `
              <div class="planet-card">
                <h1>${input[i].name}</h1>
                <img src="${input[i].imageURL}" class="hide">
              </div>`;  }
  printToDom(domOutput,"planets-wrapper");
  createEventListenerMiniCards();
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
//-------------end Build mini and big planet cards-------------------------//

//-----------------XHR Calls, success and failure--------------------------//
function XHRfailure() {
  console.log("Whoopsies!");
}
function XHRsuccessMini() {
  const data = JSON.parse(this.responseText);
  buildPlanetCards(data.planets);
}
// Displays ALL mini-planet cards,
//  or will show 0-8 mini-planet cards, based on user input
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
        } if (matchedCards.length > 0) {
            hideAllPlanetCards();
            buildPlanetCards(matchedCards);
        } else {
          alert('No matches found'); }
      });
  }
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};
const sendXHRBigPlanet = (input) => {
  const requestData = new XMLHttpRequest();
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
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};
//---------------end XHR Calls, success and failure------------------------//

//------------------------ Misc Functions----------------------------------//
const bigPlanetCardXClick = (e) => {
  sendXHRmini("default");
  hideBigPlanetCard();
};
const gatherPlanetName = (input) => {
  sendXHRBigPlanet(input);
};
const startUpApplication = () => {
  sendXHRmini("default"); //builds mini-planet cards
  createEventListenerSearchButton();
};
//---------------------- end Misc Functions--------------------------------//

startUpApplication();