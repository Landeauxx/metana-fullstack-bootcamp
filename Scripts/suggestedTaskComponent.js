'use strict';
(function () {
  const SEL = '#suggested-list';

  const esc = (s) => String(s || '').replace(/[&<>"']/g, (m) => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]
  ));
  const nowTime = () =>
    new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  function reasonTag(t, moodFilter) {
    const today = new Date().setHours(0, 0, 0, 0);
    const dueTs = t.dueDate ? new Date(t.dueDate).setHours(0, 0, 0, 0) : null;
    if (dueTs !== null && dueTs <= today) return 'Due Today/Overdue';
    if ((t.priority || '').toLowerCase() === 'high') return 'High Priority';
    if (typeof moodFilter === 'number' && Number(t.mood) <= moodFilter) return 'Mood Match';
    return 'Suggested';
  }

  function pickSuggestions(all, moodFilter) {
    const today = new Date().setHours(0, 0, 0, 0);
    return all
      .filter((t) => !t.completed)
      .map((t) => {
        const dueTs = t.dueDate ? new Date(t.dueDate).setHours(0, 0, 0, 0) : null;
        const dueScore  = dueTs !== null && dueTs <= today ? 100 : 0;
        const priScore  = ((t.priority || '').toLowerCase() === 'high') ? 50 : 0;
        const moodScore = (typeof moodFilter === 'number' && Number(t.mood) <= moodFilter) ? 25 : 0;
        return { t, score: dueScore + priScore + moodScore };
      })
      .sort((a, b) => b.score - a.score || a.t.order - b.t.order)
      .slice(0, 3)
      .map((x) => x.t);
  }

  function cardHTML(t, tag) {
    return `
      <article class="suggested-card" data-id="${t.id}">
        <div>
          <p class="task-title">${esc(t.title)}</p>
          <p><strong>${nowTime()}</strong></p>
        </div>
        <div class="suggested-meta">
          <p>Based on</p>
          <p class="suggested-tag">${esc(tag)}</p>
        </div>
      </article>
    `;
  }

  function render() {
    const box = document.querySelector(SEL);
    if (!box) return;

    const all = App.getTasks();     // source of truth
    const moodFilter = null;        // App handles mood filtering of main list; keep tag logic generic
    const picks = pickSuggestions(all, moodFilter);

    box.innerHTML = picks.length
      ? picks.map((t) => cardHTML(t, reasonTag(t, moodFilter))).join('')
      : `<p class="muted">No suggestions yet.</p>`;
  }

  function init() {
    App.on('changed', render);
    render();
  }

  App.registerInit(init);
})();
