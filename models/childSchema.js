const mongoose = require('mongoose');

// Helper function to format the date as MM/DD/YYYY
const formatDate = (date) => {
    if (!date) return null;
    // const options = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };
    console.log("return date: ", new Date(date).toLocaleDateString('en-US'))
    return new Date(date).toLocaleDateString('en-US');
};

// Create a new child schema
const childSchema = new mongoose.Schema({
    childID: { type: Number, required: true },
    lName: { type: String, required: true },
    fName: { type: String, required: true },
    mInitial: { type: String, required: true },
    age: { type: Number, required: true },
    dateOfBirth: { type: String, set: formatDate, required: true }
}, { timestamps: true });

module.exports = childSchema;