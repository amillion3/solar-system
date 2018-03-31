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