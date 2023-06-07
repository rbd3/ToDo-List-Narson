import TODoTasks from './tasks.js';

const task = document.getElementsByClassName('tasks')[0];
let addNew = document.createElement('input');
addNew.type= 'text';
addNew.placeholder= 'Add to your list...';
addNew.classList.add('addNew');
task.appendChild(addNew);
let ulElement = document.createElement('ul');
ulElement.classList.add("card-sub");

const tasks = new TODoTasks();

const clearTaskList = () => {
  // Clear existing tasks
  const ulElement = task.querySelector('.card-sub');
  if (ulElement) {
    ulElement.innerHTML = '';
  }
};

const taskList = () => {
  clearTaskList();

  for (let i = 0; i < tasks.tasks.length; i += 1) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `
      <input type="checkbox" ${tasks.tasks[i].completed ? 'checked' : ''}>
      ${tasks.tasks[i].description}
      <i class="fas fa-ellipsis-v display"></i>
    `;

    ulElement.appendChild(liElement);
    task.appendChild(ulElement);
  }

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
      const newTask = {
        id: tasks.tasks.length,
        description: newTaskDescription,
        completed: false,
      };
      tasks.tasks.push(newTask);
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
  const taskElements = task.querySelectorAll('.card-sub li');
  taskElements.forEach((element) => {
    const checkbox = element.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      element.remove();
      const taskId = Number(element.dataset.taskId);
      tasks.remove(taskId);
    }
  });

  // Update the tasks array
  tasks.tasks = tasks.tasks.filter(task => !task.completed);
};


buttonClear.addEventListener('click', clearCompletedTasks);


export default taskList;
