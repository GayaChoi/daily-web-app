const form = document.querySelector(".js-form"), 
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

  const USER_LS = "currentUser",
        SHOWING_CN = "showing";
  
  function saveName(text) {
        localStorage.setItem(USER_LS, text);  
  }   

  function handleSubmit(event) {
        event.preventDefault();
        const currentValue = input.value;
        paintGreeting(currentValue);
        saveName(currentValue);
  }

  function askForName() {
        form.classList.add(SHOWING_CN); // class 를 form 태그 에 추가해준다.
        form.addEventListener("submit",handleSubmit);
  }
  
  function paintGreeting(text) {
        form.classList.remove(SHOWING_CN);
        greeting.classList.add(SHOWING_CN);
        greeting.innerHTML = `Hello,${text}`;

  }

  function loadName() {
      const currentUser = localStorage.getItem(USER_LS);
      
      if (currentUser === null) { // local 에 사용자 정보 가 없는 경우
        askForName();
      } 
      else {
         paintGreeting(currentUser); 
      }
  }
  
  function init() {
      loadName(); // local 에 저장 되어있는 것을 가져온다.
  }

  init();