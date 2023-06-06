import './style.css';

const task = document.getElementsByClassName('tasks')[0];

const tasks = [
  {
    id: 0,
    description: 'Wash the dishes',
    completed: false,
  },
  {
    id: 0,
    description: 'complete To Do list project',
    completed: false,
  },
  {
    id: 0,
    description: 'To do today',
    completed: false,
  },
];

function TaskList() {
  for (let i = 0; i < tasks.length; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card-body');
    card.innerHTML = `
      <ul class="card-sub">
      <li><input type="checkbox" ${tasks[i].completed ? 'checked' : ''}></li>
      <li>${tasks[i].description}<i class="fas fa-ellipsis-v display"></i></li>

      </ul>
 `;
    task.appendChild(card);
  }
}
TaskList();