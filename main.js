function XHRfailure() {
  console.log("Whoopsies!");
}

function XHRsuccess() {
  const data = JSON.parse(this.responseText);
  // do something with data.planets;
}

const startUpApplication = () => {
  const requestData = new XMLHttpRequest();
  requestData.addEventListener('load', XHRsuccess);
  requestData.addEventListener('error', XHRfailure);
  requestData.open("GET", "/db/planets.json");
  requestData.send();
};
startUpApplication();