let form = document.querySelector(".form");
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let empty = document.querySelector(".empty-title");
let statistics = document.querySelector(".statistics");

function loadTask() {
  // localStorage.clear()
  let localInfo = JSON.parse(localStorage.getItem("tasks"));

  if (localInfo.length > 0) {
    for (let i = 0; i < localInfo.length; i++) {
      addTask(localInfo[i].id, localInfo[i].text, localInfo[i].status);
    }
  } else {
    empty.style.display = "flex";
    statistics.style.display = "none";
  }

  tasksStatistics();
}

function addTask(localId, localText, status) {
  let task = document.createElement("div");
  task.className = "task";
  tasks.append(task);

  if (tasks.children.length > 0) {
    empty.style.display = "none";
    statistics.style.display = "flex";
  }

  let text = document.createElement("span");
  text.textContent = input.value; //
  text.className = "text";
  task.append(text);

  let completeButton = document.createElement("button");
  completeButton.textContent = "مكتمل";
  completeButton.className = "completeButton";
  task.append(completeButton);
  if (status === "completed") {
    task.classList.add("completed");
  }

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "حذف";
  deleteButton.className = "deleteButton";
  task.append(deleteButton);

  if (localId) {
    text.textContent = localText;
    task.setAttribute("id", localId);
    if (status === "completed") {
      task.classList.add("completed");
      completeButton.textContent = "الغاء";
    }
  } else {
    text.textContent = input.value;
    let tasksArray = JSON.parse(window.localStorage.getItem("tasks")) || [];
    let randomNum = parseInt(Math.random() * 10000000000000);
    task.setAttribute("id", randomNum);
    tasksArray.push({
      id: randomNum,
      text: input.value,
      status: "not-completed",
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  tasksStatistics();

  input.value = "";
}

function removeTask() {
  document.addEventListener("click", (e) => {
    if (e.target.className === "deleteButton") {
      let eleId = e.target.parentElement.getAttribute("id");
      e.target.parentElement.remove();

      let localInfo = JSON.parse(localStorage.getItem("tasks"));

      newLocalInfo = localInfo.filter((e) => e.id !== parseInt(eleId));

      localStorage.setItem("tasks", JSON.stringify(newLocalInfo));

      loudClassEffect();

      if (tasks.children.length === 0) {
        empty.style.display = "flex";
        statistics.style.display = "none";
      }

      tasksStatistics();
    }
  });
}

function completeButton() {
  document.addEventListener("click", (e) => {
    if (e.target.className === "completeButton") {
      loudClassEffect();

      e.target.previousElementSibling.classList.toggle("completed");
      e.target.parentElement.classList.toggle("completed");

      if (e.target.parentElement.classList.contains("completed")) {
        e.target.textContent = "الغاء";
      } else {
        e.target.textContent = "مكتمل";
      }

      let localInfo = JSON.parse(localStorage.getItem("tasks"));
      newLocalInfo = localInfo.map((el) => {
        if (el.id.toString() === e.target.parentElement.getAttribute("id")) {
          el.status === "completed"
            ? (el.status = "not-completed")
            : (el.status = "completed");
        }
        return el;
      });
      localStorage.setItem("tasks", JSON.stringify(newLocalInfo));

      tasksStatistics();
    }
  });
}

function loudClassEffect() {
  tasks.style.opacity = "0";
  tasks.style.transform = "translateX(20px)";
  setTimeout(() => {
    tasks.style.opacity = "1";
    tasks.style.transform = "translateX(0px)";
  }, 100);
}

function tasksStatistics() {
  let totalCount = statistics.children[0].children[0];
  let completed = statistics.children[1].children[0];
  let suspended = statistics.children[2].children[0];
  let allTask = document.querySelectorAll(".tasks .task");
  let taskCompleteCount = 0;

  totalCount.textContent = tasks.children.length;
  allTask.forEach((e) =>
    e.classList.contains("completed") ? taskCompleteCount++ : ""
  );
  completed.textContent = taskCompleteCount;
  suspended.textContent = tasks.children.length - taskCompleteCount;
}

loadTask();

submit.addEventListener("click", () => {
  loudClassEffect();
  addTask();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loudClassEffect();
    addTask();
  }
});

completeButton();

removeTask();
