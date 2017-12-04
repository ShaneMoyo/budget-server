const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    budget: {
        type: Schema.Types.ObjectId,
        ref: 'Budget',
        required: true 
    }
})

module.exports = mongoose.model('Expenses', schema);