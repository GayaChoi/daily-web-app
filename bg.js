const body = document.querySelector("body");

const IMG_NUMBER = 22; // 이미지의 갯수

function paintImage(imgNumber) { // 이미지를 html 상에 표시 해주는 함수
    imgNumber = imgNumber + 1;
     
     body.classList.add("bgImage"); // body안에 이미지를 삽입 해주는 클래스 를 대입 
     body.background = "image" + "/" + imgNumber + ".jpg";
}

function genRandom() { // 이미지를 랜덤으로 돌려줌
    const number = Math.floor(Math.random() * IMG_NUMBER); // 0부터 IMG_NUMBER 보다 작은 값을 배출한다.(0~22 사이의 정수값)배출한뒤 반올림 
    
    return number; //이미지의 랜덤 값을 반환
}

function init() {
   const randomNumber = genRandom(); // 랜덤 함수를 호출
   paintImage(randomNumber); // 이미지를 표시하는 함수를 호출
}

init();