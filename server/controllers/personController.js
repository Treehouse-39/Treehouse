const db = require('../models/treehouseModels')

const personController = {};


personController.getPeople = async(req, res, next) => {
    try {
        const queryString = 'SELECT * FROM people';
        const response = await db.query(queryString)
        console.log(response)
        return next()
    } catch(err){
        next({log: 'asdfasdfasd', message: 'asdf'})
    }
}


module.exports = personController