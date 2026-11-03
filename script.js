// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")


 // 

// Exercise 2 - Task Board

const bt_add = document.getElementById("bt_add");
const task_list = document.getElementById("task-list");
const task_input = document.getElementById("task-input");
const task_form = document.getElementById("task-form");
const erorr = document.getElementById("error");
const priority_select = document.getElementById("priority-select");
const left = document.getElementById("left");
const filters = document.getElementById("filters");
const empty = document.getElementById("empty");
const clear_completed = document.getElementById("clear-done");

let currentFilter = "all";

// Step 1: Add task
task_form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (task_input.value.trim() == "") {
        erorr.textContent = "Please type a task";
        erorr.hidden = false;
        return;
    }

    erorr.hidden = true;
    erorr.textContent = "";

    const card = document.createElement("li");
    card.classList.add("priority-" + priority_select.value);

    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = task_input.value.trim();

    const delete_bt = document.createElement("button");
    delete_bt.classList.add("delete");
    delete_bt.textContent = "x";

    card.appendChild(span);
    card.appendChild(delete_bt);
    task_list.appendChild(card);

    task_input.value = "";
    task_input.focus();

    updateLeft();
    updateEmpty();
    updateFilter();
});

// Step 2 + Step 3: Done and Delete
task_list.addEventListener("click", (event) => {
    const card = event.target.closest("li");

    if (card == null) {
        return;
    }

    if (event.target.classList.contains("delete")) {
        card.remove();
    }
    else {
        card.classList.toggle("done");
    }

    updateLeft();
    updateEmpty();
    updateFilter();
});

// Step 4: Tasks left counter
function updateLeft() {
    const allTask = task_list.querySelectorAll("li");
    let num = 0;

    for (let i = 0; i < allTask.length; i++) {
        if (!allTask[i].classList.contains("done")) {
            num++;
        }
    }

    left.textContent = num;
}

// Step 5: Filters
filters.addEventListener("click", (event) => {
    if (!event.target.dataset.filter) {
        return;
    }

    currentFilter = event.target.dataset.filter;

    const buttons = filters.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    event.target.classList.add("active");

    updateFilter();
});

function updateFilter() {
    const allTask = task_list.querySelectorAll("li");

    for (let i = 0; i < allTask.length; i++) {
        if (currentFilter == "all") {
            allTask[i].hidden = false;
        }
        else if (currentFilter == "active") {
            allTask[i].hidden =
                allTask[i].classList.contains("done");
        }
        else if (currentFilter == "done") {
            allTask[i].hidden =
                !allTask[i].classList.contains("done");
        }
    }
}

// Step 6: Clear completed
clear_completed.addEventListener("click", () => {
    const allTask = task_list.querySelectorAll("li");

    for (let i = 0; i < allTask.length; i++) {
        if (allTask[i].classList.contains("done")) {
            allTask[i].remove();
        }
    }

    updateLeft();
    updateEmpty();
    updateFilter();
});

// Step 7: Empty message
function updateEmpty() {
    const allTask = task_list.querySelectorAll("li");

    if (allTask.length == 0) {
        empty.hidden = false;
    }
    else {
        empty.hidden = true;
    }
}

// Initial state
updateLeft();
updateEmpty();
updateFilter();
