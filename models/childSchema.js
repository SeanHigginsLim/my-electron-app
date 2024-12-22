const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    childID: {
        type: Number,
        required: true
    },
    lName: {
        type: String,
        // required: true
    },
    fName: {
        type: String,
        // required: true
    },
    mInitial: {
        type: String,
        // required: true
    },
    age: {
        type: Number,
        // required: true
    },
    dateOfBirth: {
        type: Date,
        // required: true
    }
}, { timestamps: true });

module.exports = childSchema;