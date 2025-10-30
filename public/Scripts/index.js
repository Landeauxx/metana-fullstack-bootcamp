document.addEventListener('DOMContentLoaded', () => {
  console.log('index.js loaded');

  // ===== Modal manager =====
  const modalOverlay = document.querySelector('.modal-overlay');

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('active');
    modalOverlay?.classList.add('active');
    if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('active');
    if (!document.querySelector('.modal.active')) {
      modalOverlay?.classList.remove('active');
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    modalOverlay?.classList.remove('active');
    history.replaceState(null, '', location.pathname + location.search);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const modal = document.getElementById(id);
    if (!modal || !modal.classList.contains('modal')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      openModal(id);
    });
  });

  document.querySelectorAll('.modal .modal-close').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const m = btn.closest('.modal');
      if (m?.id) closeModal(m.id);
    });
  });

  modalOverlay?.addEventListener('click', closeAllModals);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

  function openFromHash() {
    const id = location.hash.replace('#', '');
    if (!id) return;
    const modal = document.getElementById(id);
    if (modal && modal.classList.contains('modal')) openModal(id);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  // ===== Mood chip =====
  const chipEmoji = document.querySelector('#mood-chip .mood-emoji');
  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const c of cookies) {
      const [k, v] = c.split('=');
      if (decodeURIComponent(k) === name) return decodeURIComponent(v || '');
    }
    return null;
  };
  const emojiFor = (val, min=0, max=100) => {
    val = Number(val ?? 50);
    const p = (val - min) * 100 / (max - min);
    if (p <= 33) return '😞';
    if (p <= 66) return '😐';
    return '🙂';
  };
  const savedMood = getCookie('moodValue');
  if (chipEmoji && savedMood != null) chipEmoji.textContent = emojiFor(savedMood);

  // Weather 
  const weatherChip = document.getElementById('weather-chip');

  const API_BASES = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ];

  function setText(sel, text){ const el=document.querySelector(sel); if(el) el.textContent=text; }
  function setLoading(on=true){
    const v=on?'Loading…':'—';
    ['#weather-temp','#weather-condition','#weather-humidity','#weather-wind'].forEach(s=>setText(s,v));
  }
  const cachedWeatherIsFresh = (c) => !!c && (Date.now()-c.time) < 10*60*1000;

  function getCoords(){
    return new Promise(res=>{
      if(!navigator.geolocation) return res(null);
      navigator.geolocation.getCurrentPosition(
        p=>res({lat:p.coords.latitude, lon:p.coords.longitude}),
        ()=>res(null),
        {timeout:8000, maximumAge:60000}
      );
    });
  }

  async function fetchFrom(base, coords){
    let url = `${base}/api/weather`;
    if (coords?.lat && coords?.lon) {
      const p = new URLSearchParams({ lat: coords.lat, lon: coords.lon });
      url += `?${p.toString()}`;
    } else {
      url += `?q=auto:ip`;
    }
    const r = await fetch(url, { headers:{ Accept:'application/json' } });
    if (!r.ok) throw new Error(`Weather proxy failed: ${r.status}`);
    return r.json();
  }

  async function fetchWeather(coords){
    let lastErr;
    for (const base of API_BASES) {
      try { return await fetchFrom(base, coords); }
      catch (e) { lastErr = e; }
    }
    throw lastErr || new Error('All weather endpoints failed');
  }

  function renderWeather(d){
    const c = d?.current;
    if(!c) throw new Error('Weather payload missing "current"');
    setText('#weather-temp', `${Math.round(c.temp_f)}°F`);
    setText('#weather-condition', c.condition?.text ?? '—');
    setText('#weather-humidity', `${c.humidity}%`);
    setText('#weather-wind', `${Math.round(c.wind_mph)} mph`);
  }

  async function initWeather({force=false}={}){
    try{
      const cache = JSON.parse(localStorage.getItem('weatherCache')||'null');
      if(!force && cachedWeatherIsFresh(cache)){ renderWeather(cache.data); return; }
      setLoading(true);
      const coords = await getCoords();                 // may be null if blocked
      const data = await fetchWeather(coords);          // server handles q=auto:ip
      renderWeather(data);
      localStorage.setItem('weatherCache', JSON.stringify({time:Date.now(), data}));
    }catch(err){
      console.error('[weather]', err);
      setText('#weather-temp','—'); setText('#weather-condition','Unavailable');
      setText('#weather-humidity','—'); setText('#weather-wind','—');
    }
  }

  weatherChip?.addEventListener('click', e => {
    e.preventDefault();
    initWeather();
    openModal('weather-modal');
  });

  initWeather();
});
