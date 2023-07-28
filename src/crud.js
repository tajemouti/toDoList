export default class MyTask {
  constructor(description) {
    this.description = description;
  }

  static clearInput = () => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = '';
    return true;
  }

  static getTask = () => {
    let listItem = [];
    const task = localStorage.getItem('tasksItem');
    if (task === null) {
      localStorage.setItem('tasksItem', JSON.stringify(listItem));
    }
    listItem = JSON.parse(localStorage.getItem('tasksItem'));
    return listItem;
  }

  static getIndex = () => {
    const listItem = MyTask.getTask();
    let index = 0;
    if (listItem === null) {
      return index + 1;
    }
    index = listItem.length + 1;
    return index;
  }

  static updateIndex = () => {
    const listItem = MyTask.getTask();
    listItem.forEach((item) => {
      const count = listItem.findIndex((obj) => obj === item);
      item.index = count + 1;
    });
    localStorage.setItem('tasksItem', JSON.stringify(listItem));
  }

  addTask = () => {
    const task = MyTask.getTask();
    const index = MyTask.getIndex();
    const tasksItem = {
      index,
      description: this.description,
      completed: false,
    };

    if (task === null) {
      task.push(tasksItem);
      localStorage.setItem('tasksItem', JSON.stringify(task));
    }
    let newlistItem = JSON.parse(localStorage.getItem('tasksItem'));
    newlistItem = [...task, tasksItem];
    localStorage.setItem('tasksItem', JSON.stringify(newlistItem));
    MyTask.clearInput();
    MyTask.displayList();
    MyTask.updateIndex();
  }

  static displayList() {
    const listItem = MyTask.getTask();
    const taskList = document.getElementById('tasks');
    let list = '';
    listItem.forEach((tasksItem) => {
      list += `<li class="task">
                <input type="checkbox" id="${tasksItem.index}" class="checkbox">  
                <input type="text" class="list" value="${tasksItem.description}">
                <button class="move"></button>
              </li>`;
    });
    taskList.innerHTML = list;
    MyTask.addEventListenersToListItems();
    MyTask.updateIndex();
    MyTask.checkedTask();
  }

  static removeTask = (index) => {
    const listItem = MyTask.getTask();
    listItem.splice(index, 1);
    localStorage.setItem('tasksItem', JSON.stringify(listItem));
    MyTask.addEventListenersToListItems();
    MyTask.displayList();
    MyTask.updateIndex();
  }

  static updateTask = (index, value) => {
    const listItem = MyTask.getTask();
    listItem.forEach((item) => {
      const count = listItem.findIndex((obj) => obj === item);
      if (index === count) {
        item.description = value;
      }
      localStorage.setItem('tasksItem', JSON.stringify(listItem));
    });
    MyTask.updateIndex();
  }

  static completed = (index, value) => {
    const listItem = MyTask.getTask();
    listItem[index - 1].completed = value;
    localStorage.setItem('tasksItem', JSON.stringify(listItem));
    MyTask.updateIndex();
  }

  static clearCompleted = () => {
    const listItem = MyTask.getTask();
    const uncompleted = listItem.filter((tasksItem) => tasksItem.completed === false);
    localStorage.setItem('tasksItem', JSON.stringify(uncompleted));
    MyTask.displayList();
  }

  static checkedTask = () => {
    const listItem = MyTask.getTask();
    listItem.forEach((item) => {
      if (item.completed === true) {
        document.querySelector(`#\\3${item.index}`).checked = true;
        document.querySelector(`#\\3${item.index}`).nextElementSibling.classList.toggle('cross');
      }
    });
  }

  static refresh = () => {
    window.location.reload();
  }

  static addEventListenersToListItems = () => {
    document.querySelectorAll('.checkbox').forEach((link) => {
      link.addEventListener('click', (e) => {
        link.nextElementSibling.classList.toggle('cross');
        MyTask.completed(link.id, e.target.checked);
      });
    });
    document.querySelectorAll('.list').forEach((link, index) => {
      link.addEventListener('keyup', (e) => {
        e.preventDefault();
        MyTask.updateTask(index, e.target.value);
      });
    });
    document.querySelectorAll('.move').forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        MyTask.removeTask(index);
      });
    });
  };
}