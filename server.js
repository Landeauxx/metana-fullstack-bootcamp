const path = require('path');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.WEATHER_API_KEY;

// Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: [
    path.join(__dirname, 'views', 'partials'),
    path.join(__dirname, 'views', 'partials', 'components'),
    path.join(__dirname, 'views', 'partials', 'modals'),
  ],
  helpers: {
    eq: (a, b) => a === b,
    year: () => new Date().getFullYear(),
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static assets
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (_req, res) => {
  res.render('index', { title: 'Todo App' });
});

// Weather proxy
app.get('/api/weather', async (req, res) => {
  try {
    if (!API_KEY) return res.status(500).json({ error: 'Server missing WEATHER_API_KEY' });

    const { lat, lon, q } = req.query;
    const query = (lat && lon) ? `${lat},${lon}` : (q ? String(q) : 'auto:ip');

    const url = new URL('https://api.weatherapi.com/v1/current.json');
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('q', query);
    url.searchParams.set('aqi', 'no');

    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy failure', detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
