/**
 * ELEMENT SELECTION
 */
var list = document.querySelector("#task-list");
var form = document.querySelector("#new-task-form");
var input = document.querySelector("#new-task-name");
var statusFilter = document.querySelectorAll(".status-filter");
var remaining = document.querySelector("#remaining");
var clearBtn = document.querySelector("#clear-completed");
/**
 * GLOBAL VARIABLES
 */
var taskList = [];
var currentTask = "all";
var remainingTasks = 0;
// FUNCTIONS
/**
 * Dark Mode Logic
 */
function toggleDarkMode() {
    var root = document.documentElement;
    root.classList.toggle("dark-mode");
}
document
    .getElementById("darkModeToggle")
    .addEventListener("click", toggleDarkMode);
/**
 *
 * @param tasks: list f tasks
 *
 * this takes an array of tasks and renders it to the DOM
 */
function renderTasks(tasks) {
    list.innerHTML = ""; // Clear the list before rendering new tasks
    tasks.map(function (task) {
        var li = document.createElement("li");
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            // saveTask();
            if (checkbox.checked) {
                remainingTasks--;
            }
            else {
                remainingTasks++;
            }
            renderTasks(taskList);
            remaining.innerText = "".concat(remainingTasks, " items left");
        });
        // label.append(checkbox, task.title);
        label.append(task.title);
        li.append(checkbox, label);
        list === null || list === void 0 ? void 0 : list.append(li);
    });
}
/**
 * EVENT LISTENERS
 *
 *
 */
statusFilter.forEach(function (item) {
    item.addEventListener("click", function (e) {
        // Remove the "active" class from all filter items
        statusFilter.forEach(function (filterItem) {
            filterItem.classList.remove("active");
        });
        // Add the "active" class to the clicked filter item
        item.classList.add("active");
        // Update the currentTask variable based on the clicked filter item
        if (item.innerText === "All")
            currentTask = "all";
        if (item.innerText === "Active")
            currentTask = "active";
        if (item.innerText === "Completed")
            currentTask = "completed";
        // Filter tasks based on the current status filter
        var filteredTasks;
        switch (currentTask) {
            case "all":
                filteredTasks = taskList;
                break;
            case "active":
                filteredTasks = taskList.filter(function (task) { return !task.completed; });
                remainingTasks = filteredTasks.length;
                break;
            case "completed":
                filteredTasks = taskList.filter(function (task) { return task.completed; });
                break;
            default:
                filteredTasks = taskList;
        }
        // Render the filtered tasks
        renderTasks(filteredTasks);
        remaining.innerText = "".concat(remainingTasks, " items left");
    });
});
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    var task = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        title: input.value,
        completed: false,
        createdAt: new Date(),
    };
    taskList.push(task);
    if (currentTask === "all") {
        remainingTasks = taskList.filter(function (task) { return !task.completed; }).length;
        console.log(remainingTasks);
        remaining.innerText = "".concat(remainingTasks, " items left");
        renderTasks(taskList);
    }
    // saveTask();
    input.value = "";
});
clearBtn.addEventListener("click", function () {
    taskList = taskList.filter(function (task) { return !task.completed; });
    renderTasks(taskList);
});
// function saveTask() {
//   localStorage.setItem("taskList", JSON.stringify(taskList));
// }
// function loadTask(): Task[] {
//   const tasksList = localStorage.getItem("taskList");
//   if (tasksList == null) return [];
//   return JSON.parse(tasksList);
// }
