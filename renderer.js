// const { electronAPI } = window;
// Function to navigate between different pages 
function navigate(page) { 
    window.electronAPI.loadPage(page);
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure electronAPI is defined
    console.log("electronAPI: ", electronAPI )
    if (window.electronAPI) { 
        console.log('electronAPI: ', window.electronAPI); 
    } else { 
        console.error('electronAPI is not defined on the window object.');
    }
    if (!electronAPI || !electronAPI.createDomesticHelper) { 
        console.error('electronAPI is not defined properly');
        return;
    }

    // Add event listeners for navigation buttons
    document.querySelectorAll('button[data-navigate]').forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const page = button.getAttribute('data-navigate');
            console.log("page: ", page)
            if (page) {
                await window.electronAPI.loadPage(page).catch((error) => {
                    console.error(`Failed to navigate to ${page}:`, error);
                });
            }
        });
    });

    // Handle form submissions
    const domesticHelperForm = document.getElementById('create-domestic-helper-form');
    if (domesticHelperForm) {
        domesticHelperForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form data
            const domesticHelperFormData = new FormData(domesticHelperForm);
            const helper = Object.fromEntries(domesticHelperFormData.entries());

            // Convert specific fields to the correct types
            helper.telephoneNumber = Number(helper.telephoneNumber);
            helper.dateOfBirth = new Date(helper.dateOfBirth);
            helper.age = Number(helper.age);
            helper.height = Number(helper.height);
            helper.weightFeet = Number(helper.weightFeet);
            helper.weightInches = Number(helper.weightInches);
            helper.fatherDateOfBirth = new Date(helper.fatherDateOfBirth);
            helper.motherDateOfBirth = new Date(helper.motherDateOfBirth);
            helper.spouseDateOfBirth = new Date(helper.spouseDateOfBirth);
            helper.contactPersonContactNumber = Number(helper.contactPersonContactNumber);
            // helper.children = Number(helper.telephoneNumber);
            helper.passportDateOfIssue = new Date(helper.passportDateOfIssue);
            helper.passportDateOfExpiry = new Date(helper.passportDateOfExpiry);
            helper.yearGraduated = Number(helper.yearGraduated);
            // helper.employments = Number(helper.telephoneNumber);

            try {
                const createdHelper = await window.electronAPI.createDomesticHelper(helper);
                console.log('Domestic helper created:', createdHelper);
            } catch (error) {
                console.error('Error creating domestic helper:', error);
            }
        });
    }

    const skilledWorkerForm = document.getElementById('create-skilled-worker-form');
    if (skilledWorkerForm) {
        skilledWorkerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form data
            const skilledWorkerFormData = new FormData(skilledWorkerForm);
            const worker = Object.fromEntries(skilledWorkerFormData.entries());

            // Convert specific fields to the correct types
            worker.telephoneNumber = Number(worker.telephoneNumber);
            worker.dateOfBirth = new Date(worker.dateOfBirth).toISOString();

            try {
                const createdWorker = await window.electronAPI.createDomesticHelper(worker);
                console.log('Skilled worker created:', createdWorker);
            } catch (error) {
                console.error('Error creating skilled worker:', error);
            }
        });
    }

    // // Handle form submissions for creating a domestic helper
    // document.getElementById('create-domestic-helper-form').addEventListener('submit', async (e) => {
    //     e.preventDefault();
    //     console.log("I am in create domestic helper form renderer")
    //     const helper = {
    //         helperID: e.target.helperID.value, // Must be a number
    //         lName: e.target.lName.value,
    //         fName: e.target.fName.value,
    //         mInitial: e.target.mInitial.value,
    //         position: e.target.position.value, // Ensure this field is included
    //         destination: e.target.destination.value, // Ensure this field is included
    //         address: e.target.address.value, // Ensure this field is included
    //         telephoneNumber: Number(e.target.telephoneNumber.value), // Convert to number
    //         dateOfBirth: new Date(e.target.dateOfBirth.value), // Convert to date
    //         age: Number(e.target.age.value), // Convert to number
    //         placeOfBirth: e.target.placeOfBirth.value,
    //         nationality: e.target.nationality.value,
    //         civilStatus: e.target.civilStatus.value,
    //         height: Number(e.target.height.value), // Convert to number
    //         weightFeet: Number(e.target.weightFeet.value), // Convert to number
    //         weightInches: Number(e.target.weightInches.value), // Convert to number
    //         sicknessRecord: e.target.sicknessRecord.value,
    //         religion: e.target.religion.value,
    //         fatherLName: e.target.fatherLName.value,
    //         fatherFName: e.target.fatherFName.value,
    //         fatherMInitial: e.target.fatherMInitial.value,
    //         fatherDateOfBirth: new Date(e.target.fatherDateOfBirth.value), // Convert to date
    //         motherLName: e.target.motherLName.value,
    //         motherFName: e.target.motherFName.value,
    //         motherMInitial: e.target.motherMInitial.value,
    //         motherDateOfBirth: new Date(e.target.motherDateOfBirth.value), // Convert to date
    //         spouseLName: e.target.spouseLName.value,
    //         spouseFName: e.target.spouseFName.value,
    //         spouseMInitial: e.target.spouseMInitial.value,
    //         spouseDateOfBirth: new Date(e.target.spouseDateOfBirth.value), // Convert to date
    //         contactPersonLName: e.target.contactPersonLName.value,
    //         contactPersonFName: e.target.contactPersonFName.value,
    //         contactPersonMInitial: e.target.contactPersonMInitial.value,
    //         contactPersonAddress: e.target.contactPersonAddress.value,
    //         contactPersonContactNumber: Number(e.target.contactPersonContactNumber.value), // Convert to number
    //         contactPersonRelationshipWithHelper: e.target.contactPersonRelationshipWithHelper.value,
    //         children: [], // Assuming you'll handle this separately
    //         passportNumber: e.target.passportNumber.value,
    //         passportDateOfIssue: new Date(e.target.passportDateOfIssue.value), // Convert to date
    //         passportDateOfExpiry: new Date(e.target.passportDateOfExpiry.value), // Convert to date
    //         passportPlaceOfIssue: e.target.passportPlaceOfIssue.value,
    //         nameOfSchool: e.target.nameOfSchool.value,
    //         courseTaken: e.target.courseTaken.value,
    //         yearGraduated: Number(e.target.yearGraduated.value), // Convert to number
    //         employments: [], // Assuming you'll handle this separately
    //         englishSpeaking: e.target.englishSpeaking.checked, // Boolean
    //         englishReading: e.target.englishReading.checked, // Boolean
    //         englishWriting: e.target.englishWriting.checked, // Boolean
    //         arabicSpeaking: e.target.arabicSpeaking.checked, // Boolean
    //         arabicReading: e.target.arabicReading.checked, // Boolean
    //         arabicWriting: e.target.arabicWriting.checked, // Boolean
    //         filipinoSpeaking: e.target.filipinoSpeaking.checked, // Boolean
    //         filipinoReading: e.target.filipinoReading.checked, // Boolean
    //         filipinoWriting: e.target.filipinoWriting.checked, // Boolean
    //         otherLanguageSpeaking: e.target.otherLanguageSpeaking.checked, // Boolean
    //         otherLanguageReading: e.target.otherLanguageReading.checked, // Boolean
    //         otherLanguageWriting: e.target.otherLanguageWriting.checked, // Boolean
    //         babySitting: e.target.babySitting.checked, // Boolean
    //         ironing: e.target.ironing.checked, // Boolean
    //         childrenCare: e.target.childrenCare.checked, // Boolean
    //         cooking: e.target.cooking.checked, // Boolean
    //         tutoring: e.target.tutoring.checked, // Boolean
    //         arabicCooking: e.target.arabicCooking.checked, // Boolean
    //         disabledCare: e.target.disabledCare.checked, // Boolean
    //         sewing: e.target.sewing.checked, // Boolean
    //         cleaning: e.target.cleaning.checked, // Boolean
    //         computer: e.target.computer.checked // Boolean
    //     };
    //     console.log("helper", helper)
    //     try {
    //         const createdHelper = await electronAPI.createDomesticHelper(helper);
    //         console.log('Domestic helper created:', createdHelper);
    //         // Update UI accordingly
    //     } catch (error) {
    //         console.error('Error creating domestic helper:', error);
    //     }
    // });

    // Similar handlers for update and delete actions can be added here
});
