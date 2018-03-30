console.log('hello');

//buildPlanetCards
//calls makeXHURCall and hopefully gets the return
//from XHR success, store in a variable?
//if this works, same idea for the build

const buildPlanetCards = () => {
  let temp = makeXHRCall();
  console.log("TEMP",temp);
};


function XHRfailure() {
  console.log("Whoopsies!");
}
let output = "";

function XHRsuccess(input) {
  // return JSON.parse(this.responseText);
  console.log('xhr success start');
  console.log("THIS WOULD BE GREAT",input);
  //console.log(input[0]);
  output = input;
  //console.log(output[1]);

  //console.log("XHR success! ", data.planets);  // DELETE ME EVENTUALLY
}
function XHRsuccessABC(input) {
  // return JSON.parse(this.responseText);
  console.log('xhrABC success start');
  console.log("THIS WOULD BE SUPER DUPER GREAT",input);
  //console.log(input[0]);
  output = input;
  //console.log(output[1]);

  //console.log("XHR success! ", data.planets);  // DELETE ME EVENTUALLY
}
/*
xmlHttpRequest.onreadystatechange = function (event) {
  var xhr = event.target;

  if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("target").innerHTML = xhr.responseText
  }
};
*/

const makeXHRCall = (inputAction) => {
  const requestData = new XMLHttpRequest();
  let fragMiniPlanets = document.createDocumentFragment();
  let fragBigPlanets = document.createDocumentFragment();
  requestData.addEventListener('load', function(e) {
    // const output = JSON.parse(e.target.responseText);
    // XHRsuccess(output.planets);
    if (requestData.readyState === 4 && requestData.status === 200) {
      let output = JSON.parse(e.target.responseText);
      output = output.planets;
      for (let i = 0; i < output.length; i++) {
        let miniPlanetCards = document.createElement('div');
        let bigPlanetCards = document.createElement('div');
        miniPlanetCards.innerHTML =
                        `<h1>${output[i].name}</h1>
                        </div>`;
        bigPlanetCards.innerHTML =
                        `<h1>${output[i].name}</h1>
                        <p>${output[i].description}</p>
                        <p>${output[i].numberOfMoons}</p></div>
                        `;
        fragMiniPlanets.appendChild(miniPlanetCards);
        fragBigPlanets.appendChild(bigPlanetCards);
      }
      if (inputAction === 'miniPlanets') {
        console.log(fragMiniPlanets.cloneNode(true));
        console.log(fragBigPlanets);
      }
      // console.log(fragMiniPlanets);
      // console.log(fragBigPlanets);
      return [fragMiniPlanets, fragBigPlanets];
      //do something else here?
      //if elseif to determine which DOMstring function to print...?
      // return output.planets;
      // document.getElementById("target").innerHTML = xhr.responseText
    }
  });
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};

window.onload = function() {
  
}

const startUpApplication = () => {
  const data = makeXHRCall("miniPlanets");
};
startUpApplication();