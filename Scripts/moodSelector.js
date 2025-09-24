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

  const syncFill = () => {
    const p = (range.value - range.min) * 100 / (range.max - range.min);
    range.style.setProperty('--val', p + '%');
  };

  range.addEventListener('input', syncFill);
  syncFill();

  saveBtn.addEventListener('click', () => {
    chipEmoji.textContent = emojiFor(range.value);
    document.getElementById('mood-modal')?.classList.remove('active');
    document.querySelector('.modal-overlay')?.classList.remove('active');
  });
});
