const router = require('express').Router();
const Expense = require('../models/expense');

module.exports = router
    
    .post('/', (request, response, next)=> {
        console.log('req.body expense', request.body);
        new Expense(request.body).save()
            .then(expense => response.json(expense))
            .catch(next);
    })