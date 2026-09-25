import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import config from './config.js';
import usersRouter from './routes/userRouter.js';
import blogsRouter from './routes/blogsRouter.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Development-only API check
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.json({
      ok: true,
      service: 'module-6-api',
      ts: new Date().toISOString()
    });
  });
}

// API routes
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

// Serve React production build
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/build');

  app.use(express.static(clientBuildPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    res.sendFile(
      path.join(clientBuildPath, 'index.html')
    );
  });
}

// Error handler
app.use((err, req, res, _next) => {
  console.error(err);

  res.status(500).json({
    ok: false,
    error: 'Internal Server Error'
  });
});

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});