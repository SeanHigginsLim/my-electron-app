const mongoose = require('mongoose');

// Create a new child object for the domestic helper of skilled worker to use.
const childSchema = new mongoose.Schema({
    childID: {
        type: Number,
        required: true,
        unique: true
    },
    lName: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    mInitial: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});

// const Child = mongoose.model('Child', childSchema);

module.exports = childSchema;