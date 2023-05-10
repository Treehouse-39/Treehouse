const db = require('../models/treehouseModels.js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userController = {
  async createUser(req, res, next) {
    const { username, password, family_name } = req.body;
    // check if fields are missing

    if (
      username == undefined ||
      password == undefined ||
      family_name == undefined
    ) {
      return next({
        log: 'Error missing required fields in userController.createUser',
        status: 400,
        message: { err: 'Unable to create user. Missing required fields' },
      });
    }
    // Use bcrypt to hash the provided password
    const hash = await bcrypt.hash(password, 5);

    const queryString = `INSERT INTO tree (username, password, family_name) VALUES ('${username}', '${hash}', '${family_name}') RETURNING *;`;

    try {
      const { rows } = await db.query(queryString);
      res.locals.result = rows[0].id;
      return next();
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

    const queryString = `SELECT * FROM tree WHERE username = '${username}';`;

    try {
      const { rows } = await db.query(queryString);

      if (!rows.length)
        return next({
          log: 'Error username does not exist',
          status: 400,
          message: { err: 'Incorrect Username or Password' },
        });

      const match = await bcrypt.compare(password, rows[0].password);

      if (match) {
        res.locals.result = rows[0].id;
        return next();
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

  handleGoogleResponse(req, res, next) {
    // Parse the access code from the request
    const { code } = req.query;
    console.log('code', code);

    // Define the response object
    const properties = {
      email: null,
      birthday: null,
      firstName: null,
      lastName: null,
    };

    // Retrieve the users access token

    const data = {
      code,
      client_id: process.env.googleClientId,
      client_secret: process.env.googleSecret,
      redirect_uri: 'http://localhost:3000/user/google/callback',
      grant_type: 'authorization_code',
    };

    const getToken = async () => {
      try {
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseClean = await response.json();
        const birthday = await getBirthday(
          responseClean.id_token,
          responseClean.access_token
        );
        console.log('birthday in gettoken', birthday)
        return next();
      } catch (err) {
        console.log('err from google', err);
        return next({
          log: 'Error retrieving email from Google',
          status: 400,
          message: { err: 'Unable to retrieve email from Google.' },
        });
      }
    };

    // Once you have the access token, get the users birthday
    const getBirthday = async (id_token, access_token) => {
      console.log(id_token)
      console.log(access_token)
      try {
        const birthday = await fetch(
          `https://people.googleapis.com/v1/people/me?personFields=birthdays`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const birthdayClean = await birthday.json();

        // Parse the birthday from an object to a string
        let birthdayParsed = '';
        for(let key in birthdayClean.birthdays[0].date) {
          if(key === 'year') birthdayParsed = birthdayParsed + birthdayClean.birthdays[0].date[key];
          else birthdayParsed = birthdayParsed + '-' + birthdayClean.birthdays[0].date[key]
        }
        res.locals.birthday = birthdayParsed;
        console.log('res.locals.birthday', res.locals.birthday);
      } catch (err) {
        console.log('err from google', err);
        return next({
          log: 'Error retrieving birthday from Google',
          status: 400,
          message: { err: 'Unable to retrieve birthday from Google.' },
        });
      }
    };

    

    getToken();
  },
};

module.exports = userController;
