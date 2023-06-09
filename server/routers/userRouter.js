const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/createuser', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.result);
});

userRouter.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.result);
});

userRouter.delete('/delete', userController.deleteUser, (req, res) => {
  res.status(200).json('Deleted')
})
userRouter.get('/google/generate', userController.generateOauthURL, (req, res) => {
  res.redirect(res.locals.googleUrl);
});

userRouter.get('/google/callback', userController.handleGoogleResponse, (req, res) => {
  res.sendStatus(200);
});

module.exports = userRouter;
