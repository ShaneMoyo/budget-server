const router = require('express').Router();
const Budget = require('../models/budget');

module.exports = router

    .post('/', (request, response, next) => {
        new Budget(request.body).save()
            .then(budget => response.json(budget))
            .catch(next);
    });