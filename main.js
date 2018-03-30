//buildPlanetCards
//calls makeXHURCall and hopefully gets the return
//from XHR success, store in a variable?
//if this works, same idea for the build

const buildPlanetCards = () => {
  let results = makeXHRCall();
  console.log(results);
};

function XHRfailure() {
  console.log("Whoopsies!");
}

function XHRsuccessMini() {
  const someData = JSON.parse(this.responseText);
  console.log("xhr success", someData.planets);
  return someData.planets;
}

const makeXHRCall = (actionType) => {
  const requestData = new XMLHttpRequest();
  
  if (actionType === "miniPlanets") {
    requestData.addEventListener('load', XHRsuccessMini);
  } else if (actionType === "bigPlanet") {
    requestData.addEventListener('load', XHRsuccessBig);
  }
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};

window.onload = function() {
  buildPlanetCards("miniPlanets");
  // buildBigPlanetCard("bigPlanet");
};

// const startUpApplication = () => {
//   const data = makeXHRCall();
// };
// startUpApplication();