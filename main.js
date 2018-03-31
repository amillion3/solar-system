const planetCardsMouseEnter = (e) => {
  const showImage = e.target.childNodes[3].classList.remove("hide");
  const hideText = e.target.childNodes[1].classList.add("hide");
};

const planetCardsMouseLeave = (e) => {
  const hideImage = e.target.childNodes[3].classList.add("hide");
  const showText = e.target.childNodes[1].classList.remove("hide");
};

const createEventListenerMiniCards = () => {
  const miniPlanetCards = document.getElementsByClassName("planet-card");
  for (let i = 0; i < miniPlanetCards.length; i++) {
    miniPlanetCards[i].addEventListener('mouseenter', planetCardsMouseEnter);
    miniPlanetCards[i].addEventListener('mouseleave', planetCardsMouseLeave);
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