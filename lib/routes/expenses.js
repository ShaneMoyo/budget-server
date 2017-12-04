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

    .delete('/:id', (request, response, next) => {
        const id = request.params.id;
        console.log('inside delete',id);
        return Expense.findByIdAndRemove(id)
            .then(result => {
                const isRemoved = result ? true : false;
                    return isRemoved;
            })
            .then(isRemoved => response.json({ removed: isRemoved}))
            .catch(next);
    })
