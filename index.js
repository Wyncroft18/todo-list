let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

renderTodoList();

function renderTodoList() {
  let todoListHtml = "";

  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    const html = `
      <div class="task-name">${todo}</div>
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

  if (name.length !== 0) {
    todoList.push(name);

    inputElement.value = "";
    renderTodoList();

    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("Task name can't be empty!");
  }
}

function deleteTodo(i) {
  todoList.splice(i, 1);
  renderTodoList();

  if (todoList.length == 0) {
    localStorage.removeItem("todoList");
  } else {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
}

function clearTodo() {
  todoList = [];
  renderTodoList();
  localStorage.removeItem("todoList");
}
