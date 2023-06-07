import TODoTasks from './tasks.js';

const task = document.getElementsByClassName('tasks')[0];
const tasks = new TODoTasks();

const TaskList = () => {
  for (let i = 0; i < tasks.tasks.length; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card-body');
    card.innerHTML = `
      <ul class="card-sub">
        <li><input type="checkbox" ${tasks.tasks[i].completed ? 'checked' : ''}></li>
        <li>${tasks.tasks[i].description}<i class="fas fa-ellipsis-v display"></i></li>
      </ul>
    `;
    task.appendChild(card);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
};

export default TaskList;
