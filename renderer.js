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

    document.getElementById('add-child-btn').addEventListener('click', () => {
        const childContainer = document.getElementById('children-container');
        const childIndex = childContainer.children.length;

        // Create new child entry fields
        const childEntry = document.createElement('div');
        childEntry.classList.add('child-entry');
        childEntry.innerHTML = `
            <h3>Child ${childIndex + 1}</h3>
            <input type="text" id="child-${childIndex}-lName" name="children[${childIndex}].lName" placeholder="Last Name">
            <input type="text" id="child-${childIndex}-fName" name="children[${childIndex}].fName" placeholder="First Name">
            <input type="text" id="child-${childIndex}-mInitial" name="children[${childIndex}].mInitial" placeholder="Middle Initial">
            <input type="number" id="child-${childIndex}-age" name="children[${childIndex}].age" placeholder="Age">
            <input type="date" id="child-${childIndex}-dateOfBirth" name="children[${childIndex}].dateOfBirth" placeholder="Date of Birth">
            <button type="button" class="remove-child-btn">Remove Child</button>
        `;
        childContainer.appendChild(childEntry);

        // Add event listener to remove button
        childEntry.querySelector('.remove-child-btn').addEventListener('click', () => {
            childContainer.removeChild(childEntry);
        });
    });

    document.getElementById('add-employment-btn').addEventListener('click', () => {
        const employmentContainer = document.getElementById('employments-container');
            const employmentIndex = employmentContainer.children.length;

            // Create new child entry fields
            const employmentEntry = document.createElement('div');
            employmentEntry.classList.add('employment-entry');
            employmentEntry.innerHTML = `
                <h3>Employment ${employmentIndex + 1}</h3>
                <input type="text" id="employment-${employmentIndex}-country" name="employments[${employmentIndex}].country" placeholder="Country">
                <input type="text" id="employment-${employmentIndex}-workingPeriod" name="employments[${employmentIndex}].workingPeriod" placeholder="Working Period">
                <input type="text" id="employment-${employmentIndex}-date" name="employments[${employmentIndex}].date" placeholder="Date">
                <input type="number" id="employment-${employmentIndex}-workDescription" name="employments[${employmentIndex}].workDescription" placeholder="Work Description">
                <button type="button" class="remove-employment-btn">Remove Employment</button>
            `;
            employmentContainer.appendChild(employmentEntry);

            // Add event listener to remove button
            employmentEntry.querySelector('.remove-employment-btn').addEventListener('click', () => {
                employmentContainer.removeChild(employmentEntry);
            });
    });

    // Handle form submissions
    const createDomesticHelperForm = document.getElementById('create-domestic-helper-form');
    if (createDomesticHelperForm) {
        createDomesticHelperForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form data
            const domesticHelperFormData = new FormData(createDomesticHelperForm);
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
            const childrenData = [];
            const childCount = document.querySelectorAll('.child-entry').length;
            const employmentsData = [];
            const employmentCount = document.querySelectorAll('.employment-entry').length;

            for (let i = 0; i < childCount; i++) {
                const child = {
                    childID: i + 1,
                    lName: document.querySelector(`#child-${i}-lName`).value,
                    fName: document.querySelector(`#child-${i}-fName`).value,
                    mInitial: document.querySelector(`#child-${i}-mInitial`).value,
                    age: Number(document.querySelector(`#child-${i}-age`).value),
                    dateOfBirth: new Date(document.querySelector(`#child-${i}-dateOfBirth`).value)
                };
                childrenData.push(child);
            }

            for (let i = 0; i < employmentCount; i++) {
                const employment = {
                    employmentID: i + 1,
                    country: document.querySelector(`#employment-${i}-country`).value,
                    workingPeriod: document.querySelector(`#employment-${i}-workingPeriod`).value,
                    date: document.querySelector(`#employment-${i}-date`).value,
                    workDescription: Number(document.querySelector(`#employment-${i}-workDescription`).value)
                };
                employmentsData.push(employment);
            }
            console.log("children data: ", childrenData);
            console.log("employments data: ", employmentsData);
    
            helper.children = childrenData;
            helper.employments = employmentsData

            try {
                const createdHelper = await window.electronAPI.createDomesticHelper(helper);
                console.log('Domestic helper created:', createdHelper.children);
            } catch (error) {
                console.error('Error creating domestic helper:', error);
            }
        });
    }

    const createSkilledWorkerForm = document.getElementById('create-skilled-worker-form');
    if (createSkilledWorkerForm) {
        createSkilledWorkerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form data
            const skilledWorkerFormData = new FormData(createSkilledWorkerForm);
            const worker = Object.fromEntries(skilledWorkerFormData.entries());

            // Convert specific fields to the correct types
            worker.telephoneNumber = Number(worker.telephoneNumber);
            worker.dateOfBirth = new Date(worker.dateOfBirth);
            worker.age = Number(worker.age);
            worker.height = Number(worker.height);
            worker.weightFeet = Number(worker.weightFeet);
            worker.weightInches = Number(worker.weightInches);
            worker.fatherDateOfBirth = new Date(worker.fatherDateOfBirth);
            worker.motherDateOfBirth = new Date(worker.motherDateOfBirth);
            worker.spouseDateOfBirth = new Date(worker.spouseDateOfBirth);
            worker.contactPersonContactNumber = Number(worker.contactPersonContactNumber);
            // worker.children = Number(worker.telephoneNumber);
            worker.passportDateOfIssue = new Date(worker.passportDateOfIssue);
            worker.passportDateOfExpiry = new Date(worker.passportDateOfExpiry);
            worker.yearGraduated = Number(worker.yearGraduated);
            // worker.employments = Number(worker.telephoneNumber);

            try {
                const createdWorker = await window.electronAPI.createSkilledWorker(worker);
                console.log('Skilled worker created:', createdWorker);
            } catch (error) {
                console.error('Error creating skilled worker:', error);
            }
        });
    }

    const updateDomesticHelperForm = document.getElementById('update-domestic-helper-form');
    if (updateDomesticHelperForm) {
        updateDomesticHelperForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form data
            const domesticHelperFormData = new FormData(updateDomesticHelperForm);
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
                const updatedHelper = await window.electronAPI.updateDomesticHelper(helper);
                console.log('Domestic helper updated:', updatedHelper);
            } catch (error) {
                console.error('Error updating domestic helper:', error);
            }
        });
    }

    const updateSkilledWorkerForm = document.getElementById('update-skilled-worker-form');
    if (updateSkilledWorkerForm) {
        updateSkilledWorkerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Extract form data
            const skilledWorkerFormData = new FormData(updateSkilledWorkerForm);
            const worker = Object.fromEntries(skilledWorkerFormData.entries());

            // Convert specific fields to the correct types
            worker.telephoneNumber = Number(worker.telephoneNumber);
            worker.dateOfBirth = new Date(worker.dateOfBirth);
            worker.age = Number(worker.age);
            worker.height = Number(worker.height);
            worker.weightFeet = Number(worker.weightFeet);
            worker.weightInches = Number(worker.weightInches);
            worker.fatherDateOfBirth = new Date(worker.fatherDateOfBirth);
            worker.motherDateOfBirth = new Date(worker.motherDateOfBirth);
            worker.spouseDateOfBirth = new Date(worker.spouseDateOfBirth);
            worker.contactPersonContactNumber = Number(worker.contactPersonContactNumber);
            // worker.children = Number(worker.telephoneNumber);
            worker.passportDateOfIssue = new Date(worker.passportDateOfIssue);
            worker.passportDateOfExpiry = new Date(worker.passportDateOfExpiry);
            worker.yearGraduated = Number(worker.yearGraduated);
            // worker.employments = Number(worker.telephoneNumber);

            try {
                const updatedWorker = await window.electronAPI.updateSkilledWorker(worker);
                console.log('Skilled worker created:', updatedWorker);
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
