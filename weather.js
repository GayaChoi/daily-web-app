const weather = document.querySelector(".js-weather");
const API_KEY = "50a5251236509a6a43e7a53ae4fce536";
const COORDS = "coords";

function getWeather(lat, lng) {
    //console.log(lat, lng);
    
    //TODOBUG: fetch 부분 404 error 
    //# Mixed Content (혼합참조) 문제로 인한 버그 발생

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=524901&lat=${lat}&lon=${lng}&mode=JSON&units=metric&appId=${API_KEY}`   
    ).then(function(response) {
      return response.json()    
    }).then(function(json) {
        const temperature = json.main.temp; // api 를 활용하여 온도를 불러옴
        const country = json.sys.country;
        const place = json.name; // api 를 활용하여 지역을 불러옴
        const icon = json.weather[0].icon;

        weather.innerHTML = '<img class="imageSize" src="https://openweathermap.org/img/w/10d.png">' +
                                     
                            `${temperature + "°C" + " | "} ${country + " | "} ${place + " | "}`;

    });// JSON 데이터를 받아올 수 있음.
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
         latitude: latitude,
         longitude: longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) { 
        askForCoords();
    } 
    
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);

    }
}

function init() {
   loadCoords();

}

init();