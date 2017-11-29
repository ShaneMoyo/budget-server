const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('budget API', () => {
    beforeEach(() => mongoose.Connection.dropDatabase());
    
    const testBudget = {
        name: 'Test Budget',
        name: 9999
    };

    it('Should save a budget with id', () => {
        return request.post('/api/budget')
            .send(testBudget)
            .then(({ body }) => {
                const savedBudget = body;
                assert.ok(savedBudget._id);
                assert.equal(savedBudget.name, testBudget.name);
            });
    })

})