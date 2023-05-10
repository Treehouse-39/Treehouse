const express = require('express');
const userController = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.post('/createuser', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.result);
});

userRouter.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.result);
});

userRouter.get(
  '/google/callback',
  userController.handleGoogleResponse,
  (req, res) => {
    res.redirect('http://localhost:8080/#/createperson');
  }
);

module.exports = userRouter;
