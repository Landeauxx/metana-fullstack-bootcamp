document.addEventListener('DOMContentLoaded', () => {
  const range = document.querySelector('.mood-range');
  const chipEmoji = document.querySelector('#mood-chip .mood-emoji');
  const saveBtn = document.getElementById('mood-save');

  if (!range || !chipEmoji || !saveBtn) return;

  const emojiFor = (v) => {
    const p = (v - range.min) * 100 / (range.max - range.min);
    if (p <= 33) return '😞';
    if (p <= 66) return '😐';
    return '🙂';
  };

  const setCookie = (name, value, days=1) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
  };
  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const c of cookies) {
      const [k, v] = c.split('=');
      if (decodeURIComponent(k) === name) return decodeURIComponent(v);
    }
    return null;
  };

  const saved = getCookie('moodValue');
  if (saved) {
    range.value = saved;
    chipEmoji.textContent = emojiFor(saved);
  }

  const syncFill = () => {
    const p = (range.value - range.min) * 100 / (range.max - range.min);
    range.style.setProperty('--val', `${p}%`);
  };
  range.addEventListener('input', syncFill);
  syncFill();

  // Save to cookie
  saveBtn.addEventListener('click', () => {
    chipEmoji.textContent = emojiFor(range.value);
    setCookie('moodValue', range.value, 1);
    document.getElementById('mood-modal')?.classList.remove('active');
    document.querySelector('.modal-overlay')?.classList.remove('active');
    window.dispatchEvent(new Event('moodUpdated'));
  });
});
