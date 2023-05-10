const express = require('express');
const path = require('path');
const userRouter = require('./routers/userRouter.js');
const dotenv = require('dotenv').config();
const apiRouter = require('./routers/api.js');
var cors = require('cors');

const app = express();
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/user', userRouter);
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
} else {
  app.get('/home', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../index.html'))
  );
}

// 404 Not Found
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = app;
