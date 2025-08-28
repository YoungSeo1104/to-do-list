let addButton = document.getElementById('add-btn');
let taskInput = document.getElementById('task-input');
let taskList = [];
let tabs = document.querySelectorAll('.task-tab li');
let mode = 'all';
let filterList = [];

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', keyPress);

for (let i=0; i<tabs.length; i++) {
  tabs[i].addEventListener('click', function(e){filter(e)});
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  if (taskInput.value == '' || taskInput.value == null) {
    alert('할일을 적어주세요');
  } else {
    taskList.push(task);
    filter();
    taskInput.value = '';
  }
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else {
    list = filterList;
  }
  
  let resultHtml = '';
  for (let i=0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHtml += `<div class="task t-done">
        <div class='task-done'>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')" class='check-btn'>Check</button>
          <button onclick="deleteTask('${list[i].id}')" class='delete-btn'>❌</button>
        </div>
      </div>`;
    } else {
      resultHtml += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')" class='check-btn'>Check</button>
          <button onclick="deleteTask('${list[i].id}')" class='delete-btn'>❌</button>
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
  filter();
}

function deleteTask(idCheck) {
  for(let i=0; i<taskList.length; i++) {
    if (taskList[i].id == idCheck) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;

    for (let i=0; i<tabs.length; i++) {
      if (tabs[i] == e.target) {
        tabs[i].classList.add('active');
      } else {
        tabs[i].classList.remove('active');
      }
    }
  }
  filterList = [];
  if (mode === 'all') {
    render();
  } else if (mode === 'ongoing') { //진행중
    for(let i=0; i<taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else { 
    for(let i=0; i<taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
      render();
    }
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function keyPress(e) {
  if (e.key == 'Enter') {
    addTask();
  }
}

function tabTask(e) {
  render();
}
