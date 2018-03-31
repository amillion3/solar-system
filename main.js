const hideAllPlanetCards = (e) => {  // Hide all mini-planet cards
  const getChildren = e.target.parentNode.parentNode.children;
  for (let i = 0; i < getChildren.length; i++) {
    getChildren[i].classList.add("hide");
  }
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
  //call build Big planet card
};

const createEventListenerMiniCards = () => {
  const miniPlanetCards = document.getElementsByClassName("planet-card");
  for (let i = 0; i < miniPlanetCards.length; i++) {
    miniPlanetCards[i].addEventListener('mouseenter', planetCardsMouseEnter);
    miniPlanetCards[i].addEventListener('mouseleave', planetCardsMouseLeave);
    miniPlanetCards[i].addEventListener('click', planetCardsClick);
  }
};

const printToDom = (domString,divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildPlanetCards = (input) => {
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

function XHRfailure() {
  console.log("Whoopsies!");
}

function XHRsuccess() {
  const data = JSON.parse(this.responseText);
  buildPlanetCards(data.planets);
}

const startUpApplication = () => {
  const requestData = new XMLHttpRequest();
  requestData.addEventListener('load', XHRsuccess);
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};
startUpApplication();