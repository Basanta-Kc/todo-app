const todoInputForm = document.getElementById("todo-input-form");
const addTodoBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("todo-container");
const alertMessage = document.getElementById("alert-message");
const todos = JSON.parse(localStorage.getItem("todos")) ?? [];
// const todos = ["learn thml", "learn css"]
// const todos = [
//   { value: "learn html", status: "In Progress" },
//   { value: "learn CSS", status: "Done" },
// ];
{
  /* <span class="badge bg-info me-auto ms-1">${todos[i].status}</span>
          <button type="button" class="btn btn-primary me-1" data-index="${i}">Mark As Completed</button> */
}

const renderTodos = () => {
  let todoContainerHtml = "";

  for (let i = 0; i < todos.length; i++) {
    const { value, status } = todos[i];
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
          <button type="button" class="btn btn-danger">Delete</button>
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
});

const persons = [
  { name: "basanta", age: 20 },
  { name: "bibek", age: 10 },
];

persons[1].name = "Bibek Dhungana";
