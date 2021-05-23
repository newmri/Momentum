const form = document.querySelector(".js-form");
const input = form.querySelector(".js-input");

const greeting = document.querySelector(".js-greetings");

const USER_NAME_KEY = "currentUser";
const SHOWING_CLASS_NAME = "showing";

function saveName(text){
    localStorage.setItem(USER_NAME_KEY, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CLASS_NAME);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CLASS_NAME);
    greeting.classList.add(SHOWING_CLASS_NAME);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
const currentUser = localStorage.getItem(USER_NAME_KEY);

if(null === currentUser){
    askForName();
}

else{
    paintGreeting(currentUser);
}
}

function init(){
    loadName();
}

init();