const mongoose = require('mongoose');

// Create a new employment object for the domestic helper or skilled worker to use.
const employmentSchema = new mongoose.Schema({
    employmentID: {
        type: Number,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    workingPeriod: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    workDescription: {
        type: String,
        required: true
    },
});

// const Employment = mongoose.model('Employment', employmentSchema);

module.exports = employmentSchema;