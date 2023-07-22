import './style.css';
import displayList from './crud.js';
import barDone from './cleardone.js';

const taskList = document.getElementById('tasks');
taskList.addEventListener('click', barDone);

displayList();