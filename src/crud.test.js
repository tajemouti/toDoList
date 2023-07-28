import MyTask from './crud.js';

describe('run add test', () => {
  document.body.innerHTML = `
  <div id="container">
    <div class="containers">
      <h1>Today's To Do</h1>
      <button id="refresh" type="button"></button>
    </div>
    <form id="form" class="containers">
      <input id="taskInput" type="text" placeholder="Add to your list..." required>
      <button id="enter" type="submit"></button>
    </form>
    <ul id="tasks"></ul>
    <div class="containers">
      <button id="clear" type="button">Clear all completed</button>
    </div>
  </div>
`;
  const task = 'Repair my RC plane';
  const tasksItem = new MyTask(task);

  test('Should add a task to the list', () => {
    tasksItem.addTask();
    const task = JSON.parse(localStorage.getItem('tasksItem'));
    expect(task.length).toBe(1);
  });

  test('Should remove a task from the list', () => {
    MyTask.removeTask(0);
    const task = JSON.parse(localStorage.getItem('tasksItem'));
    expect(task.length).toBe(0);
  });
});