const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes(); 
    const hours = date.getHours();

    const textHours =  (hours < 10) ? "0" + hours : hours;
    const textMinutes = (minutes < 10) ? "0" + minutes : minutes;

    clockTitle.innerText = textHours + ":" + textMinutes;


                            // 10 보다 작다면 앞에 0을 표기 한다.
}

function init() {  
    getTime();                      // 현재 날짜,시간 (분,시간) 단위를 불러온다. 
    setInterval(getTime, 1000);     // (+-) 1초 간격으로 getTime 함수를 불러온다.
}

init();