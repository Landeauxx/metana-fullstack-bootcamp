import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './db/dbconn.js';
import { config } from './config.js';
import { userRouter } from './routes/userRouter.js';
import { blogsRouter } from './routes/blogsRouter.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/blogs', blogsRouter);
app.get('/', (_req, res) => res.json({ status: 'OK', service: 'Metana M5 API' }));

const server = app.listen(config.PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
  try {
    await connectDB();
  } catch (err) {
    console.error('⚠️  DB connection failed:', err.message);
    console.error('   API is still running; fix your MONGO_URI or start MongoDB.');
  }
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
