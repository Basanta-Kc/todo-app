const todoInputForm = document.getElementById("todo-input-form");
const addTodoBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-container");
const alertMessage = document.getElementById("alert-message");
const todos = JSON.parse(localStorage.getItem("todos")) ?? [
  { name: "learn html", status: "DONE" },
  { name: "learn css" },
];

const renderTodos = () => {
  todoContainer.innerHTML = todos.reduce((prev, curr, index) => {
    const badgeClass = curr.status ? "text-bg-success" : "text-bg-secondary";
    return (
      prev +
      `<li id="todo-${index}" class="list-group-item d-flex justify-content-between align-items-center" >
          ${
            curr.name
          }  <span class="badge rounded-pill ${badgeClass} me-auto ms-2">${
        curr.status ?? "IN PROGRESS"
      } </span>
          <button type="button" class="btn btn-info ms-auto me-1" data-index="${index}">Mark as completed</button>
          <button type="button" class="btn btn-danger" data-index="${index}">Delete</button>
        </li>`
    );
  }, "");
}

if (todos.length > 0) renderTodos()

addTodoBtn.addEventListener("click", () => {
  const newTodo = todoInputForm.value;
  if (newTodo === "") {
    alertMessage.style.display = "block";
  } else {
    const newTodoIndex = todos.push({ name: newTodo }) - 1;
    alertMessage.style.display = "none";
    const newListItem = document.createElement("li");
    newListItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newListItem.innerHTML = `${newTodo} 
        <span class="badge rounded-pill ${badgeClass} me-auto ms-2">${
         "IN PROGRESS"
        }
        </span>
        <button type="button" class="btn btn-info ms-auto me-1" data-index="${newTodoIndex}">Mark as completed</button>
        <button type="button" class="btn btn-danger" data-index="${newTodoIndex}">Delete</button>`;
    todoContainer.append(newListItem);
    todoInputForm.value = "";
    todoInputForm.focus();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

todoContainer.addEventListener("click", (e) => {
  if (e.target.className == "btn btn-danger") {
    const removedTodoIndex = e.target.dataset.index;
    console.log(removedTodoIndex);
    todos.splice(removedTodoIndex, 1);
    e.target.parentElement.remove();
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  if (e.target.className.includes("btn btn-info")) {
    const completedTodoIndex = e.target.dataset.index;
    console.log(completedTodoIndex);
    todos[completedTodoIndex].status = "DONE"
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos()
  }
});
