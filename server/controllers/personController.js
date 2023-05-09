const db = require('../models/treehouseModels')

const personController = {};

// Query the database to retrieve all entries
// Will return.....
personController.getAllPeople = async(req, res, next) => {
    try {
        const queryString = 'SELECT * FROM people';
        const response = await db.query(queryString);
        console.log(response);
        res.locals.people = response.rows
        return next();
    } catch(err){
        next({log: 'asdfasdfasd', message: `error: ${err}`});
    }
}

// Create a new tree 
// Create a new account with username and password
personController.addTree = async (req, res, next) => {
    try {
        console.log('adding tree')
        const { username, password, family_name } = req.body;
        const data = [username, password, family_name];
        console.log(data);
        const queryString = `INSERT INTO tree (username, password, family_name) VALUES ($1, $2, $3)`;
        db.query(queryString, data);
        return next();
    } catch (err){
        console.log(err);
        next({log: 'Error in personController.addTree', message: `error: ${err}`});
    }

}

// Getting the ID from an existing card/person
// Also determine relation (spouse, mom, dad) from card
personController.getId = async (req, res, next) => {
    try {
        const { firstName, lastName, birthday, relation } = req.params;
        const getIdQuery = `SELECT id FROM people WHERE first_name='${firstName}' AND last_name='${lastName}' AND birthday='${birthday}'`;
        const existingId = await db.query(getIdQuery);
        if (relation === 'spouse'){
            res.locals.spouseId = existingId.rows[0].id;
        } else if (relation === 'mom') {
            res.locals.momId = existingId.rows[0].id;
        } else if (relation === 'dad') {
            res.locals.dadId = existingId.rows[0].id;
        }
        return next()
    } catch (err){
        next({log: 'Error in personController.getId', message: `error: ${err}`})
    }
}


// Check if the person exists in the database already before adding a new one
// check first name, last name, birthday
personController.checkPerson = async (req, res, next) => {
     try {
        const { firstName, lastName, birthday } = req.body;
        const preCheckQuery = `SELECT id, first_name, last_name FROM people WHERE birthday='${birthday}'`;
        const preCheck = await db.query(preCheckQuery);
        if (preCheck.rows && preCheck.rows.length){
            preCheck.rows.forEach(el => {
                if (el.first_name === firstName && el.last_name === lastName) {
                    console.log('Person already exists');
                    res.locals.exists = el.id;
                }
            });
        }
        return next();
    } catch (err){
        next({log: 'Error in personController.checkPerson', message: `error: ${err}`});
    }
}

// Add a person into DB
// first and last name, birthday - required
// parent, child, other info....optional
personController.addPerson = async (req, res, next) => {
    if (!res.locals.exists){
        try {
            let data;
            let queryString;
            const { familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, 
                streetAddress, city, state, zipCode } = req.body;
            if (res.locals.spouseId){
                const {spouseId} = res.locals;
                data = [familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, streetAddress, city, state, zipCode, spouseId];        
                queryString = `INSERT INTO people (family_tree, first_name, last_name, sex, phone_number, email, birthday, death_date, street_address, city, state, zip_code, spouse_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`;

            } else if (res.locals.momId){
                const {momId} = res.locals;
                data = [familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, streetAddress, city, state, zipCode, momId];        
                queryString = `INSERT INTO people (family_tree, first_name, last_name, sex, phone_number, email, birthday, death_date, street_address, city, state, zip_code, mom_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`;

            } else if (res.locals.dadId){
                const {dadId} = res.locals;
                data = [familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, streetAddress, city, state, zipCode, dadId];        
                queryString = `INSERT INTO people (family_tree, first_name, last_name, sex, phone_number, email, birthday, death_date, street_address, city, state, zip_code, dad_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`;

            } else {
                data = [familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, streetAddress, city, state, zipCode];        
                queryString = `INSERT INTO people (family_tree, first_name, last_name, sex, phone_number, email, birthday, death_date, street_address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`;

            }
            // newID = new person created ID
            let newId = await db.query(queryString, data);
            newId = newId.rows[0].id;
            // spouse = original card person ID 
            if (res.locals.spouseId){
                // update the current person (spouseID) to add the 'newID' as the spouse ID
                const { spouseId } = res.locals;
                const updateCurrentSpouseQuery = `UPDATE people SET spouse_id=${newId} WHERE id=${spouseId}`;
                await db.query(updateCurrentSpouseQuery);
            } 
            return next();
        } catch (err){
            console.log(err);
            next({log: 'Error in personController.addPerson', message: `error: ${err}`});
        }
    } else {
        //Cases for if the relative you're adding already exists somewher in the tree
        try {
            const {exists} = res.locals;
            console.log(res.locals)
            if (res.locals.spouseId){
                const {spouseId} = res.locals;
                const updateCurrentSpouseQuery = `UPDATE people SET spouse_id=${exists} WHERE id=${spouseId}`;
                await db.query(updateCurrentSpouseQuery);
            } else if (res.locals.momId){
                const {momId} = res.locals;
                const updateCurrentMomQuery = `UPDATE people SET mom_id=${exists} WHERE id=${momId}`;
                await db.query(updateCurrentMomQuery);
            } else if (res.locals.dadId){
                const {dadId} = res.locals;
                const updateCurrentDadQuery = `UPDATE people SET dad_id=${exists} WHERE id=${dadId}`;
                await db.query(updateCurrentDadQuery);
            }
            return next();
        } catch(err){
            next({log: 'Error in personController.addPerson', message: `error: ${err}`});
        }
       
    } 
}

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


personController.getPerson = async(req, res, next) => {
    try {
        const {firstName, lastName, birthday} = req.params
        const queryString = `SELECT * FROM people WHERE first_name='${firstName}' AND last_name='${lastName}' AND birthday='${birthday}' `;
        const response = await db.query(queryString);
        console.log(response.rows[0]);
        res.locals.person = response.rows[0];
        //If person has mother, gets mother's info
        if (response.rows[0].mom_id){
            console.log('Getting mom')
            const momResponse = await db.query(`SELECT first_name, last_name, birthday FROM people WHERE id=${response.rows[0].mom_id}`)
            console.log('Mom response', momResponse.rows)
            res.locals.mom = momResponse.rows[0]
        }
        // If person has father, gets fathers info
        if (response.rows[0].dad_id){
            console.log('Getting dad')
            const dadResponse = await db.query(`SELECT first_name, last_name, birthday FROM people WHERE id=${response.rows[0].dad_id}`)
            console.log('dad response', dadResponse.rows)
            res.locals.dad = dadResponse.rows[0]
        }
        // If person has spouse, gets spouses info
        if (response.rows[0].spouse_id){
            console.log('Getting spouse')
            const spouseResponse = await db.query(`SELECT first_name, last_name, birthday FROM people WHERE id=${response.rows[0].spouse_id}`)
            console.log('spouse response', spouseResponse.rows)
            res.locals.spouse = spouseResponse.rows[0]
        }
        // If anyone in the database has person as a parent, gets those people's info as children
        const childrenQuery = `SELECT first_name, last_name, birthday FROM people WHERE mom_id=${response.rows[0].id} OR dad_id=${response.rows[0].id}`
        const childResponse = await db.query(childrenQuery);
        if (childResponse.rows && childResponse.rows.length){
            console.log('child response', childResponse.rows)
            res.locals.children = childResponse.rows
        }
        return next();
    } catch(err){
        return next({log: 'Error in personController.getPerson', message: `error: ${err}`});
    }
}

personController.addChild = async(req, res, next) => {
    try {
        const { parentFirstName, parentLastName, parentBirthday, parentSex } = req.params;
        const { familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, 
                streetAddress, city, state, zipCode } = req.body;
        const parentQueryString = `SELECT * FROM people WHERE first_name='${parentFirstName}' AND last_name='${parentLastName}' AND birthday='${parentBirthday}' `;
        const response = await db.query(parentQueryString);
        const parentId = response.rows[0].id;
        let data;
        let queryString;
        if (parentSex==='female'){
            data = [familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, streetAddress, city, state, zipCode, parentId];        
            queryString = `INSERT INTO people (family_tree, first_name, last_name, sex, phone_number, email, birthday, death_date, street_address, city, state, zip_code, mom_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`;

        } else if (parentSex ==='male'){
            data = [familyTree, firstName, lastName, sex, phoneNumber, email, birthday, deathDate, streetAddress, city, state, zipCode, parentId];        
            queryString = `INSERT INTO people (family_tree, first_name, last_name, sex, phone_number, email, birthday, death_date, street_address, city, state, zip_code, dad_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`;

        }
        await db.query(queryString, data);
        return next();
    } catch(err){
        next({log: 'Error in personController.addChild', message: `error: ${err}`});
    }
}



module.exports = personController;