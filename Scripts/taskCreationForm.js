document.addEventListener('DOMContentLoaded', () => {
  const addTaskModal = document.getElementById('addTaskModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const taskTitleInput = document.getElementById('new-task-title');
  const taskTimeInput = document.getElementById('new-task-time');
  const taskDurationInput = document.getElementById('new-task-duration');
  const addTaskBtn = addTaskModal?.querySelector('button[type="submit"]');

  if (!addTaskModal || !taskTitleInput || !taskTimeInput || !taskDurationInput || !addTaskBtn || !modalOverlay) return;

  const closeModal = () => {
    addTaskModal.classList.remove('active');
    modalOverlay.classList.remove('active');
  };

  addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const time = taskTimeInput.value;
    const duration = parseInt(taskDurationInput.value);

    if (!title || !time || !duration) {
      alert('Please enter all fields.');
      return;
    }

    const newTask = { title, time, duration, completed: false };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskTitleInput.value = '';
    taskTimeInput.value = '';
    taskDurationInput.value = '';

    closeModal();
    window.dispatchEvent(new Event('tasksUpdated'));
  });

  modalOverlay.addEventListener('click', () => {
    closeModal();
  });
});
