import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import createError from 'http-errors';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import catalogRouter from './routes/catalog.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from React app build
app.use(express.static(path.join(process.cwd(), 'client', 'build')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api', catalogRouter);

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message, error: req.app.get('env') === 'development' ? err : {} });
});

export default app;