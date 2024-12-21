const mongoose = require('mongoose');
const childSchema = require('./childSchema');
const employmentSchema = require('./employmentSchema');

// Create a new skilled worker object.
const skilledWorkerSchema = new mongoose.Schema({
    workerID: {
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
    position: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    placeOfBirth: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    civilStatus: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weightFeet: {
        type: Number,
        required: true
    },
    weightInches: {
        type: Number,
        required: true
    },
    sicknessRecord: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    fatherLName: {
        type: String,
        required: true
    },
    fatherFName: {
        type: String,
        required: true
    },
    fatherMInitial: {
        type: String,
        required: true
    },
    fatherDateOfBirth: {
        type: Date,
        required: true
    },
    motherLName: {
        type: String,
        required: true
    },
    motherFName: {
        type: String,
        required: true
    },
    motherMInitial: {
        type: String,
        required: true
    },
    motherDateOfBirth: {
        type: Date,
        required: true
    },
    spouseLName: {
        type: String,
        required: true
    },
    spouseFName: {
        type: String,
        required: true
    },
    spouseMInitial: {
        type: String,
        required: true
    },
    spouseDateOfBirth: {
        type: Date,
        required: true
    },
    contactPersonLName: {
        type: String,
        required: true
    },
    contactPersonFName: {
        type: String,
        required: true
    },
    contactPersonMInitial: {
        type: String,
        required: true
    },
    contactPersonAddress: {
        type: String,
        required: true
    },
    contactPersonContactNumber: {
        type: Number,
        required: true
    },
    contactPersonRelationshipWithHelper: {
        type: String,
        required: true
    },
    children: { 
        type: [childSchema],
        default: []
    },
    passportNumber: {
        type: String,
        required: true
    },
    passportDateOfIssue: {
        type: Date,
        required: true
    },
    passportDateOfExpiry: {
        type: Date,
        required: true
    },
    passportPlaceOfIssue: {
        type: String,
        required: true
    },
    nameOfSchool: {
        type: String,
        required: true
    },
    courseTaken: {
        type: String,
        required: true
    },
    yearGraduated: {
        type: Number,
        required: true
    },
    employments: { 
        type: [employmentSchema], 
        default: []
    },
    englishSpeaking: {
        type: Boolean,
        required: true
    },
    englishReading: {
        type: Boolean,
        required: true
    },
    englishWriting: {
        type: Boolean,
        required: true
    },
    arabicSpeaking: {
        type: Boolean,
        required: true
    },
    arabicReading: {
        type: Boolean,
        required: true
    },
    arabicWriting: {
        type: Boolean,
        required: true
    },
    filipinoSpeaking: {
        type: Boolean,
        required: true
    },
    filipinoReading: {
        type: Boolean,
        required: true
    },
    filipinoWriting: {
        type: Boolean,
        required: true
    },
    otherLanguageSpeaking: {
        type: Boolean,
        required: true
    },
    otherLanguageReading: {
        type: Boolean,
        required: true
    },
    otherLanguageWriting: {
        type: Boolean,
        required: true
    },
    otherSkills: {
        type: String,
        required: true
    }
});

const SkilledWorker = mongoose.model('SkilledWorker', skilledWorkerSchema);

module.exports = SkilledWorker;
