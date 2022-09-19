import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import 'express-async-errors';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

const __dirname = dirname(fileURLToPath(import.meta.url));

// db and authenticate user
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

//
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

const app = express();
app.use(express.json());

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(express.static(path.resolve(__dirname, './client/build')));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: 'Too many requests, try after 15 minutes',
});

app.get('/api/v1/', (req, res) => {
  res.json({ msg: 'api' });
});

app.use('/api/v1/auth', limiter, authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(__dirname, './client/build', 'index.html');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log('server runnning on http://localhost:' + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
