import TODoTasks from './tasks.js';

const task = document.getElementsByClassName('tasks')[0];
let addNew = document.createElement('input');
addNew.type= 'text';
addNew.placeholder= 'Add to your list...';
addNew.classList.add('addNew');
task.appendChild(addNew);
let ulElement = document.createElement('ul');
ulElement.classList.add("card-sub");

var tasks = new TODoTasks();

// Clear existing tasks
const clearTaskList = () => {
  const ulElement = task.querySelector('.card-sub');
  if (ulElement) {
    ulElement.innerHTML = '';
  }
};

// Generate list
const taskList = () => {
  clearTaskList();

  tasks.tasks.forEach((task) => {
    const liElement = document.createElement('li');
    liElement.dataset.taskId = task.id; // Add the task id as a data attribute
    liElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      ${task.description}
      <i class="fas fa-ellipsis-v display"></i>
    `;

    ulElement.appendChild(liElement);
  });

  task.appendChild(ulElement);
  localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
};

const buttonClear = document.createElement("button");
buttonClear.type = 'button';
buttonClear.classList.add("button-clear");
buttonClear.textContent  = 'Clear All Completed!';
document.body.appendChild(buttonClear);

const addTask = () => {
  const newTaskDescription = addNew.value.trim();
  if (newTaskDescription !== '') {
    const existingTask = tasks.tasks.find(task => task.description === newTaskDescription);
    if (!existingTask) {
      const lastTaskId = tasks.tasks.length > 0 ? tasks.tasks[tasks.tasks.length - 1].id : -1;
      const newTask = {
        id: lastTaskId + 1, // Generate a new unique id
        description: newTaskDescription,
        completed: false,
      };
      tasks.tasks.push(newTask);
      clearTaskList();
      taskList();
      addNew.value = '';
    }
  }
};


addNew.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    addTask();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  taskList();
});

const clearCompletedTasks = () => {
  const taskElements = ulElement.querySelectorAll('li');
  const updatedTasks = [];

  taskElements.forEach((element) => {
    const checkbox = element.querySelector('input[type="checkbox"]');
    if (!checkbox.checked) {
      const taskId = Number(element.dataset.taskId);
      updatedTasks.push(tasks.tasks.find(task => task.id === taskId));
    }
  });

  // Update the tasks array
  tasks.tasks = updatedTasks;
  clearTaskList();
  taskList();
  localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
};

buttonClear.addEventListener('click', clearCompletedTasks);

export default taskList;
