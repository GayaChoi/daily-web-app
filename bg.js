const body = document.querySelector("body");

const IMG_NUMBER = 22;

function paintImage(imgNumber) {
     //const image = new Image();
     body.classList.add("bgImage");
     body.background = `image/${imgNumber + 1}.jpg`;
     //image.src = `image/${imgNumber + 1}.jpg`;
     //image.classList.add("bgImage");
     //body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER); // 0부터 IMG_NUMBER 보다 작은 값을 배출한다. 
    
    return number;
}

function init() {
   const randomNumber = genRandom();
   paintImage(randomNumber); 
}

init();