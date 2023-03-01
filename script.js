const todoInputForm = document.getElementById("todo-input-form");
const addTodoBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-container");
const alertMessage = document.getElementById("alert-message");
alertMessage.style.display = "none";

  

addTodoBtn.addEventListener("click", () => {
  const newTodo = todoInputForm.value;
  if (newTodo === "") {
    alertMessage.style.display = "block";
  } else {
    alertMessage.style.display = "none";
    const newListItem = document.createElement("li");
    newListItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newListItem.innerHTML = `${newTodo} <button type="button" class="btn btn-danger">Delete</button>`;
    todoContainer.append(newListItem);
    todoInputForm.value = "";
    todoInputForm.focus();
  }
});

todoContainer.addEventListener("click", (e) => {
  if (e.target.className == "btn btn-danger") {
    e.target.parentElement.remove();
  }
});
