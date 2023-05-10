const express = require('express');

const personController = require('../controllers/personController');

const router = express.Router();




// Add child from clicking add child button on the card
// Grab that person's ID and label it as parent 1
// If that person has a spouse, grab that ID and label is as parent 2
// call add person method?

// Add parent from clicking button on card
// add person, hold onto that new persons ID (parent ID)
// update the current person card ID, to add the newly created person ID as a parent ID

// Add spouse from clicking button on card
// add person, including the current persons ID as spouse - hold onto that new persons ID (spouse ID)
// update the current person card ID, to add the newly created person ID as a spouse ID

router.get('/getPerson/:firstName/:lastName/:birthday', 
    personController.getPerson,
    (req, res) => res.status(200).json(res.locals)
)
router.get('/',
    personController.getAllPeople,
    (req, res) => res.status(200).json(res.locals)
)

router.post('/addPerson',
    personController.checkPerson,
    personController.addPerson,
    (req, res) => res.sendStatus(200)
)

router.post('/addRelation/:firstName/:lastName/:birthday/:relation', 
    personController.getId,
    personController.checkPerson,
    personController.addPerson,
    (req, res) => res.status(200).json(res.locals)
)

router.post('/addChild/:parentFirstName/:parentLastName/:parentBirthday/:parentSex',
    personController.addChild,
    (req, res) => res.sendStatus(200)
)

router.post('/addTree', personController.addTree, (req, res) => res.sendStatus(200));
module.exports = router;
