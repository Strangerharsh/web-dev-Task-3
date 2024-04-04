
  // Retrieve existing tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const todoList = document.getElementById('todo-list');
  const taskInput = document.getElementById('task-input');

  // Function to render tasks
  function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task}</span>
        <button class="edit-button" data-index="${index}">Edit</button>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskInput.value = '';
    }
  }

  // Function to edit a task
  function editTask(index) {
    const newTaskText = prompt('Edit task:', tasks[index]);
    if (newTaskText !== null) {
      tasks[index] = newTaskText.trim();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }

  // Function to delete a task
  function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }

  // Event listeners
  document.getElementById('add-button').addEventListener('click', addTask);
  todoList.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-button')) {
      editTask(parseInt(e.target.getAttribute('data-index')));
    } else if (e.target.classList.contains('delete-button')) {
      deleteTask(parseInt(e.target.getAttribute('data-index')));
    }
  });

  // Initial render
  renderTasks();
