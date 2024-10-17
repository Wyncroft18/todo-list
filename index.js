const inputField = document.querySelector(".input-field");
const listContainer = document.querySelector(".list-container");
const addButton = document.querySelector(".add-button");

// Modal Variables
const modalSubmitButton = document.querySelector(".modal-submit-btn");

// Get modal
const modal = document.querySelector(".modal");

// Get the close button
const closeModal = document.querySelector(".close");

// Render the list on page
renderList();

// Get the button that opens the modal
let dueDates = document.querySelectorAll(".due-date");

// Execute add task function
addButton.addEventListener("click", () => {
  addTask();
});

// Event listener for check toggle and remove task
listContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    save();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove();
    save();
  }
});

// Index tracker of what due date button clicked
let currentIndex = 0;

// Call the function that listens to due date button click
openModal();

// Add event listener to submit button and add due date
modalSubmitButton.addEventListener("click", () => {
  let dateInput = document.querySelector(".date-input");
  let timeInput = document.querySelector(".time-input");
  let hour = Number(timeInput.value.slice(0, 2));
  let minute = timeInput.value.slice(2, 5);
  let time;

  if (hour > 12) {
    hour -= 12;
    time = `${String(hour)}${minute} pm`;
  } else {
    time = `${String(hour)}${minute} am`;
  }

  if (dateInput.value === "" && timeInput.value === "") {
    alert("Both input boxes shouldn't be empty.");
  } else if (dateInput.value === "") {
    dueDates[currentIndex].innerHTML = `${time}`;
  } else if (timeInput.value === "") {
    dueDates[currentIndex].innerHTML = `${dateInput.value}`;
  } else {
    dueDates[currentIndex].innerHTML = `${dateInput.value} | ${time}`;
  }

  dateInput.value = "";
  timeInput.value = "";
  save();
  modal.style.display = "none";
});

// Function that opens the modal
function openModal() {
  dueDates.forEach((dueDate, index) => {
    dueDate.addEventListener("click", () => {
      modal.style.display = "block";
      currentIndex = index;
    });
  });
}

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Add task function
function addTask() {
  if (inputField.value === "") {
    alert("Input field empty!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputField.value;
    let p = document.createElement("p");
    p.classList.add("due-date");
    p.innerHTML = `&plus; due date`;
    li.appendChild(p);
    let closeButton = document.createElement("span");
    li.appendChild(closeButton);
    listContainer.appendChild(li);

    // Update dueDates list everytime a new task is added and call open modal function
    dueDates = document.querySelectorAll(".due-date");
    openModal();
  }

  inputField.value = "";
  save();
}

// Save to browser
function save() {
  if (listContainer.innerHTML === "") {
    localStorage.removeItem("taskList");
  } else {
    localStorage.setItem("taskList", listContainer.innerHTML);
  }
}

// Render the list on page
function renderList() {
  listContainer.innerHTML = localStorage.getItem("taskList");
}
