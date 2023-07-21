const taskList = document.getElementById('tasks');

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