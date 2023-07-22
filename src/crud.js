const taskList = document.getElementById('tasks');
const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');

const displayList = () => {
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  if (tasks === null) return;
  const sortedList = tasks.slice().sort((a, b) => a.index - b.index);
  taskList.innerHTML = '';
  sortedList.forEach((task) => {
    const { completed } = task;
    const checked = completed ? 'active' : '';
    const lineT = completed ? 'line' : '';
    const unfinished = !completed ? 'active' : '';
    const list = `
        <div class="task task-${task.index}">
          <div class="checkbox" data-btn="${task.index}">
            <button class="square ${unfinished}"></button>
            <button class="done ${checked}"></button>
          </div>
          <input type="text" class="list ${lineT}" value="${task.description}" data-desc="${task.index}"/>
          <button class="move" data-remove="${task.index}"></button>
        </div>
      `;
    taskList.insertAdjacentHTML('beforeend', list);
  });
};

const addTask = (e) => {
  e.preventDefault();
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  const tasksItem = taskInput.value;
  taskInput.value = '';
  if (tasksItem === null) return;
  const task = {
    description: tasksItem,
    completed: false,
    index: tasks.length,
  };
  const filtered = [...tasks, task];
  localStorage.setItem('listItems', JSON.stringify(filtered));
  displayList();
};
form.addEventListener('submit', addTask);

const removeTask = (e) => {
  const clicked = e.target.closest('.move');
  if (!clicked) return;
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  const listNum = +clicked.dataset.remove;
  const filtered = tasks.filter((task) => task.index !== listNum);
  let filtOrder = [];
  filtered.forEach((task, count) => {
    task.index = count;
    filtOrder = [...filtOrder, task];
  });
  localStorage.setItem('listItems', JSON.stringify(filtOrder));
  displayList();
};
taskList.addEventListener('click', removeTask);

const editTask = (e) => {
  const clicked = e.target.closest('.list');
  if (!clicked) return;
  clicked.addEventListener('keyup', () => {
    const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
    const listNum = +clicked.dataset.desc;
    const task = tasks.find((task) => task.index === listNum);
    task.description = clicked.value.trim();
    localStorage.setItem('listItems', JSON.stringify(tasks));
  });
};
taskList.addEventListener('click', editTask);

export default displayList;