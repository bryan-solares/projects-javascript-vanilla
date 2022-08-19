let tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = 0;

const bAdd = document.getElementById("bAdd");
const idTask = document.getElementById("idTask");
const formTask = document.getElementById("formTask");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTask();

formTask.addEventListener("submit", (event) => {
  event.preventDefault();
  if (idTask.value !== "") {
    createTask(idTask.value);
    idTask.value = "";
    renderTask();
  }
});

function createTask(taskValue) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: taskValue,
    complete: false,
  };

  tasks.unshift(newTask);
}

function renderTask() {
  const html = tasks.map((element) => {
    return `
      <div class="task">
        <div class="completed">${
          element.complete
            ? "<span class='done'>Done</span>"
            : `<button data-id=${element.id} class='start-button'>Start</button>`
        }</div>
        <div class="title">${element.title}</div>
      </div>
    `;
  });

  const taskContainer = document.querySelector("#tasks");
  taskContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    console.log(button.getAttribute("data-id"));
    button.addEventListener("click", () => {
      if (!timer) {
        const idButton = button.getAttribute("data-id");
        startButtonHandler(idButton);
        button.textContent = "In progress";
      }
    });
  });
}

function startButtonHandler(id) {
  //time = 25 * 60;
  time = 5;
  current = id;

  const taskIndex = tasks.findIndex((task) => task.id === id);
  taskName.textContent = tasks[taskIndex].title;
  renderTime();
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function timerHandler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTask();
    startBreak();
  }
}

function markCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].complete = true;
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startBreak() {
  time = 5 * 60;
  time = 5;
  taskName.textContent = "Break";
  renderTime();
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTask();
  }
}
