const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');

const budget = require('./routes/budgets');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/budget', budget)
app.use(errorHandler());

module.exports = app;