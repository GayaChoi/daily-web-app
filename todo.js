const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

      /* TODO: Sort Variable */

      //upBtn = toDoList.querySelector(".js-ascendingBtn"), 
      //downBtn = toDoList.querySelector(".js-descendingBtn");
       
const TODOS_LS = "toDos";

let toDos = [];

//upBtn.innerHTML = "⬆️";
//downBtn.innerHTML = "⬇️";

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
           return toDo.id !== parseInt(li.id);       
    });
     
    toDos = cleanToDos; // 새로운 값으로 초기화

    saveToDos();
}

function saveToDos() { // list 의 내용을 local 에 저장
   localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // object 를 string 으로 변환(반대도 성립) , Javascript 의 객체를 문자열 형태로 반환
}

function paintToDo(text) { // 사용자가 입력한 list 를 차례대로 받는다.html 상에 list 정보를 기입한다.
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length + 1; // list 의 번호는 1부터 시작 된다.    
    const delBtn = document.createElement("div");
    
    delBtn.className = "button-setting"; 
    delBtn.innerHTML = "❌"; // vs code emoji 를 사용
     
    delBtn.addEventListener("click", deleteToDo); // 사용자가 삭제 버튼 을 클릭할 경우 삭제 관련 함수 실행

    li.appendChild(span);
    li.appendChild(delBtn);
    
    li.id = newId; // toDos 에 저장 되는 순서에 따라 list 의 번호가 지정됨.
    
    // TODO: callback 함수 개념 다시 이해 하기
    toDoList.appendChild(li); // TODO_BUG: Uncaught TypeError: Cannot read property ‘appendChild’ of null => callback 할 때 null 이 리턴
    
    const toDoObj = {
        text: text,       // list 의 내용
        id: newId         // list 의 번호
    };   
  
    toDos.push(toDoObj); // toDos 배열 안에 사용자의 list 를 넣어준다.      
    span.innerText = text; 
    
    saveToDos(); // local 안에 list 를 저장
}

function handleSubmit(event) { // 입력받은 list 를 확인 하는 함수
    const currentValue = toDoInput.value; // form 안의 input 에 있는 정보를 불러옴

    event.preventDefault(); // 이벤트 기능 을 억제한다.       
    paintToDo(currentValue); 
    toDoInput.value = "";
}

function loadToDos() { // local 에 저장되어 있는 toDos 를 불러온다.
    const loadedToDos = localStorage.getItem(TODOS_LS); 
    
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // 문자열을 자바스크립트 Object 형태로 만들어준다. 

        parsedToDos.forEach(function(toDo) {  
            paintToDo(toDo.text); // toDo 객체 안에 있는 것을 전달해준다.(toDo -> 사용자 가 입력한 list)
        }); // forEach
    } // if end    
} // loadToDos function

function init() {
    loadToDos(); // local 에 있는 toDos 를 불러오는 함수
    toDoForm.addEventListener("submit", handleSubmit); // 사용자가 form 에 내용을 전달하면 handleSubmit 함수 가 실행 
    //upBtn.addEventListener("click", ascendingSort);
    //downBtn.addEventListener("click", descendingSort);  
}

init();

/* TODO_BUG: Sort error 리스트가 밀리는 현상 */
/*function ascendingSort() {  // 오름차순 정렬
    toDos.sort(function (a, b) {
        if (a.text > b.text) {
            return 1;
        }
        if (a.text < b.text) {
            return -1;
        }

        return 0;
    });
    
    for (let index = 0;index < toDos.length;index++) {
         let nodes = Array.prototype.slice.call(document.getElementsByClassName("list")); // tag 의 인덱스 를 알기 위해 부모의 인덱스 를 가져온다.   
         nodes[index].childNodes[1].innerHTML = "<span>" + toDos[index].text + "</span>"; // tag 의 인덱스 를 알기 위해 nodes 로 접근 
    }
    
    saveToDos();
}

function descendingSort() { // 내림차순 정렬
    toDos.sort(function (a, b) {
        if (a.text < b.text) {
            return 1;
        }
        if (a.text > b.text) {
            return -1;
        }

        return 0;
    });
    
    for (let index = 0;index < toDos.length;index++) {
         let nodes = Array.prototype.slice.call(document.getElementsByClassName("list")); // tag 의 인덱스 를 알기 위해 부모의 인덱스 를 가져온다.
         nodes[index].childNodes[1].innerHTML = "<span>" + toDos[index].text + "</span>"; // tag 의 인덱스 를 알기 위해 nodes 로 접근 
    }
    
    saveToDos(); 
}*/
 