const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector(".js-toDoInput");
const toDoList = document.querySelector(".js-toDoList");

const TODO_KEY_NAME = "toDo";

let toDoArray = [];

function deleteTodo(event){
    const button = event.target;
    const li = button.parentNode;
    toDoList.removeChild(li);
    const cleanTodo = toDoArray.filter(function(toDO){
        return toDO.id !== parseInt(li.id);
    });

    toDoArray = cleanTodo;
    saveTodo();
}

function saveTodo(){
    localStorage.setItem(TODO_KEY_NAME, JSON.stringify(toDoArray));
}

function paintTodo(text){
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    const newID = toDoArray.length + 1;

    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteTodo);

    listItem.appendChild(deleteButton);

    const span = document.createElement("span");
    span.innerText = "  [" + text + "]";
    listItem.appendChild(span);
    listItem.id = newID;
    toDoList.appendChild(listItem);

    const toDoObj = {
        text: text,
        id: newID
    }

    toDoArray.push(toDoObj);
    saveTodo();
}

function handleSubmitToDo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function loadToDo(){
const loadedTodoList = localStorage.getItem(TODO_KEY_NAME);

if(null !== loadedTodoList){
    const parsedToDo = JSON.parse(loadedTodoList);
    parsedToDo.forEach(function(toDO){
        paintTodo(toDO.text);
    });
}
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmitToDo);
}


init();