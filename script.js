const todoInputForm = document.getElementById("todo-input-form");
const addTodoBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-container");
const alertMessage = document.getElementById("alert-message");
const searchInputForm = document.getElementById("search-input-form");
const todos = JSON.parse(localStorage.getItem("todos")) ?? [];

const renderTodos = (filteredTodos) => {
  let todoContainerHtml = "";

  if(filteredTodos?.length == 0){
    todoContainer.innerHTML = 
      `<div class="alert alert-primary" role="alert">
        No todos found for search term: ${searchInputForm.value}
      </div>`
    ;
    return;
  }

  const todoToRender = filteredTodos ?? todos

  for (let i = 0; i < todoToRender.length; i++) {
    const { value, status } = todoToRender[i];
    const bagdeClass = status === "Done" ? "bg-success" : "bg-info";
    const actionButton =
      status === "Done"
        ? ""
        : `<button type="button" class="btn btn-primary me-1">Mark As Completed</button>`;
    todoContainerHtml += `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-index=${i}>
          ${value} 
          <span class="badge ${bagdeClass} me-auto ms-1">${status}</span>
         ${actionButton}
         <button type="button" class="btn btn-secondary me-1">Edit</button>
          <button type="button" class="btn btn-danger">Delete</button>
        </li>
`;
  }

  todoContainer.innerHTML = todoContainerHtml;
};

renderTodos();

// onchange, keypress, keydown
// then i found i out about search
// then i found out about input
searchInputForm.addEventListener("input", (e) => {
  console.log("rest",searchInputForm.value)
  const filteredTodos = todos.filter(({value}) => value.includes(e.target.value) )
  console.log(filteredTodos)
  renderTodos(filteredTodos)
})

addTodoBtn.addEventListener("click", () => {
  const newTodo = todoInputForm.value;
  if (newTodo === "") {
    alertMessage.style.display = "block";
  } else {
    if (todoInputForm.dataset.index) {
      todos[todoInputForm.dataset.index].value = newTodo;
      todoInputForm.value = "";
      todoInputForm.dataset.index = "";
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
      return;
    }

    alertMessage.style.display = "none";
    todos.push({ value: newTodo, status: "In Progress" });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    todoInputForm.value = "";
    todoInputForm.focus();
  }
});



todoContainer.addEventListener("click", (e) => {
  const index = e.target.parentElement.dataset.index;

  if (e.target.className == "btn btn-danger") {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  if (e.target.className == "btn btn-primary me-1") {
    todos[index].status = "Done";
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  if (e.target.className == "btn btn-secondary me-1") {
    todoInputForm.value = todos[index].value;
    todoInputForm.dataset.index = index;
  }
});
