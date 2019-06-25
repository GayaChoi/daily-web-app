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

function saveToDos() { 
   localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // object 를 string 으로 변환(반대도 성립)
}
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

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length + 1;     
    const delBtn = document.createElement("div");
    
    delBtn.className = "button-setting"; 
    delBtn.innerHTML = "❌";
     
    delBtn.addEventListener("click", deleteToDo);
    
    li.className = "list"; 
    li.appendChild(span);
    li.appendChild(delBtn);
    
    li.id = newId;
    
    // TODO: callback 함수 개념 다시 이해 하기
    toDoList.appendChild(li); // TODO_BUG: Uncaught TypeError: Cannot read property ‘appendChild’ of null => callback 할 때 null 이 리턴
    
    const toDoObj = {
        text: text,
        id: newId
    };   
  
    toDos.push(toDoObj);  
    span.innerText = text;
    saveToDos(); // local 안에 TODO 를 저장
}

function handleSubmit(event) {
    const currentValue = toDoInput.value;

    event.preventDefault(); // 이벤트 기능 을 억제한다.
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
         
        parsedToDos.forEach(function(toDo) {  
            paintToDo(toDo.text)
        }); // forEach
    } // if end    
} // loadToDos function

function init() {
      loadToDos();
      //upBtn.addEventListener("click", ascendingSort);
      //downBtn.addEventListener("click", descendingSort);  
      toDoForm.addEventListener("submit", handleSubmit);
}

init();
 