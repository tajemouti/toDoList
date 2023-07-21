const taskList = document.getElementById('tasks');
const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');

const displayList = () => {
    const tasks = JSON.parse(localStorage.getItem('listItem')) || [];
    if (tasks === null) return;
  
    const sortedList = tasks.slice().sort((a, b) => a.index - b.index);
    taskList.innerHTML = '';
    sortedList.forEach((task) => {
      const list = `
        <div class="task task-${task.index}">
            <input type="checkbox" data-btn="${task.index}">
            <input type="text" class="list" value="${task.description}" data-desc="${task.index}">
            <button class="move" data-remove="${task.index}"></button>
        </div>
    `;
      taskList.insertAdjacentHTML('beforeend', list);
    });
  };

  const saveStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('listItem')) || [];
    const tasksItem = taskInput.value;
    taskInput.value = '';
    if (tasksItem === null) return;
    const task = {
      description: tasksItem,
      completed: false,
      index: tasks.length,
    };
    const filtered = [...tasks, task];
    localStorage.setItem('listItem', JSON.stringify(filtered));
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveStorage();
    displayList();
  });

  