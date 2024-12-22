const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Create a new employment object for the domestic helper or skilled worker to use.
const employmentSchema = new mongoose.Schema({
    employmentID: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        // required: true
    },
    workingPeriod: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        // required: true
    },
    workDescription: {
        type: String,
        // required: true
    },
}, { timestamps: true });

// const Employment = mongoose.model('Employment', employmentSchema);

employmentSchema.plugin(AutoIncrement, { id: 'employment_seq', inc_field: 'employmentID' });

module.exports = employmentSchema;