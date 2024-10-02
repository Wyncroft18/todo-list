const inputField = document.querySelector(".input-field");
const listContainer = document.querySelector(".list-container");
const addButton = document.querySelector(".add-button");

addButton.addEventListener("click", () => {
  addTask();
});

listContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    save();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove();
    save();
  }
});

renderList();

function addTask() {
  if (inputField.value === "") {
    alert("Input field empty!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputField.value;
    listContainer.appendChild(li);
    let closeButton = document.createElement("span");
    li.appendChild(closeButton);
  }

  inputField.value = "";
  save();
}

function save() {
  if (listContainer.innerHTML === "") {
    localStorage.removeItem("taskList");
  } else {
    localStorage.setItem("taskList", listContainer.innerHTML);
  }
}

function renderList() {
  listContainer.innerHTML = localStorage.getItem("taskList");
}
