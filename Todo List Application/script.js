// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
console.log(tasks);

// Render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the existing list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        // Checkbox for task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.style.marginRight = '5px';
        checkbox.addEventListener('change', () => toggleTask(index));

        // Task text
        const taskText = document.createElement('span');
        taskText.classList.add('textspan');
        taskText.textContent = task.text;
        if (task.completed) taskText.classList.add('completed');

        // Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            editTask(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        // Append elements
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

// Add new task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
});

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const listItem = taskList.children[index];
    const currentText = tasks[index].text;

    // Prevent duplicate input or save button
    if (listItem.querySelector('.editInput') || listItem.querySelector('.savebtn')) return;

    const inputField = document.createElement('input');
    inputField.className = 'editInput';
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.addEventListener('click', (e) => e.stopPropagation());

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('savebtn');
    saveButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const newTaskText = inputField.value;
        if (newTaskText) {
            tasks[index].text = newTaskText;
            saveTasks();
            renderTasks();
        }
    });

    // Replace task text with input and add save button
    listItem.firstChild.replaceWith(inputField);
    listItem.appendChild(saveButton);
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial render
renderTasks();
