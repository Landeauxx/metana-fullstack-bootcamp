document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.querySelector('.task-list');
  const completedList = document.querySelector('.completed-list');
  const completedSection = document.getElementById('completed-section');
  const editModal = document.getElementById('editTaskModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const editTitleInput = document.getElementById('edit-title');
  const editTimeInput = document.getElementById('edit-time');
  const editDurationInput = document.getElementById('edit-duration');
  const saveEditBtn = editModal?.querySelector('button[type="submit"]');
  const completeAllBtn = document.getElementById('complete-all-btn');
  const toggleCompletedBtn = document.getElementById('toggle-completed-btn');

  if (!taskList || !editModal || !editTitleInput || !editTimeInput || !saveEditBtn || !modalOverlay) return;

  let editingIndex = null;
  let showCompleted = false;

  const defaultTasks = [
    { title: 'Go For a Run', time: '07:30', duration: 30, completed: false },
    { title: 'Do Homework', time: '18:00', duration: 60, completed: false },
    { title: 'Bake Brownies', time: '16:30', duration: 45, completed: false }
  ];

  const openModal = (modalId) => {
    document.getElementById(modalId)?.classList.add('active');
    modalOverlay.classList.add('active');
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId)?.classList.remove('active');
    modalOverlay.classList.remove('active');
  };

  const loadTasks = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!Array.isArray(tasks)) {
      tasks = defaultTasks;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskList.innerHTML = '';
    completedList.innerHTML = '';

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    if (incompleteTasks.length === 0 && completedTasks.length === 0) {
      taskList.innerHTML = '<p class="empty-message">No tasks yet. Add one to get started!</p>';
      return;
    }

    incompleteTasks.forEach((task, index) => {
      const actualIndex = tasks.findIndex(t => t.title === task.title && t.time === task.time);
      taskList.appendChild(createTaskCard(task, actualIndex, false));
    });

    completedTasks.forEach((task, index) => {
      const actualIndex = tasks.findIndex(t => t.title === task.title && t.time === task.time);
      completedList.appendChild(createTaskCard(task, actualIndex, true));
    });

    if (completedTasks.length === 0) {
      completedList.innerHTML = '<p class="empty-message">No completed tasks yet</p>';
    }
  };

  const createTaskCard = (task, index, isCompleted) => {
    const card = document.createElement('div');
    card.className = isCompleted ? 'task-card completed-task' : 'task-card';

    const title = document.createElement('h4');
    title.textContent = task.title;

    const time = document.createElement('p');
    const [hour, minute] = task.time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    time.textContent = `${displayHour}:${minute} ${ampm}`;

    const duration = document.createElement('div');
    duration.className = 'task-duration';
    duration.textContent = `${task.duration} mins`;

    const buttons = document.createElement('div');
    buttons.style.display = 'flex';
    buttons.style.gap = '0.5rem';
    buttons.style.marginTop = '0.5rem';

    if (!isCompleted) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.className = 'action-btn';
      completeBtn.addEventListener('click', () => completeTask(index));
      buttons.appendChild(completeBtn);
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'action-btn';
    editBtn.addEventListener('click', () => openEditModal(index));
    buttons.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'action-btn';
    deleteBtn.addEventListener('click', () => deleteTask(index));
    buttons.appendChild(deleteBtn);

    card.append(title, time, duration, buttons);
    return card;
  };

  const openEditModal = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];
    editingIndex = index;
    editTitleInput.value = task.title;
    editTimeInput.value = task.time;
    editDurationInput.value = task.duration;
    openModal('editTaskModal');
  };

  saveEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newTitle = editTitleInput.value.trim();
    const newTime = editTimeInput.value;
    const newDuration = parseInt(editDurationInput.value);
    if (!newTitle || !newTime || !newDuration) {
      alert('Please enter all fields.');
      return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[editingIndex] = {
      title: newTitle,
      time: newTime,
      duration: newDuration,
      completed: tasks[editingIndex].completed
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    closeModal('editTaskModal');
  });

  modalOverlay.addEventListener('click', () => {
    closeModal('editTaskModal');
  });

  const completeTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  };

  const deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  };

  completeAllBtn.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => task.completed = true);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  });

  toggleCompletedBtn.addEventListener('click', () => {
    showCompleted = !showCompleted;
    completedSection.style.display = showCompleted ? 'block' : 'none';
    toggleCompletedBtn.textContent = showCompleted ? 'Hide Completed' : 'Show Completed';
  });

  loadTasks();
  window.addEventListener('tasksUpdated', loadTasks);
});
