const todoInputForm = document.getElementById("todo-input-form");
const addTodoBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-container");
const alertMessage = document.getElementById("alert-message");
// const todos = JSON.parse(localStorage.getItem("todos")) ?? [{value: "learn html", status: "DONE"}];
// const todos = ["learn thml", "learn css"]
const todos = [
  { value: "learn html", status: "In Progress" },
  { value: "learn CSS", status: "Done" },
];

const renderTodos = () => {
  let todoContainerHtml = "";

  // use array ko reduce method
  for (let i = 0; i < todos.length; i++) {
    todoContainerHtml += `
<li class="list-group-item d-flex justify-content-between align-items-center">
          ${todos[i].value} 
          <span class="badge bg-info me-auto ms-1">${todos[i].status}</span>
          <button type="button" class="btn btn-primary me-1" data-index="${i}">Mark As Completed</button>
          <button type="button" class="btn btn-danger" data-index="${i}">Delete</button>
        </li>
`;
  }

  todoContainer.innerHTML = todoContainerHtml;
};

renderTodos();

addTodoBtn.addEventListener("click", () => {
  const newTodo = todoInputForm.value;
  if (newTodo === "") {
    alertMessage.style.display = "block";
  } else {
    alertMessage.style.display = "none";
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    todoInputForm.value = "";
    todoInputForm.focus();
  }
});

todoContainer.addEventListener("click", (e) => {
  if (e.target.className == "btn btn-danger") {
    const todoToBeRemovedIndex = e.target.dataset.index;
    todos.splice(todoToBeRemovedIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
});

// const persons = ["bibek", "basanta"]

// const persons = [ { name: bibke , age: 20}, { name: basanta, age : 13}]
