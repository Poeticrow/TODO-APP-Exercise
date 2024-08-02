/**
 * ELEMENT SELECTION
 */

const list = document.querySelector<HTMLUListElement>("#task-list");
const form = document.querySelector<HTMLUListElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-name");
const statusFilter =
  document.querySelectorAll<HTMLSpanElement>(".status-filter");
const remaining = document.querySelector<HTMLSpanElement>("#remaining");
const clearBtn = document.querySelector<HTMLButtonElement>("#clear-completed");
/** TYPES AND INTERFACES */
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
type StatusFilter = "all" | "active" | "completed";

/**
 * GLOBAL VARIABLES
 */

let taskList: Task[] = [];
let currentTask: StatusFilter = "all";
let remainingTasks: number = 0;

// FUNCTIONS
/**
 * Dark Mode Logic
 */
function toggleDarkMode() {
  const root = document.documentElement;
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

function renderTasks(tasks: Task[]) {
  list.innerHTML = ""; // Clear the list before rendering new tasks

  tasks.map((task) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      // saveTask();
      if (checkbox.checked) {
        remainingTasks--;
      } else {
        remainingTasks++;
      }
      renderTasks(taskList);
      remaining.innerText = `${remainingTasks} items left`;
    });

    // label.append(checkbox, task.title);
    label.append(task.title);
    li.append(checkbox, label);

    list?.append(li);
  });
}

/**
 * EVENT LISTENERS
 *
 *
 */
statusFilter.forEach((item) => {
  item.addEventListener("click", function (e) {
    // Remove the "active" class from all filter items
    statusFilter.forEach((filterItem) => {
      filterItem.classList.remove("active");
    });

    // Add the "active" class to the clicked filter item
    item.classList.add("active");

    // Update the currentTask variable based on the clicked filter item
    if (item.innerText === "All") currentTask = "all";
    if (item.innerText === "Active") currentTask = "active";
    if (item.innerText === "Completed") currentTask = "completed";

    // Filter tasks based on the current status filter
    let filteredTasks: Task[];
    switch (currentTask) {
      case "all":
        filteredTasks = taskList;
        break;
      case "active":
        filteredTasks = taskList.filter((task) => !task.completed);
        remainingTasks = filteredTasks.length;
        break;
      case "completed":
        filteredTasks = taskList.filter((task) => task.completed);
        break;
      default:
        filteredTasks = taskList;
    }

    // Render the filtered tasks
    renderTasks(filteredTasks);
    remaining.innerText = `${remainingTasks} items left`;
  });
});

form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const task: Task = {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  taskList.push(task);

  if (currentTask === "all") {
    remainingTasks = taskList.filter((task) => !task.completed).length;
    console.log(remainingTasks);
    remaining.innerText = `${remainingTasks} items left`;
    renderTasks(taskList);
  }
  // saveTask();
  input.value = "";
});

clearBtn.addEventListener("click", function () {
  taskList = taskList.filter((task) => !task.completed);
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
