const router = require('express').Router();
const Budget = require('../models/budget');

module.exports = router

    .post('/', (request, response, next) => {
        new Budget(request.body).save()
            .then(budget => response.json(budget))
            .catch(next);
    })

    .get('/', (request, response, next) => {
        Budget.find()
            .then(budgets => response.json(budgets))
            .catch(next);
    })

    .delete('/:id', (request, response, next) => {
        
        return Budget.findByIdAndRemove(request.params.id)
            .then(result => {
                const isRemoved = result ? true : false;
                    return isRemoved; 
            })
            .then(isRemoved => response.json({ removed: isRemoved }))
            .catch(next);
    })