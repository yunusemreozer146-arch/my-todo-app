const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const countText = document.getElementById("count");
const emptyMsg = document.getElementById("emptyMsg");
const addSound = document.getElementById("addSound");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateUI() {
  countText.textContent = "Toplam Görev: " + tasks.length;
  emptyMsg.style.display = tasks.length === 0 ? "block" : "none";
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.className = "done-btn";
    doneBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateUI();
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();

  addSound.currentTime = 0;
  addSound.play();
}

addBtn.onclick = addTask;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

renderTasks();
updateUI();
