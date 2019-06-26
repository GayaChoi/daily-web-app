const form = document.querySelector(".js-form"), 
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

  const USER_LS = "currentUser",  // local 내에 User 정보를 받아와서 저장 해줌
        SHOWING_CN = "showing";  //  form 내에 들어갈 class 명칭
   
  function saveName(text) { // local 에서 사용자의 이름 을 저장 하는 함수
        localStorage.setItem(USER_LS, text);  
  }   

  function handleSubmit(event) {
        event.preventDefault(); // 이벤트를 억제한다.form 에 정보를 한번 밖에 받지 못하게 함.
        const currentValue = input.value; // form 안에 있는 input 태그 에 사용자가 기입한 정보를 그대로 받아온다.
        paintGreeting(currentValue);     //  사용자 가 기입한 정보를 전달한다.  
        saveName(currentValue);
  }

  function askForName() {
        form.classList.add(SHOWING_CN); // class 를 form 태그 에 추가해준다.해당 css 에서 설정된 요소를 불러온다.
        form.addEventListener("submit",handleSubmit); // form 에 있는 정보를 handleSubmit 에 전달 해준다.
  }
  
  function paintGreeting(text) { // 사용자 가 기입한 정보를 다시 form 에 기입하는 함수
        form.classList.remove(SHOWING_CN); // showing 클래스를 지워준다.즉,css 에 기입된 정보를 불러올수 없다.
        greeting.classList.add(SHOWING_CN); // h4 태그안에 클래스 가 작동되고 showing 클래스를 생성 해준뒤 css에 기입된 정보를 불러온다.
        greeting.innerHTML = `Hello,${text}`; // h4 태그에 전송된 정보를 기입.
  }

  function loadName() {
      const currentUser = localStorage.getItem(USER_LS); //USER_LS 가 있는 지 확인
      
      if (currentUser === null) { // local 에 USER_LS(사용자 이름) 가 없는 경우
        askForName();
      } 
      else {
         paintGreeting(currentUser); 
      }
  }
  
  function init() {
      loadName(); // local 에 사용자의 이름을 설정해주는 함수
  }

  init();