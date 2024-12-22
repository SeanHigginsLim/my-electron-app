const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const childSchema = require('./childSchema');
const employmentSchema = require('./employmentSchema');

// Create a new domestic helper object.
const domesticHelperSchema = new mongoose.Schema({
    helperID: {
        type: Number,
        unique: true
    },
    lName: { type: String },
    fName: { type: String },
    mInitial: { type: String },
    position: { type: String },
    destination: { type: String },
    address: { type: String },
    telephoneNumber: { type: Number },
    dateOfBirth: { type: Date },
    age: { type: Number },
    placeOfBirth: { type: String },
    nationality: { type: String },
    civilStatus: { type: String },
    height: { type: Number },
    weightFeet: { type: Number },
    weightInches: { type: Number },
    sicknessRecord: { type: String },
    religion: { type: String },
    fatherLName: { type: String },
    fatherFName: { type: String },
    fatherMInitial: { type: String },
    fatherDateOfBirth: { type: Date },
    motherLName: { type: String },
    motherFName: { type: String },
    motherMInitial: { type: String },
    motherDateOfBirth: { type: Date },
    spouseLName: { type: String },
    spouseFName: { type: String },
    spouseMInitial: { type: String },
    spouseDateOfBirth: { type: Date },
    contactPersonLName: { type: String },
    contactPersonFName: { type: String },
    contactPersonMInitial: { type: String },
    contactPersonAddress: { type: String },
    contactPersonContactNumber: { type: Number },
    contactPersonRelationshipWithHelper: { type: String },
    children: { 
        type: [childSchema], 
        default: [] 
    },
    passportNumber: { type: String },
    passportDateOfIssue: { type: Date },
    passportDateOfExpiry: { type: Date },
    passportPlaceOfIssue: { type: String },
    nameOfSchool: { type: String },
    courseTaken: { type: String },
    yearGraduated: { type: Number },
    employments: { 
        type: [employmentSchema], 
        default: [] 
    },  
    englishSpeaking: { type: Boolean },
    englishReading: { type: Boolean },
    englishWriting: { type: Boolean },
    arabicSpeaking: { type: Boolean },
    arabicReading: { type: Boolean },
    arabicWriting: { type: Boolean },
    filipinoSpeaking: { type: Boolean },
    filipinoReading: { type: Boolean },
    filipinoWriting: { type: Boolean },
    otherLanguageSpeaking: { type: Boolean },
    otherLanguageReading: { type: Boolean },
    otherLanguageWriting: { type: Boolean },
    babySitting: { type: Boolean },
    ironing: { type: Boolean },
    childrenCare: { type: Boolean },
    cooking: { type: Boolean },
    tutoring: { type: Boolean },
    arabicCooking: { type: Boolean },
    disabledCare: { type: Boolean },
    sewing: { type: Boolean },
    cleaning: { type: Boolean },
    computer: { type: Boolean }
}, { timestamps: true });

// Apply AutoIncrement for `helperID`
domesticHelperSchema.plugin(AutoIncrement, { id: 'helper_seq', inc_field: 'helperID' });

const DomesticHelper = mongoose.model('DomesticHelper', domesticHelperSchema);

module.exports = DomesticHelper;


// helperID: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    // lName: String,
    // fName: String,
    // mInitial: String,
    // position: String,
    // destination: String,
    // address: String,
    // telephoneNumber: Number,
    // dateOfBirth: Date,
    // age: Number,
    // placeOfBirth: String,
    // nationality: String,
    // civilStatus: String,
    // height: Number,
    // weightFt: Number,
    // weightIn: Number,
    // sicknessRecord: String,
    // religion: String,
    // fatherLName: String,
    // fatherFName: String,
    // fatherMInitial: String,
    // fatherDateOfBirth: Date,
    // motherLName: String,
    // motherFName: String,
    // motherMInitial: String,
    // motherDateOfBirth: Date,
    // spouseLName: String,
    // spouseFName: String,
    // spouseMInitial: String,
    // spouseDateOfBirth: Date,
    // contactPersonLName: String,
    // contactPersonFName: String,
    // contactPersonMInitial: String,
    // contactPersonAddress: String,
    // contactPersonContactNumber: Number,
    // contactPersonRelationshipWithHelper: String,
    // children: { 
    //     type: [childSchema], 
    //     default: []
    // }
    // passportNumber: String,
    // passportDateOfIssue: Date,
    // passportDateOfExpiry: Date,
    // passportPlaceOfIssue: String,
    // nameOfSchool: String,
    // courseTaken: String,
    // yearGraduated: Number,
    // employmentOneCountry: String,
    // employmentOneWorkingPeriod: String,
    // employmentOneDate: Date,
    // employmentOneWorkDescription: String,
    // employmentTwoCountry: String,
    // employmentTwoWorkingPeriod: String,
    // employmentTwoDate: Date,
    // employmentTwoWorkDescription: String,
    // englishSpeaking: Boolean,
    // englishReading: Boolean,
    // englishWriting: Boolean,
    // arabicSpeaking: Boolean,
    // arabicReading: Boolean,
    // arabicWriting: Boolean,
    // filipinoSpeaking: Boolean,
    // filipinoReading: Boolean,
    // filipinoWriting: Boolean,
    // otherLanguageSpeaking: Boolean,
    // otherLanguageReading: Boolean,
    // otherLanguageWriting: Boolean,
    // babySitting: Boolean,
    // ironing: Boolean,
    // childrenCare: Boolean,
    // cooking: Boolean,
    // tutoring: Boolean,
    // arabicCooking: Boolean,
    // disabledCare: Boolean,
    // sewing: Boolean,
    // cleaning: Boolean,
    // computer: Boolean
