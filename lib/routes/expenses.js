const router = require('express').Router();
const Expense = require('../models/expense');

module.exports = router
    
    .post('/', (request, response, next)=> {
        console.log('req.body expense', request.body);
        new Expense(request.body).save()
            .then(expense => response.json(expense))
            .catch(next);
    })

    .get('/:id', (request, response, next) => {
        console.log('FINDING EXPENSES======')
        const id = request.params.id
        Expense.find({ budget: id })
            .then( expeneses => response.json(expeneses))
            .catch(next);
    })
    