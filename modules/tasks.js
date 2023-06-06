export default class TODoTasks {
    constructor () {
        this.tasks = [
        {
            id: 0,
            description: 'Wash the dishes',
            completed: false,
        },
        {
            id: 1,
            description: 'complete To Do list project',
            completed: false,
        },
        {
            id: 2,
            description: 'To do today',
            completed: false,
        },
        ]
    }

add (task) {
    task.completed = false;
    task.id = this.tasks.length;
    this.tasks.push(task);
}

remove (id) {
    this.tasks = this.tasks.filter((item) => item.id !== id)
    this.tasks.forEach((item, index) => {
        item.id = index + 1;
    });
}

editDescription(id, newDescription) {
    const task = this.tasks.find((item) => item.id === id);
    if (task) {
        task.description = newDescription;
        return true;
    }
    return false;
}
}
