const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Helper function to format the date as MM/DD/YYYY
const formatDate = (date) => {
    if (!date) return null;
    // const options = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };
    console.log("return date: ", new Date(date).toLocaleDateString('en-US'))
    return new Date(date).toLocaleDateString('en-US');
};

// Create a new employment schema
const employmentSchema = new mongoose.Schema({
    employmentID: { type: Number, required: true },
    country: { type: String, required: true },
    workingPeriod: { type: String, required: true },
    date: { type: String, set: formatDate, required: true },
    workDescription: { type: String, required: true },
}, { timestamps: true });

employmentSchema.plugin(AutoIncrement, { id: 'employment_seq', inc_field: 'employmentID' });

module.exports = employmentSchema;
