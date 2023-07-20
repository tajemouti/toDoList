import './styles/style.css';

const taskList = document.getElementById('tasks');

const tasks = [
  {
    description: 'Buy a new motor for the RC plane',
    completed: false,
    index: 0,
  },
  {
    description: 'Mount the RC motor',
    completed: false,
    index: 1,
  },
  {
    description: 'Configure the gyroscope',
    completed: false,
    index: 2,
  },
  {
    description: 'Test the RC plane before flight',
    completed: false,
    index: 3,
  },
  {
    description: 'Fly the RC plane',
    completed: false,
    index: 4,
  },
];

tasks.forEach((task) => {
    const list = `
      <div class="task">
          <input type="checkbox">
          <div class="list">${task.description}</div>
          <button class="move" type="button"></button>
      <div>
    `;
    taskList.insertAdjacentHTML('beforeend', list);
  });