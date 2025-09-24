document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  const loginModal = document.getElementById('login-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const welcomeText = document.querySelector('.welcome p');

  if (!loginForm || !loginModal || !welcomeText || !modalOverlay) return;

  const closeModal = () => {
    loginModal.classList.remove('active');
    modalOverlay.classList.remove('active');
  };

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('login-name')?.value.trim();
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!name || !email || !password) {
      alert('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ name, email }));
    welcomeText.innerHTML = `<strong>Welcome</strong><br />${name}`;
    closeModal();
  });

  loginModal.querySelector('.modal-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });
});
