const weather = document.querySelector(".js-weather");
const API_KEY = "50a5251236509a6a43e7a53ae4fce536";
const COORDS = "coords";

function getWeather(lat, lng) { // 위치정보를 받고 기상 정보를 api 를 통해 받아옴
    //console.log(lat, lng);
    
    // TODOBUG: fetch 부분 404 error 
    // # Mixed Content (혼합참조) 문제로 인한 버그 발생
    // # 해결 >>  http:// -> https:// 로 수정
    
    const ADDRESS = "https://api.openweathermap.org/data/2.5/weather?id=524901" + 
                     "&lat=" + lat + 
                     "&lon=" + lng + 
                     "&mode=JSON&units=metric&appId=" + API_KEY;

    //fech 객체를 통해 json 형태로 기상 정보를 받아옴 - 비동기(async) 식 제어
    fetch(ADDRESS).then(function(response) { // 응답을 받으면 json 으로 반환
      return response.json()    
    }).then(function(json) {    // 받는데 성공하면(state 200,브라우저의 network 탭 참고)
        const temperature = json.main.temp; // api 를 활용하여 온도를 불러옴
        const country = json.sys.country;  // api 를 활용하여 국가를 불러옴
        const place = json.name; // api 를 활용하여 지역을 불러옴
        const icon = json.weather[0].icon; // 기본적으로 제공하는 날씨 아이콘 불러옴

        weather.innerHTML = '<img class="imageSize" src="https://openweathermap.org/img/w/10d.png">' +
                                     
                             temperature + "°C" + " | " + country + " | " + place + " | ";

    });// JSON 데이터를 받아올 수 있음.
}

function saveCoords(coordsObj) { // 위치 정보를 local 에 저장하는 함수
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // javascript 객체를 문자열로 저장(객체로 저장할 필요X)
}

function handleGeoSuccess(position) { // 위치정보를 가져오는것 에 성공 할 경우
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude; // 경도
    const coordsObj = {
         latitude: latitude,
         longitude: longitude
    };

    saveCoords(coordsObj); // local 에 위치 정보를 저장하는 함수 호출 
    getWeather(latitude, longitude); // 기상 정보를 설정할 수있는 함수를 호출(위도,경도를 각각 전달)
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() { // javascript 객체안의 navaigator 를 이용하여 위치 정보를 불러오는 함수   
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() { // local 에 위도,경도 정보를 불러오거나 설정하는 함수
    const loadedCoords = localStorage.getItem(COORDS); // COORDS 정보를 local 에서 불러온뒤 초기화

    if (loadedCoords === null) { // 위도,경도 정보가 없다면 
        askForCoords(); // api 를 불러와 설정 할 수있는 함수 호출
    } 
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);

    }
}

function init() {
   loadCoords(); // local 안의 위도,경도 를 설정하는 함수
}

init();