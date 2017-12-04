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

        return Promise.all(savedExpenses)
            .then( savedExpenses => {
                return request.get('api/expenses/:id')
                    .then( gotExpeneses =>  {
                        gotExpeneses = gotExpeneses.sort((a, b) => a._id < b._id);
                        savedExpenses = savedExpenses.sort((a, b) => a._id < b._id);
                        assert.seepEqual(gotExpeneses, savedExpenses);
                    });
            })
    })


})