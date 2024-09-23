let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

renderTodoList();

function renderTodoList() {
  let todoListHtml = "";

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, time, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${time}</div>
      <div>${dueDate}</div> 
      <button onclick="
        deleteTodo(${i});
      " class="delete-button">Delete</button>
    `;
    todoListHtml += html;
  }

  document.querySelector(".js-container").innerHTML = todoListHtml;
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const timeInputElement = document.querySelector(".js-time-input");
  const time = timeInputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  todoList.push({ name, time, dueDate });

  inputElement.value = "";
  timeInputElement.value = "";
  dateInputElement.value = "";
  renderTodoList();

  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTodo(i) {
  todoList.splice(i, 1);
  renderTodoList();

  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function clearTodo() {
  localStorage.removeItem("todoList");
  todoList = [];
  renderTodoList();
}
