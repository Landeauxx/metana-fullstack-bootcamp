// module-3/Scripts/index.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('index.js loaded');

  // ====== Shared refs ======
  const modalOverlay = document.querySelector('.modal-overlay');

  // ====== Modal Manager ======
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('active');
    modalOverlay?.classList.add('active');
    // keep hash in URL for deep-linking
    if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('active');
    if (!document.querySelector('.modal.active')) {
      modalOverlay?.classList.remove('active');
      // remove hash
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    modalOverlay?.classList.remove('active');
    history.replaceState(null, '', location.pathname + location.search);
  }

  // Open any modal pointed to by a link like <a href="#login-modal">
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const modal = document.getElementById(id);
    if (!modal || !modal.classList.contains('modal')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      openModal(id);
    });
  });

  // Close via ✕ buttons
  document.querySelectorAll('.modal .modal-close').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const m = btn.closest('.modal');
      if (m?.id) closeModal(m.id);
    });
  });

  // Close via overlay / Esc
  modalOverlay?.addEventListener('click', closeAllModals);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

  // Open if URL already has a hash (e.g., ...#mood-modal)
  function openFromHash() {
    const id = location.hash.replace('#', '');
    if (!id) return;
    const modal = document.getElementById(id);
    if (modal && modal.classList.contains('modal')) openModal(id);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  // ====== Mood slider logic ======
  const moodRange = document.querySelector('#mood-modal .mood-range');
  const moodSave  = document.getElementById('mood-save');
  const moodEmoji = document.querySelector('#mood-chip .mood-emoji');

  function moodEmojiFrom(val) {
    val = Number(val || 50);
    if (val < 34) return '😞';
    if (val < 67) return '😐';
    return '🙂';
  }

  // Load saved mood
  const savedMood = localStorage.getItem('moodValue');
  if (savedMood != null) {
    if (moodRange) moodRange.value = savedMood;
    if (moodEmoji) moodEmoji.textContent = moodEmojiFrom(savedMood);
  }

  // Save mood
  if (moodSave && moodRange && moodEmoji) {
    moodSave.addEventListener('click', e => {
      e.preventDefault();
      const val = moodRange.value;
      localStorage.setItem('moodValue', val);
      moodEmoji.textContent = moodEmojiFrom(val);
      closeModal('mood-modal');
    });
  }

  // ====== Weather modal (explicit buttons still OK) ======
  const weatherChip = document.getElementById('weather-chip');
  const weatherCloseBtn = document.querySelector('#weather-modal .primary-btn');
  weatherChip?.addEventListener('click', e => { e.preventDefault(); openModal('weather-modal'); });
  weatherCloseBtn?.addEventListener('click', () => closeModal('weather-modal'));

  // ====== Tasks ======
  const taskList = document.querySelector('.task-list');
  const completedList = document.querySelector('.completed-list');
  const completedSection = document.getElementById('completed-section');
  const editModal = document.getElementById('editTaskModal');
  const editTitleInput = document.getElementById('edit-title');
  const editTimeInput = document.getElementById('edit-time');
  const editDurationInput = document.getElementById('edit-duration');
  const saveEditBtn = editModal?.querySelector('button[type="submit"]');
  const completeAllBtn = document.getElementById('complete-all-btn');
  const toggleCompletedBtn = document.getElementById('toggle-completed-btn');

  let editingIndex = null;
  let showCompleted = false;

  const defaultTasks = [
    { title: 'Go For a Run', time: '07:30', duration: 30, completed: false },
    { title: 'Do Homework', time: '18:00', duration: 60, completed: false },
    { title: 'Bake Brownies', time: '16:30', duration: 45, completed: false }
  ];

  function loadTasks() {
    if (!taskList || !completedList) return;
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!Array.isArray(tasks)) {
      tasks = defaultTasks;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskList.innerHTML = '';
    completedList.innerHTML = '';

    const incompleteTasks = tasks.filter(t => !t.completed);
    const done = tasks.filter(t => t.completed);

    if (incompleteTasks.length === 0 && done.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No tasks yet. Add one to get started!';
      p.style.color = '#ccc'; p.style.fontStyle = 'italic'; p.style.textAlign = 'center';
      taskList.appendChild(p);
      return;
    }

    incompleteTasks.forEach(task => {
      const idx = tasks.findIndex(t => t.title === task.title && t.time === task.time);
      taskList.appendChild(createTaskCard(task, idx, false));
    });

    done.forEach(task => {
      const idx = tasks.findIndex(t => t.title === task.title && t.time === task.time);
      completedList.appendChild(createTaskCard(task, idx, true));
    });

    if (done.length === 0) {
      completedList.innerHTML = '<p style="color:#ccc;text-align:center;font-style:italic;">No completed tasks yet</p>';
    }
  }

  function createTaskCard(task, index, isCompleted) {
    const card = document.createElement('div');
    card.className = isCompleted ? 'task-card completed-task' : 'task-card';

    const title = document.createElement('h4');
    title.textContent = task.title;

    const time = document.createElement('p');
    const [hStr, minutes] = task.time.split(':');
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    time.textContent = `${h}:${minutes} ${ampm}`;

    const duration = document.createElement('div');
    duration.className = 'task-duration';
    duration.textContent = `${task.duration} mins`;

    const btns = document.createElement('div');
    btns.style.display = 'flex';
    btns.style.gap = '.5rem';
    btns.style.marginTop = '.5rem';

    if (!isCompleted) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.className = 'action-btn';
      completeBtn.addEventListener('click', () => completeTask(index));
      btns.appendChild(completeBtn);
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'action-btn';
    editBtn.addEventListener('click', () => openEditModal(index));
    btns.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'action-btn';
    deleteBtn.addEventListener('click', () => deleteTask(index));
    btns.appendChild(deleteBtn);

    card.append(title, time, duration, btns);
    return card;
  }

  function openEditModal(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];
    if (!task || !editTitleInput || !editTimeInput || !editDurationInput) return;

    editingIndex = index;
    editTitleInput.value = task.title;
    editTimeInput.value = task.time;
    editDurationInput.value = task.duration;
    openModal('editTaskModal');
  }

  function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (!tasks[index]) return;
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  saveEditBtn?.addEventListener('click', e => {
    e.preventDefault();
    const newTitle = editTitleInput?.value.trim();
    const newTime = editTimeInput?.value;
    const newDuration = parseInt(editDurationInput?.value || '0', 10);
    if (!newTitle || !newTime || !newDuration) {
      alert('Please enter all fields.');
      return;
    }
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[editingIndex] = {
      title: newTitle,
      time: newTime,
      duration: newDuration,
      completed: tasks[editingIndex]?.completed || false
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    closeModal('editTaskModal');
  });

  completeAllBtn?.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(t => t.completed = true);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  });

  toggleCompletedBtn?.addEventListener('click', () => {
    showCompleted = !showCompleted;
    if (completedSection) completedSection.style.display = showCompleted ? 'block' : 'none';
    if (toggleCompletedBtn) toggleCompletedBtn.textContent = showCompleted ? 'Hide Completed' : 'Show Completed';
  });

  // ====== Add Task form ======
  const addTaskModal = document.getElementById('addTaskModal');
  const taskTitleInput = addTaskModal?.querySelector('#new-task-title');
  const taskTimeInput = addTaskModal?.querySelector('#new-task-time');
  const taskDurationInput = addTaskModal?.querySelector('#new-task-duration');
  const addTaskBtn = addTaskModal?.querySelector('button[type="submit"]');

  addTaskBtn?.addEventListener('click', e => {
    e.preventDefault();
    const title = taskTitleInput?.value.trim();
    const time = taskTimeInput?.value;
    const duration = parseInt(taskDurationInput?.value || '0', 10);

    if (!title || !time || !duration) {
      alert('Please enter all fields.');
      return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, time, duration, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (taskTitleInput) taskTitleInput.value = '';
    if (taskTimeInput) taskTimeInput.value = '';
    if (taskDurationInput) taskDurationInput.value = '';

    closeModal('addTaskModal');
    window.dispatchEvent(new Event('tasksUpdated'));
  });

  // Re-render when tasks change
  window.addEventListener('tasksUpdated', loadTasks);

  // Initial render
  loadTasks();
});
