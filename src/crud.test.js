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

  test('Should be able to edit the task', () => {
    tasksItem.addTask();
    new MyTask('tasksItem').addTask();
    const editTask = 'Configure the gyroscope';
    MyTask.updateTask(1, editTask);
    const task = JSON.parse(localStorage.getItem('tasksItem'));
    expect(task[1].description).toBe(editTask);
  });

  test('Should update the completed task', () => {
    MyTask.completed(1, true);
    const task = JSON.parse(localStorage.getItem('tasksItem'));
    expect(task[0].completed).toBe(true);
  });
});