const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('Expense API', () => {
    
    beforeEach(()=> mongoose.connection.dropDatabase());
     
    let savedBudget;

    beforeEach(()=>{
        const testBudget = {
            name: 'Test Budget',
            budget: 99
        }
        return request.post('/api/budgets')
            .send(testBudget)
            .then(({ body })=> {
                savedBudget = body;
            });
    })

    it('Shoud save an expense', () => {
        const testExpense = {
            name: 'Test Expense',
            amount: 20,
            budget: savedBudget._id
        }

        return request.post('/api/expenses')
            .send(testExpense)
            .then(({ body })=> {
                const savedExpense = body; 
                assert.ok(savedExpense._id);
                assert.equal(savedExpense.name, testExpense.name)
            });
    });


})