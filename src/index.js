import './style.css';
import displayList from './crud.js';
import { barDone, clearDone } from './cleardone.js';

const taskList = document.getElementById('tasks');
taskList.addEventListener('click', barDone);

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
  clearDone();
  displayList();
});

displayList();