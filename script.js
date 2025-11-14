const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);
addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAll);
searchInput.addEventListener("input", searchTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;

  if (taskText === "") return alert("Please enter a task!");

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="task-left">
      <span>${taskText}</span>
      <span class="category-tag category-${category}">${category}</span>
    </div>
    <div>
      <button class="delete">❌</button>
    </div>
  `;

  li.addEventListener("click", toggleTask);
  li.querySelector(".delete").addEventListener("click", deleteTask);

  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function toggleTask(e) {
  if (e.target.classList.contains("delete")) return;
  e.currentTarget.classList.toggle("completed");
  saveTasks();
}

function deleteTask(e) {
  e.stopPropagation();
  e.currentTarget.closest("li").remove();
  saveTasks();
}

function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
  }
}

function searchTasks() {
  const searchText = searchInput.value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent.toLowerCase();
    li.style.display = text.includes(searchText) ? "flex" : "none";
  });
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      category: li.querySelector(".category-tag").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <div class="task-left">
        <span>${task.text}</span>
        <span class="category-tag category-${task.category}">${task.category}</span>
      </div>
      <div>
        <button class="delete">❌</button>
      </div>
    `;
    li.addEventListener("click", toggleTask);
    li.querySelector(".delete").addEventListener("click", deleteTask);
    taskList.appendChild(li);
  });
}


