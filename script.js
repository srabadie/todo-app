const taskInput = document.getElementById("main-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const showAlert = document.getElementById("show-alert");
const todosbody = document.querySelector("tbody");
const deletAll = document.getElementById("delet-all");
const filterTodos = document.querySelectorAll(".filter-todos")

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todosId = () => {
  const id = Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
  return id;
};

const alertMassage = (massage, type) => {
  showAlert.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = massage;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  showAlert.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosbody.innerHTML = "";
  if (todos.length === 0) {
    todosbody.innerHTML = "<tr><td colspan='4'>No Task found!</tr></td>";
  }

  todos.forEach((todo) => {
    todosbody.innerHTML += `
    <tr>
      <td>${todo.task}</td>
      <td>${todo.date || "No Date"}<?td>
      <td>${todo.completed ? "copleted" : "pending"}</td>
      <td>
      <button onclick="editHandeler('${todo.id}')">Edit</button>
      <button onclick="doHandeler('${todo.id}')">${
      todo.completed ? "Undo" : "Do"
    }</button>
      <button onclick="deletHandeler('${todo.id}')">Delete</button>
      </td>
    </tr>
    `;
  });
};
// displayTodos();

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

console.log(todos);
const buttonHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: todosId(),
    task: task,
    date: date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";

    alertMassage("todo addded successfully", "success");
    console.log(todos);
  } else {
    alertMassage("please enter something!", "error");
  }
};

const deletAllHandeler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    alertMassage("todos deleted successfully!", "success");
  } else {
    alertMassage("No todos to delet!", "error");
  }
};

const deletHandeler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  alertMassage("todo deleted!", "success");
};
const doHandeler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos();
};
const editHandeler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const editButtonHandeler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  saveToLocalStorage();
  displayTodos();
  alertMassage("Todo Edited successfully!", "success");
};
const filterButtonHandeler=(event)=>{
  const filter=event.target.dataset.filter
  let todosFiltered=null
  if(filter==="pending"){
    todosFiltered=todos.filter((todo)=>todo.completed=false)
  }else if(filter==="completed"){
    todosFiltered=todos.filter((todo)=>todo.completed=true)
  }else{
    filterTodos=todos;
  }
  console.log(todosFiltered)
}
window.addEventListener("load", displayTodos);
addButton.addEventListener("click", buttonHandler);
deletAll.addEventListener("click", deletAllHandeler);
editButton.addEventListener("click", editButtonHandeler);
filterTodos.forEach((button)=>{
  button.addEventListener("click",filterButtonHandeler)
})