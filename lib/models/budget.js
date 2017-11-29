import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Budget', schema);