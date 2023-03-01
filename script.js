const todoInputForm = document.getElementById("todo-input-form");
const addTodoBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-container");
const alertMessage = document.getElementById("alert-message");
const todos = JSON.parse(localStorage.getItem("todos")) ?? []

if (todos.length > 0) {
  todoContainer.innerHTML = todos.reduce((prev, curr, index) => {
    return (
      prev +
      `<li id="todo-${index}" class="list-group-item d-flex justify-content-between align-items-center" >
          ${curr} <button type="button" class="btn btn-danger" data-index="${index}">Delete</button>
        </li>`
    );
  }, "");
}

addTodoBtn.addEventListener("click", () => {
  const newTodo = todoInputForm.value;
  if (newTodo === "") {
    alertMessage.style.display = "block";
  } else {
    const newTodoIndex = (todos.push(newTodo) - 1)
    alertMessage.style.display = "none";
    const newListItem = document.createElement("li");
    newListItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newListItem.innerHTML = `${newTodo} <button type="button" class="btn btn-danger" data-index="${newTodoIndex}">Delete</button>`;
    todoContainer.append(newListItem);
    todoInputForm.value = "";
    todoInputForm.focus();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

todoContainer.addEventListener("click", (e) => {
  console.log(e)
  if (e.target.className == "btn btn-danger") {
    console.log(e.target)
    const removedTodoIndex = e.target.dataset.index;
    console.log(removedTodoIndex)
    todos.splice(removedTodoIndex,1)
    e.target.parentElement.remove();
    localStorage.setItem("todos", JSON.stringify(todos))
  }
});
