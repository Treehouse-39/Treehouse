const db = require('./userModel.js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userController = {
  async createUser(req, res, next) {
    const { username, password, familyName } = req.body;
    // check if fields are missing
    if (
      username == undefined ||
      password == undefined ||
      familyName == undefined
    ) {
      return next({
        log: 'Error missing required fields in userController.createUser',
        status: 400,
        message: { err: 'Unable to create user. Missing required fields' },
      });
    }
    // Use bcrypt to hash the provided password
    const hash = bcrypt.hash(password, 5);

    const queryString = `INSERT INTO tree (username, password, family_name), (${username}, ${hash}, ${familyName})`;

    try {
      const { rows } = await db.query(queryString);
      res.locals.result = rows[0].id;
    } catch {
      return next({
        log: 'Error creating user in database',
        status: 400,
        message: { err: 'Unable to create user. Please try again' },
      });
    }
  },

  async verifyUser(req, res, next) {
    const { username, password } = req.body;
    // check if fields are missing
    if (username == undefined || password == undefined) {
      return next({
        log: 'Error missing required fields in userController.verifyUser',
        status: 400,
        message: { err: 'Unable to verify user. Missing required fields' },
      });
    }

    const queryString = `SELECT * FROM users WHERE username = ${username}`;

    try {
      const { rows } = await db.query(queryString);
      const match = bcrypt.hash(password, rows[0].password);
      if (match) {
        res.locals.result = rows[0].id;
      } else {
        return next({
          log: 'Error passwords do not match',
          status: 400,
          message: { err: 'Incorrect Username or Password' },
        });
      }
    } catch {
      return next({
        log: 'Error verifying user in database',
        status: 400,
        message: { err: 'Unable to verify user. Please try again' },
      });
    }
  },
};

module.exports = userController;
