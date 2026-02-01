// SADE TODO (Firebase yok, önce çalışsın)
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const countText = document.getElementById("count");
const emptyMsg = document.getElementById("emptyMsg");
const addSound = document.getElementById("addSound");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  emptyMsg.style.display = tasks.length ? "none" : "block";
  countText.textContent = "Toplam Görev: " + tasks.length;

  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = t.text;

    const done = document.createElement("button");
    done.textContent = "✔";
    done.onclick = () => {
      t.done = !t.done;
      save();
      render();
    };

    const del = document.createElement("button");
    del.textContent = "X";
    del.onclick = () => {
      tasks.splice(i, 1);
      save();
      render();
    };

    li.append(span, done, del);
    list.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  input.value = "";
  addSound.play();
  save();
  render();
}

addBtn.onclick = addTask;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

themeToggle.onclick = () =>
  document.body.classList.toggle("dark");

render();
