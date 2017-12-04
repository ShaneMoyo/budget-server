const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');

const budget = require('./routes/budgets');
const expense = require('./routes/expenses');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/budgets', budget);
app.use('/api/expenses', expense);
app.use(errorHandler());

module.exports = app;