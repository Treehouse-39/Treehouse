const express = require('express');

const personController = require('../controllers/personController');

const router = express.Router();

router.get('/',
    personController.getPeople,
    (req, res) => res.sendStatus(200)
)

module.exports = router;
