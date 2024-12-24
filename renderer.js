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

            console.log("I am in create")
            

            // Extract form data
            const domesticHelperFormData = new FormData(createDomesticHelperForm);
            const helper = Object.fromEntries(domesticHelperFormData.entries());
            const checkboxFields = [
                'englishSpeaking', 'englishReading', 'englishWriting',
                'arabicSpeaking', 'arabicReading', 'arabicWriting',
                'filipinoSpeaking', 'filipinoReading', 'filipinoWriting',
                'otherLanguageSpeaking', 'otherLanguageReading', 'otherLanguageWriting',
                'babySitting', 'ironing', 'childrenCare', 'cooking',
                'tutoring', 'arabicCooking', 'disabledCare', 'sewing', 'cleaning', 'computer'
            ];

            checkboxFields.forEach(field => {
                helper[field] = domesticHelperFormData.has(field); // true if checked, false if not
            });

            console.log("/ncomputer status: ", helper.computer)

            // Helper function to format dates as MM/DD/YYYY
            const formatDate = (date) => {
                const d = new Date(date);
                return d.toLocaleDateString('en-US'); // Format as MM/DD/YYYY
            };

            // Convert specific fields to the correct types
            helper.telephoneNumber = Number(helper.telephoneNumber);
            helper.dateOfBirth = formatDate(helper.dateOfBirth);
            helper.age = Number(helper.age);
            helper.height = Number(helper.height);
            helper.weightFeet = Number(helper.weightFeet);
            helper.weightInches = Number(helper.weightInches);
            helper.fatherDateOfBirth = formatDate(helper.fatherDateOfBirth);
            helper.motherDateOfBirth = formatDate(helper.motherDateOfBirth);
            helper.spouseDateOfBirth = formatDate(helper.spouseDateOfBirth);
            helper.contactPersonContactNumber = Number(helper.contactPersonContactNumber);
            helper.passportDateOfIssue = formatDate(helper.passportDateOfIssue);
            helper.passportDateOfExpiry = formatDate(helper.passportDateOfExpiry);
            
            console.log("formatted date: ", formatDate(helper.passportDateOfExpiry))
            helper.yearGraduated = Number(helper.yearGraduated);
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
                    dateOfBirth: formatDate(document.querySelector(`#child-${i}-dateOfBirth`).value)
                };
                childrenData.push(child);
            }

            for (let i = 0; i < employmentCount; i++) {
                const employment = {
                    employmentID: i + 1,
                    country: document.querySelector(`#employment-${i}-country`).value,
                    workingPeriod: document.querySelector(`#employment-${i}-workingPeriod`).value,
                    date: formatDate(document.querySelector(`#employment-${i}-date`).value),
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

            console.log("I am in create")
            
            // Extract form data
            const skilledWorkerFormData = new FormData(createSkilledWorkerForm);
            const worker = Object.fromEntries(skilledWorkerFormData.entries());
            const checkboxFields = [
                'englishSpeaking', 'englishReading', 'englishWriting',
                'arabicSpeaking', 'arabicReading', 'arabicWriting',
                'filipinoSpeaking', 'filipinoReading', 'filipinoWriting',
                'otherLanguageSpeaking', 'otherLanguageReading', 'otherLanguageWriting'
            ];

            checkboxFields.forEach(field => {
                worker[field] = skilledWorkerFormData.has(field); // true if checked, false if not
            });

            // Helper function to format dates as MM/DD/YYYY
            const formatDate = (date) => {
                const d = new Date(date);
                return d.toLocaleDateString('en-US'); // Format as MM/DD/YYYY
            };

            // Convert specific fields to the correct types
            worker.telephoneNumber = Number(worker.telephoneNumber);
            worker.dateOfBirth = formatDate(worker.dateOfBirth);
            worker.age = Number(worker.age);
            worker.height = Number(worker.height);
            worker.weightFeet = Number(worker.weightFeet);
            worker.weightInches = Number(worker.weightInches);
            worker.fatherDateOfBirth = formatDate(worker.fatherDateOfBirth);
            worker.motherDateOfBirth = formatDate(worker.motherDateOfBirth);
            worker.spouseDateOfBirth = formatDate(worker.spouseDateOfBirth);
            worker.contactPersonContactNumber = Number(worker.contactPersonContactNumber);
            worker.passportDateOfIssue = formatDate(worker.passportDateOfIssue);
            worker.passportDateOfExpiry = formatDate(worker.passportDateOfExpiry);
            worker.yearGraduated = Number(worker.yearGraduated);
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
                    dateOfBirth: formatDate(document.querySelector(`#child-${i}-dateOfBirth`).value)
                };
                childrenData.push(child);
            }

            for (let i = 0; i < employmentCount; i++) {
                const employment = {
                    employmentID: i + 1,
                    country: document.querySelector(`#employment-${i}-country`).value,
                    workingPeriod: document.querySelector(`#employment-${i}-workingPeriod`).value,
                    date: formatDate(document.querySelector(`#employment-${i}-date`).value),
                    workDescription: Number(document.querySelector(`#employment-${i}-workDescription`).value)
                };
                employmentsData.push(employment);
            }
            console.log("children data: ", childrenData);
            console.log("employments data: ", employmentsData);
    
            worker.children = childrenData;
            worker.employments = employmentsData

            try {
                const createdWorker = await window.electronAPI.createSkilledWorker(worker);
                console.log('Skilled worker created:', createdWorker.children);
            } catch (error) {
                console.error('Error creating skilled worker:', error);
            }
        });
    }
});
