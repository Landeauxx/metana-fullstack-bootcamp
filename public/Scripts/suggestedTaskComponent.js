// public/Scripts/suggestedTaskComponent.js
(() => {
  console.log('suggestedTaskComponent.js loaded (mood + weather + mode)');

  const panel = document.querySelector('.suggested-panel');
  if (!panel) return;

  // -------- UI: mode selector --------
  const modeSel = document.getElementById('suggest-mode');
  // restore saved mode
  const savedMode = localStorage.getItem('suggestMode') || 'auto';
  if (modeSel) modeSel.value = savedMode;

  modeSel?.addEventListener('change', () => {
    localStorage.setItem('suggestMode', modeSel.value);
    update();
  });

  // -------- helpers --------
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const cap = s => (s || '').replace(/\b\w/g, m => m.toUpperCase());

  function readMoodLevel() {
    const raw = Number(localStorage.getItem('moodValue'));
    const val = Number.isFinite(raw) ? clamp(raw, 0, 100) : 60;
    if (val < 34) return { level: 'low', emoji: '😞', label: 'Low' };
    if (val < 67) return { level: 'medium', emoji: '😐', label: 'Medium' };
    return { level: 'high', emoji: '🙂', label: 'High' };
  }

  function readWeather() {
    try {
      const cache = JSON.parse(localStorage.getItem('weatherCache') || 'null');
      const d = cache?.data;
      const c = d?.current;
      if (!c) return null;

      const text = (c.condition?.text || '').toLowerCase();
      const w = {
        tempF: c.temp_f,
        windMph: c.wind_mph,
        isDay: !!c.is_day,
        summary: text,
        summaryLabel: cap(text),
        hot: c.temp_f >= 85,
        warm: c.temp_f >= 68 && c.temp_f < 85,
        cool: c.temp_f >= 45 && c.temp_f < 68,
        cold: c.temp_f < 45,
        wet: /rain|drizzle|snow|sleet|storm|thunder/.test(text),
        sunny: /sunny|clear/.test(text),
        windy: c.wind_mph >= 20,
        localtime: d?.location?.localtime || null,
        icon: '☁️'
      };
      w.outdoorOk = !w.wet && !w.cold && w.windMph < 25;
      w.icon = w.wet ? '🌧️' : w.sunny ? '☀️' : '☁️';

      // Mode override
      const mode = (modeSel?.value || 'auto').toLowerCase();
      if (mode !== 'auto') {
        // zero-out then set flags by mode
        Object.assign(w, { wet:false, sunny:false, hot:false, cold:false, windy:false });
        if (mode === 'sunny') { w.sunny = true; w.icon = '☀️'; w.outdoorOk = true; }
        if (mode === 'rainy') { w.wet = true; w.icon = '🌧️'; w.outdoorOk = false; }
        if (mode === 'cloudy') { w.icon = '☁️'; }
        if (mode === 'hot')   { w.hot = true; w.sunny = true; w.icon = '☀️'; w.outdoorOk = true; }
        if (mode === 'cold')  { w.cold = true; w.icon = '❄️'; w.outdoorOk = false; }
        w.summaryLabel = cap(mode);
      }

      return w;
    } catch {
      return null;
    }
  }

  const toClock = d => {
    const h24 = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    let h12 = h24 % 12; if (h12 === 0) h12 = 12;
    return `${h12}:${m} ${ampm}`;
  };

  function clockFromLocal(localtime, minutesAhead = 0) {
    try {
      const [, hm] = (localtime || '').split(' ');
      const [H, M] = (hm || '12:00').split(':').map(Number);
      const d = new Date();
      d.setHours(H, M + minutesAhead, 0, 0);
      return toClock(d);
    } catch { return toClock(new Date()); }
  }

  // -------- suggestion engine --------
  function pickSuggestions(moodState, w) {
    const mood = moodState.level;

    const tasks = [
      { emoji:'🧘', title:'3-minute breathing', mins:3,  tags:['indoor','low','rainOK'] },
      { emoji:'🤸', title:'Light stretching',   mins:5,  tags:['indoor','low'] },
      { emoji:'💧', title:'Hydrate (full glass)',mins:1, tags:['indoor','low','hotOK'] },
      { emoji:'📚', title:'Read a Book',        mins:15, tags:['indoor','low','rainOK'] },
      { emoji:'🧹', title:'Tidy your desk',     mins:5,  tags:['indoor','low'] },

      { emoji:'🚶', title:'Walk outside',       mins:15, tags:['outdoor','medium','sunOK'] },
      { emoji:'📝', title:'Journal',            mins:10, tags:['indoor','medium'] },
      { emoji:'🧘‍♀️',title:'Meditation',        mins:10, tags:['indoor','medium','rainOK'] },
      { emoji:'🧺', title:'Quick laundry',      mins:20, tags:['indoor','medium'] },

      { emoji:'🏃', title:'Run',                mins:20, tags:['outdoor','high','sunOK'] },
      { emoji:'💪', title:'Bodyweight workout', mins:20, tags:['indoor','high'] },
      { emoji:'🚴', title:'Bike ride',          mins:25, tags:['outdoor','high','sunOK'] },
      { emoji:'🧽', title:'Deep clean a room',  mins:20, tags:['indoor','high'] },
    ];

    const moodScore = t => {
      const L=t.tags.includes('low'), M=t.tags.includes('medium'), H=t.tags.includes('high');
      if (mood==='low')  return (L?3:0)+(M?1:0)-(H?2:0);
      if (mood==='high') return (H?3:0)+(M?1:0)-(L?1:0);
      return (M?2:0)+(L?1:0)+(H?1:0);
    };

    const weatherScore = t => {
      if (!w) return 0;
      let s=0;
      const wantsOut=t.tags.includes('outdoor'), wantsIn=t.tags.includes('indoor');
      if (w.outdoorOk && wantsOut) s+=3;
      if (!w.outdoorOk && wantsIn) s+=3;
      if (!w.outdoorOk && wantsOut) s-=3;

      if (w.hot && t.tags.includes('hotOK')) s+=1;
      if (w.sunny && t.tags.includes('sunOK')) s+=1;
      if (w.wet && t.tags.includes('rainOK')) s+=2;
      if (w.cold && wantsOut) s-=2;
      if (w.windy && wantsOut) s-=1;
      return s;
    };

    const ranked = tasks.map(t=>{
      const mS = moodScore(t), wS = weatherScore(t);
      return { ...t, moodScore:mS, weatherScore:wS, score:mS+wS };
    }).sort((a,b)=>b.score-a.score);

    const pick = [];
    const seen = new Set();
    for (const t of ranked) {
      const kind = `${t.tags.includes('indoor')?'in':'out'}-${t.tags.includes('low')?'L':t.tags.includes('medium')?'M':'H'}`;
      if (seen.has(kind) && pick.length < 2) continue;
      pick.push(t);
      seen.add(kind);
      if (pick.length >= 6) break;
    }

    const soon  = w?.localtime ? clockFromLocal(w.localtime, 10) : toClock(new Date());
    const later = w?.localtime ? clockFromLocal(w.localtime, 90) : 'Later today';

    const toCard = (t, when) => {
      if (!t) return null;
      if (w?.wet && t.tags.includes('outdoor')) return null;

      let reasonType='Mood', reasonIcon=moodState.emoji, reasonValue=moodState.label;
      if (Math.abs(t.weatherScore) > Math.abs(t.moodScore) && w) {
        reasonType='Weather'; reasonIcon=w.icon; reasonValue=w.summaryLabel || 'Weather';
      }
      if (w?.hot && t.tags.includes('outdoor') && w.sunny) when='After sunset';

      return { emoji:t.emoji, title:t.title, mins:t.mins, time:when||'Today', reasonType, reasonIcon, reasonValue };
    };

    return [toCard(pick[0], soon), toCard(pick[1], later), toCard(pick[2], later)].filter(Boolean);
  }

  // -------- render --------
  function render(items){
    panel.querySelectorAll('.suggested-card').forEach(n=>n.remove());
    if (!items || !items.length){
      items = [
        { emoji:'📚', title:'Read for 10 minutes', mins:10, time:'Anytime', reasonType:'Mood', reasonIcon:'😐', reasonValue:'Neutral' },
        { emoji:'🧘', title:'3-minute breathing',  mins:3,  time:'Anytime', reasonType:'Mood', reasonIcon:'😐', reasonValue:'Neutral' },
        { emoji:'🚶', title:'Short walk',          mins:10, time:'Later',   reasonType:'Weather', reasonIcon:'☁️', reasonValue:'Weather' }
      ];
    }
    items.slice(0,3).forEach(it=>{
      const el = document.createElement('div');
      el.className = 'suggested-card';
      el.innerHTML = `
        <div class="sugg-left">
          <div class="sugg-title">${it.emoji} <span>${it.title}</span></div>
          <div class="sugg-sub">${it.mins} mins</div>
          <div class="sugg-time"><strong>${it.time}</strong></div>
        </div>
        <div class="sugg-right">
          <div class="sugg-reason-icon">${it.reasonIcon}</div>
          <div class="sugg-reason-label">Based on</div>
          <div class="sugg-reason-value">
            ${it.reasonType === 'Weather' ? `Weather - ${it.reasonValue}` : 'Mood'}
          </div>
          <div class="sugg-ok">✔</div>
        </div>
      `;
      panel.appendChild(el);
    });
  }

  // -------- live updates --------
  function update(){
    const mood = readMoodLevel();
    const w = readWeather();
    render(pickSuggestions(mood, w));
  }

  document.getElementById('mood-save')?.addEventListener('click', ()=>setTimeout(update,0));

  let lastWeatherTime = null;
  setInterval(()=>{
    try{
      const cache = JSON.parse(localStorage.getItem('weatherCache') || 'null');
      const t = cache?.time || null;
      if (t && t !== lastWeatherTime) { lastWeatherTime = t; update(); }
    }catch{}
  }, 15000);

  update();
})();
