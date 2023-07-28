import MyTask from './crud.js';
import './style.css';

const taskInput = document.getElementById('taskInput');
const enterBtn = document.getElementById('enter');
const refreshBtn = document.getElementById('refresh');

MyTask.displayList();

taskInput.addEventListener('click', (e) => {
  e.preventDefault();
});

enterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (taskInput.value) {
    const description = taskInput.value;
    const done = new MyTask(description);
    done.addTask();
  }
  return 0;
});

document.querySelectorAll('#clear').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    MyTask.clearCompleted();
  });
});

refreshBtn.addEventListener('click', (e) => {
  e.preventDefault();
  MyTask.refresh();
});