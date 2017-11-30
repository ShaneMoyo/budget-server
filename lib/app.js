const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');

const budget = require('./routes/budgets');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/budget', budget)

module.exports = app;