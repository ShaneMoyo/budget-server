const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('budget API', () => {
    beforeEach(() => mongoose.connection.dropDatabase());
    
    const testBudgets = [
        {
            name: 'Test Budget 1',
            budget: 9999
        },
        {
            name: 'Test Budget 2',
            budget: 8888
        },
        {
            name: 'Test Budget 3',
            budget: 7777
        }
    ];

    it('Should save a budget with id', () => {
        return request.post('/api/budget')
            .send(testBudgets[1])
            .then(({ body }) => {
                const savedBudget = body;
                assert.ok(savedBudget._id);
                assert.equal(savedBudget.name, testBudgets[1].name);
            });
    });

    it('Should get all saved budgets', () => {

        const saveBudgets = testBudgets.map( budget => {
            return request.post('/api/budget')
                .send(budget)
                .then(({ body }) => body );
        })

        return Promise.all(saveBudgets)
            .then(savedBudgets => {
                return request.get('/api/budget')
                    .then(({ body }) => {
                        const gotBudgets = body.sort((a, b) => a._id < b._id);
                        savedBudgets = savedBudgets.sort((a, b) => a._id < b._id);
                        assert.deepEqual(savedBudgets, gotBudgets);
                    })
            })   
    });

    it('Should delete a budget', () => {
        return request.post('/api/budget')
            .send(testBudgets[1])
            .then(savedBudget => {
                const { body } = savedBudget;
                console.log('will delete now at id ', body._id);
                return request.delete(`api/budget/${body._id}`);
            })
            .then( ({ body }) => {
                assert.deepEqual(body, { removed: true });
                return request.get('/api/budget')
                    .then( ({ body })=>{
                        assert.deepEqual(body, []);
                    })
            });
    });

})