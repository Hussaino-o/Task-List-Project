let form = document.querySelector(".form");
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

function loadTask() {
  let localInfo = JSON.parse(localStorage.getItem("tasks"));

  for (let i = 0; i < localInfo.length; i++) {
    addTask(localInfo[i].id, localInfo[i].text);
  }
}

function addTask(localId, localText) {
  
  let task = document.createElement("div");
  task.className = "task";
  tasks.append(task);

  let text = document.createElement("span");
  text.textContent = input.value; //
  text.className = "text";
  task.append(text);

  if (localId) {
    text.textContent = localText;
    task.setAttribute("id", localId);
  } else {
    text.textContent = input.value;
    let tasksArray = JSON.parse(window.localStorage.getItem("tasks")) || [];
    let randomNum = parseInt(Math.random() * 10000000000000);
    task.setAttribute("id", randomNum);
    tasksArray.push({
      id: randomNum,
      text: input.value,
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "حذف";
  deleteButton.className = "deleteButton";
  task.append(deleteButton);
  input.value = "";
  animation()
}

function removeTask() {
  document.addEventListener("click", (e) => {
    if (e.target.className === "deleteButton") {
      let eleId = e.target.parentElement.getAttribute("id");
      e.target.parentElement.remove();

      let localInfo = JSON.parse(localStorage.getItem("tasks"));

      newLocalInfo = localInfo.filter((e) => e.id !== parseInt(eleId));

      localStorage.setItem("tasks", JSON.stringify(newLocalInfo));
    }
  });
}

function animation() {
  tasks.style.opacity = "0";
  tasks.style.transform = "translateX(3px)";
  setTimeout(() => {
    tasks.style.opacity = "1";
    tasks.style.transform = "translateX(0px)";
  }, 1);
}

loadTask();

submit.addEventListener("click", () => {
  addTask();
});

removeTask();
