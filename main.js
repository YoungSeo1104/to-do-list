let addButton = document.getElementById('add-btn');
let taskInput = document.getElementById('task-input');
let testArea = document.getElementsByClassName('task');
let taskList = [];

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', keyPress);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);
  render();
  taskInput.value = '';

  console.log('taskList:', taskList);
}

function render() {
  let resultHtml = '';
  for (let i=0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHtml += `<div class="task">
        <div class='task-done'>${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask()">Delete</button>
        </div>
      </div>`;
    } else {
      resultHtml += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask()">Delete</button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(idCheck) {
  for (let i=0; i<taskList.length; i++) {
    if (idCheck == taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }

  render();
}

function deleteTask() {
  console.log('삭제하자!');
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function keyPress(e) {
  if (e.key == 'Enter') {
    addTask();
  }
}
