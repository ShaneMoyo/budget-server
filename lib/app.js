const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const budget = require('./routes/budgets');

app.use(express.json());
app.use('/api/budget', budget)

module.exports = app;