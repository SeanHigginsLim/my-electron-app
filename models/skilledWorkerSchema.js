const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const childSchema = require('./childSchema');
const employmentSchema = require('./employmentSchema');

// Helper function to format the date as MM/DD/YYYY
const formatDate = (date) => {
    if (!date) return null;
    // const options = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };
    console.log("return date: ", new Date(date).toLocaleDateString('en-US'))
    return new Date(date).toLocaleDateString('en-US');
};

// Custom setter function to handle empty strings
function setDefaultOnEmpty(value, defaultValue) {
    return value === '' ? undefined : value;
}

// Create a new skilled worker object.
const skilledWorkerSchema = new mongoose.Schema({
    workerID: { type: Number, unique: true },
    profileImage: { 
        data: {
            type: String,
            required: true // Ensure this is defined correctly
        },
        contentType: {
            type: String,
            required: true // Ensure this is defined correctly
        } 
    },
    lName: { type: String, required: true },
    fName: { type: String, required: true },
    mInitial: { type: String, required: true },
    position: { type: String, required: true },
    destination: { type: String, required: true },
    address: { type: String, required: true },
    telephoneNumber: { type: Number, required: true },
    dateOfBirth: { type: String, set: formatDate, required: true },
    age: { type: Number, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    civilStatus: { type: String, required: true },
    heightFeet: { type: Number, required: true },
    heightInches: { type: Number, required: true },
    weight: { type: Number, required: true },
    sicknessRecord: { type: String, required: true },
    religion: { type: String, required: true },
    fatherLName: { type: String, required: true },
    fatherFName: { type: String, required: true },
    fatherMInitial: { type: String, required: true },
    fatherDateOfBirth: { type: String, set: formatDate, required: true },
    motherLName: { type: String, required: true },
    motherFName: { type: String, required: true },
    motherMInitial: { type: String, required: true },
    motherDateOfBirth: { type: String, set: formatDate, required: true },
    spouseLName: { type: String, required: false, default: "N/A", set: function(value) { return setDefaultOnEmpty(value, "N/A"); } },
    spouseFName: { type: String, required: false, default: "N/A", set: function(value) { return setDefaultOnEmpty(value, "N/A"); } },
    spouseMInitial: { type: String, required: false, default: "N/A", set: function(value) { return setDefaultOnEmpty(value, "N/A"); } },
    spouseDateOfBirth: { type: String, set: formatDate, required: false },
    contactPersonLName: { type: String, required: true },
    contactPersonFName: { type: String, required: true },
    contactPersonMInitial: { type: String, required: true },
    contactPersonAddress: { type: String, required: true },
    contactPersonContactNumber: { type: Number, required: true },
    contactPersonRelationshipWithWorker: { type: String, required: true },
    children: { 
        type: [childSchema],
        default: []
    },
    passportNumber: { type: String, required: true },
    passportDateOfIssue: { type: String, set: formatDate, required: true },
    passportDateOfExpiry: { type: String, set: formatDate, required: true },
    passportPlaceOfIssue: { type: String, required: true },
    nameOfSchool: { type: String, required: true },
    courseTaken: { type: String, required: true },
    yearGraduated: { type: Number, required: true },
    employments: { 
        type: [employmentSchema], 
        default: []
    },
    englishSpeaking: { type: Boolean, required: true },
    englishReading: { type: Boolean, required: true },
    englishWriting: { type: Boolean, required: true },
    arabicSpeaking: { type: Boolean, required: true },
    arabicReading: { type: Boolean, required: true },
    arabicWriting: { type: Boolean, required: true },
    filipinoSpeaking: { type: Boolean, required: true },
    filipinoReading: { type: Boolean, required: true },
    filipinoWriting: { type: Boolean, required: true },
    otherLanguageSpeaking: { type: Boolean, required: true },
    otherLanguageReading: { type: Boolean, required: true },
    otherLanguageWriting: { type: Boolean, required: true },
    otherSkills: { type: String, required: true }
}, { timestamps: true });

skilledWorkerSchema.plugin(AutoIncrement, { id: 'worker_seq', inc_field: 'workerID' });

const SkilledWorker = mongoose.model('SkilledWorker', skilledWorkerSchema);

module.exports = SkilledWorker;