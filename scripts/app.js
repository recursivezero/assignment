const documentForm = document.getElementById("documentForm");
const documentTypeSelect = document.getElementById("documentType");
const documentFieldsDiv = document.getElementById("documentFields");
const container = document.querySelector(".container");
const saveButton = document.querySelector(".saveButton");
const resetButton = document.querySelector(".resetButton");

let entryCount = 0;
let currentEditItem = null;

const handleSubmit = (event) => {
    event.preventDefault();

    const selectedDocumentType = documentTypeSelect.value;
    const documentNumberInput = documentForm.querySelector("#documentNumber_" + selectedDocumentType);
    const holdingPersonNameInput = documentForm.querySelector("#holdingPersonName_" + selectedDocumentType);
    const DOBInput = documentForm.querySelector("#DOB_" + selectedDocumentType);
    const genderInput = documentForm.querySelector('input[name="gender"]:checked');

    const documentNumber = documentNumberInput.value;
    const holdingPersonName = holdingPersonNameInput.value;
    const DOB = DOBInput.value;
    const gender = genderInput.value;

    saveButton.classList.remove("active");

    if (currentEditItem) {
        // Update the existing entry
        updateEntry(currentEditItem, selectedDocumentType, documentNumber, holdingPersonName, DOB, gender);
    } else {
        // Create a new entry
        createNewEntry(selectedDocumentType, documentNumber, holdingPersonName, DOB, gender);
    }

    resetForm();

    // Hide the form after saving the entry
    documentFieldsDiv.style.display = 'none';
    saveButton.style.display = 'none';
    resetButton.style.display = 'none';
};

documentForm.addEventListener("submit", handleSubmit);

const createNewEntry = (selectedDocumentType, documentNumber, holdingPersonName, DOB, gender) => {
    entryCount++;
    const tableBody = document.querySelector(".container");
    const maleSymbol = String.fromCharCode(0x2642); // Male symbol
    const femaleSymbol = String.fromCharCode(0x2640); // Female symbol
    const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;
    tableBody.insertAdjacentHTML('beforeend', `
        <div class="item" data-entry-id="${entryCount}">
            <div>${entryCount}</div>
            <div>${selectedDocumentType}</div>
            <div>${documentNumber}</div>
            <div>${holdingPersonName}</div>
            <div>${genderSymbol}</div>
            <div>${DOB}</div>
            <div>
                <button class="view-btn" type="button">View</button>
                <button class="delete-btn" type="button">Delete</button>
                <button class="edit-btn" type="button">Edit</button>
            </div>
        </div>
    `);
};

const updateEntry = (item, selectedDocumentType, documentNumber, holdingPersonName, DOB, gender) => {
    const maleSymbol = String.fromCharCode(0x2642); // Male symbol
    const femaleSymbol = String.fromCharCode(0x2640); // Female symbol
    const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;

    item.querySelector("div:nth-child(2)").textContent = selectedDocumentType;
    item.querySelector("div:nth-child(3)").textContent = documentNumber;
    item.querySelector("div:nth-child(4)").textContent = holdingPersonName;
    item.querySelector("div:nth-child(5)").textContent = genderSymbol;
    item.querySelector("div:nth-child(6)").textContent = DOB;

    currentEditItem = null;
};

const resetForm = () => {
    documentForm.reset();
    saveButton.style.display = 'none';
    resetButton.style.display = 'none';
};

const handleReset = () => {
    documentForm.reset();
    const formFields = documentForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.value = '';
    });
    saveButton.style.display = 'none';
    resetButton.style.display = 'none';
};

resetButton.addEventListener("click", handleReset);

const populateFields = (selectedDocumentType) => {
    let documentFieldsHTML = "";

    if (selectedDocumentType === "aadhaar") {
        documentFieldsHTML = populateAadhaarFields();
    } else if (selectedDocumentType === "DrivingLicense") {
        documentFieldsHTML = populateDrivingLicenseFields();
    } else if (selectedDocumentType === "PAN") {
        documentFieldsHTML = populatePanCardFields();
    }

    return documentFieldsHTML;
};

const populateAadhaarFields = () => {
    return `
        <div class='formContainer' id='aadhaar'>
            <label for="documentNumber_aadhaar">Aadhaar Number</label>
            <input type="text" id="documentNumber_aadhaar" name="documentNumber" required>
            <label for="holdingPersonName_aadhaar">Name</label>
            <input type="text" id="holdingPersonName_aadhaar" name="holdingPersonName" required>
            <label for="DOB_aadhaar">Date of Birth</label>
            <input type="date" id="DOB_aadhaar" name="DOB" required>
            <label for="aadhaarAddress">Address</label>
            <textarea id="aadhaarAddress" name="aadhaarAddress" required ></textarea>
            <div class="gender-container">
                <label for="gender">Gender</label>
                <div class="gender-selection">
                    <label class="gender-label">
                        <input type="radio" id="gender_male" name="gender" value="male" required checked> Male
                    </label>
                    <label class="gender-label">
                        <input type="radio" id="gender_female" name="gender" value="female" required> Female
                    </label>
                </div>
            </div>
        </div>
    `;
};
const populateDrivingLicenseFields = () => {
    return `
        <div class='formContainer' id='drivinglicense'>
            <label for="documentNumber_drivinglicense">DL Number</label>
            <input type="text" id="documentNumber_drivinglicense" name="documentNumber" required>
            <label for="holdingPersonName_drivinglicense">Name</label>
            <input type="text" id="holdingPersonName_drivinglicense" name="holdingPersonName" required>
            <label for="DOI_drivinglicense">Date of Issue</label>
            <input type="date" id="DOI_drivinglicense" name="DOI" required>
            <label for="DOB_drivinglicense">Date of Birth</label>
            <input type="date" id="DOB_drivinglicense" name="DOB" required>
            <div class="gender-container">
                <label for="gender">Gender</label>
                <div class="gender-selection">
                    <label class="gender-label">
                        <input type="radio" id="gender_male" name="gender" value="male" required checked> Male
                    </label>
                    <label class="gender-label">
                        <input type="radio" id="gender_female" name="gender" value="female" required> Female
                    </label>
                </div>
            </div>
        </div>
    `;
};

const populatePanCardFields = () => {
    return `
        <div class='formContainer' id='pancard'>
            <label for="documentNumber_pancard">PAN Number</label>
            <input type="text" id="documentNumber_pancard" name="documentNumber" required>
            <label for="holdingPersonName_pancard">Name</label>
            <input type="text" id="holdingPersonName_pancard" name="holdingPersonName" required>
            <label for="DOB_pancard">Date of Birth</label>
            <input type="date" id="DOB_pancard" name="DOB" required>
            <div class="gender-container">
                <label for="gender">Gender</label>
                <div class="gender-selection">
                    <label class="gender-label">
                        <input type="radio" id="gender_male" name="gender" value="male" required checked> Male
                    </label>
                    <label class="gender-label">
                        <input type="radio" id="gender_female" name="gender" value="female" required> Female
                    </label>
                </div>
            </div>
        </div>
    `;
};

const documentMapper = new Map([
    ['aadhaar', 'aadhaar'],
    ['pancard', 'PAN'],
    ['drivinglicense', 'DrivingLicense']
]);

documentTypeSelect.addEventListener("change", () => {
    const selectedDocumentType = documentTypeSelect.value.toLowerCase();
    const mappedDocumentType = documentMapper.get(selectedDocumentType);
    let documentFieldsHTML = "";

    if (mappedDocumentType) {
        documentFieldsHTML = populateFields(mappedDocumentType);
    }

    documentFieldsDiv.innerHTML = documentFieldsHTML;
    documentFieldsDiv.style.display = "block";
    saveButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
});

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        deleteItem(event);
    } else if (event.target.classList.contains("edit-btn")) {
        editItem(event);
    } else if (event.target.classList.contains("view-btn")) {
        viewItem(event);
    }
});

const deleteItem = (event) => {
    const item = event.target.closest(".item");
    item.remove();
};
const editItem = (event) => {
    const item = event.target.closest(".item");
    const documentType = item.querySelector("div:nth-child(2)").textContent.trim();
    const documentNumber = item.querySelector("div:nth-child(3)").textContent.trim();
    const holdingPersonName = item.querySelector("div:nth-child(4)").textContent.trim();
    const genderSymbol = item.querySelector("div:nth-child(5)").textContent.trim();
    const DOB = item.querySelector("div:nth-child(6)").textContent.trim();

    const maleSymbol = String.fromCharCode(0x2642);
    const gender = genderSymbol === maleSymbol ? "male" : "female";

    currentEditItem = item;

    documentTypeSelect.value = documentType.toLowerCase();
    const mappedDocumentType = documentMapper.get(documentType.toLowerCase());

    if (mappedDocumentType) {
        documentFieldsDiv.innerHTML = populateFields(mappedDocumentType);
        documentFieldsDiv.style.display = "block";
        saveButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';

        const documentNumberField = documentForm.querySelector("#documentNumber_" + mappedDocumentType);
        if (documentNumberField) {
            documentNumberField.value = documentNumber;
        }

        const holdingPersonNameField = documentForm.querySelector("#holdingPersonName_" + mappedDocumentType);
        if (holdingPersonNameField) {
            holdingPersonNameField.value = holdingPersonName;
        }

        const DOBField = documentForm.querySelector("#DOB_" + mappedDocumentType);
        if (DOBField) {
            DOBField.value = DOB;
        }

        const genderField = documentForm.querySelector('input[name="gender"][value="' + gender + '"]');
        if (genderField) {
            genderField.checked = true;
        }

        // Additional fields specific to each document type
        if (mappedDocumentType === 'drivinglicense') {
            const DOIField = documentForm.querySelector("#DOI_drivinglicense");
            if (DOIField) {
                DOIField.value = item.querySelector("div:nth-child(7)").textContent.trim();
            }
        }
    }
};

const viewItem = (event) => {
    const item = event.target.closest(".item");
    const documentType = item.querySelector("div:nth-child(2)").textContent.trim();
    const documentNumber = item.querySelector("div:nth-child(3)").textContent.trim();
    const holdingPersonName = item.querySelector("div:nth-child(4)").textContent.trim();
    const genderSymbol = item.querySelector("div:nth-child(5)").textContent.trim();
    const DOB = item.querySelector("div:nth-child(6)").textContent.trim();

    generateImage(documentType, documentNumber, holdingPersonName, genderSymbol, DOB);
};

const generateImage = (documentType, documentNumber, holdingPersonName, genderSymbol, DOB) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let canvasWidth = 600;
    let canvasHeight = 400;

    const backgroundImage = new Image();
    let backgroundColor = '#ffe6e6';

    const mappedDocumentType = documentMapper.get(documentType.toLowerCase());

    if (mappedDocumentType === "DrivingLicense") {
        backgroundImage.src = '/styles/images/gery.jpg';
        backgroundColor = '#F4A460';
        canvasWidth = 500;
        canvasHeight = 300;
    } else if (mappedDocumentType === "PAN") {
        backgroundImage.src = '/styles/images/gery.jpg';
        backgroundColor = '#FFFAFA';
        canvasWidth = 500;
        canvasHeight = 300;
    } else {
        backgroundImage.src = '/styles/images/gery.jpg';
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    backgroundImage.onload = () => {
        const scaleFactor = Math.min(canvas.width / backgroundImage.width, canvas.height / backgroundImage.height);
        const width = backgroundImage.width * scaleFactor;
        const height = backgroundImage.height * scaleFactor;
        const offsetX = (canvas.width - width) / 2;
        const offsetY = (canvas.height - height) / 2;

        context.drawImage(backgroundImage, offsetX, offsetY, width, height);

        context.fillStyle = '#333';
        context.font = 'bold 22px Arial';
        context.textAlign = 'left';

        const formattedDOB = formatDOB(DOB);

        let text = '';
        if (mappedDocumentType === "aadhaar") {
            text = `--Aadhaar Card--\n ${documentNumber}\nName: ${holdingPersonName}\nGender: ${genderSymbol}\nDOB: ${formattedDOB}`;
        } else if (mappedDocumentType === "DrivingLicense") {
            text = `--Driving License--\n ${documentNumber}\nName: ${holdingPersonName}\nGender: ${genderSymbol}\nDOB: ${formattedDOB}`;
        } else if (mappedDocumentType === "PAN") {
            text = `--PAN Card--\n ${documentNumber}\nName: ${holdingPersonName}\nGender: ${genderSymbol}\nDOB: ${formattedDOB}`;
        } else {
            console.log("Document Type is unrecognized:", documentType);
        }

        const lines = text.split('\n');
        lines.forEach((line, index) => {
            if (line.includes('Name:')) {
                const nameIndex = line.indexOf('Name:') + 6;
                const name = line.substring(nameIndex);
                context.font = 'italic bold 22px Arial';
                context.fillText(`Name: ${name}`, 20, 50 + index * 50);
            } else {
                context.fillText(line, 20, 50 + index * 50);
            }
        });

        const image = canvas.toDataURL("image/png");

        const downloadLink = document.createElement('a');
        downloadLink.href = image;
        downloadLink.download = `${documentType}_document.png`;
        downloadLink.textContent = 'Download Image';
        downloadLink.style.display = 'block';
        downloadLink.style.marginTop = '10px';
        downloadLink.id = 'downloadLink'; // Add id for styling

        const imageContainer = document.createElement('div');
        imageContainer.id = 'generatedImageContainer';
        imageContainer.style.marginBottom = '20px';

        const imageElement = document.createElement('img');
        imageElement.id = 'generatedImage';
        imageElement.src = image;

        imageContainer.appendChild(imageElement);
        imageContainer.appendChild(downloadLink);

        const existingImageContainer = document.getElementById('generatedImageContainer');
        if (existingImageContainer) {
            existingImageContainer.remove();
        }

        container.insertAdjacentElement('beforebegin', imageContainer);

        downloadLink.addEventListener("click", () => {
            setTimeout(() => {
                imageElement.remove();
                downloadLink.remove();
            }, 1000); 
        });
    };
    backgroundImage.src = '/styles/images/gery.jpg'; 
};

const formatDOB = (DOB) => {
    const parts = DOB.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};
