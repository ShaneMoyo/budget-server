const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('Expense API', () => {
    
    beforeEach(()=> mongoose.connection.dropDatabase());
     
    let savedBudget;
    let testExpenses;

    beforeEach(()=>{
        const testBudget = {
            name: 'Test Budget',
            budget: 99
        }
        return request.post('/api/budgets')
            .send(testBudget)
            .then(({ body })=> {
                savedBudget = body;
                testExpenses = [
                    {
                        name: 'Test Expense 1',
                        amount: 20,
                        budget: savedBudget._id
                    },
                    {
                        name: 'Test Expense 2',
                        amount: 333,
                        budget: savedBudget._id
                    },
                    {
                        name: 'Test Expense 3',
                        amount: 290,
                        budget: savedBudget._id
                    }
                ]
            });
    })

    it('Shoud save an expense', () => {
        return request.post('/api/expenses')
            .send(testExpenses[0])
            .then(({ body })=> {
                const savedExpense = body; 
                assert.ok(savedExpense._id);
                assert.equal(savedExpense.name, testExpenses[0].name)
            });
    });

    it('should get all expenses of parent budget', () => {
        const saveExpenses = testExpenses.map( expense => {
            return request.post('/api/expenses')
                .send(expense)
                .then( res => res.body );
        });

        return Promise.all(saveExpenses)
            .then( savedExpenses => {
                return request.get(`/api/expenses/${savedBudget._id}`)
                    .then( res =>  {
                        gotExpenses = res.body.sort((a, b) => a._id < b._id);
                        savedExpenses = savedExpenses.sort((a, b) => a._id < b._id);
                        assert.deepEqual(gotExpenses, savedExpenses);
                    });
            })
    })

    it('should delete an expense by id', () => {
        const saveExpenses = testExpenses.map( expense => {
            return request.post('/api/expenses')
                .send(expense)
                .then( res => res.body );
        });

        return Promise.all(saveExpenses)
            .then(savedExpenses => {
                return request.delete(`/api/expenses/${savedExpenses[0]._id}`)
                    .then( ({ body }) => {
                        assert.deepEqual(body, { removed: true });
                        return request.get(`/api/expenses/${savedBudget._id}`)
                            .then(res => {
                                const checkExpenses = [savedExpenses[1], savedExpenses[2]];
                                gotExpenses = res.body.sort((a, b) => a._id < b._id);
                                checkExpenses.sort((a, b) => a._id < b._id);
                                assert.deepEqual(gotExpenses, checkExpenses);
                            });
                    })
            })
    })


})