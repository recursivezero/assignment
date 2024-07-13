const documentForm = document.getElementById("documentForm");
const documentTypeSelect = document.getElementById("documentType");
const documentFieldsDiv = document.getElementById("documentFields");
const container = document.querySelector(".container");
const saveButton = document.querySelector(".saveButton");
const resetButton = document.querySelector(".resetButton");

let entryCount = 0;

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

    createNewEntry(selectedDocumentType, documentNumber, holdingPersonName, DOB, gender);
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
    // Define the gender symbols
    const maleSymbol = String.fromCharCode(0x2642); // Male symbol
    const femaleSymbol = String.fromCharCode(0x2640); // Female symbol
    const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;
    tableBody.insertAdjacentHTML('beforeend', `
        <div class="item">
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
        <div class='formContainer' id='driver'>
            <label for="documentNumber_drivingLicense">DL Number</label>
            <input type="text" id="documentNumber_drivingLicense" name="documentNumber" required>
            <label for="holdingPersonName_drivingLicense">Name</label>
            <input type="text" id="holdingPersonName_drivingLicense" name="holdingPersonName" required>
            <label for="DOB_drivingLicense">Date of issue</label>
            <input type="date" id="DOB_drivingLicense" name="DOB" required>
        
             <label for="DOB_panCard">Date of Birth</label>
            <input type="date" id="DOB_panCard" name="DOB" required>
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
        <div class='formContainer' id='pan'>
            <label for="documentNumber_panCard">PAN Number</label>
            <input type="text" id="documentNumber_panCard" name="documentNumber" required>
            <label for="holdingPersonName_panCard">Name</label>
            <input type="text" id="holdingPersonName_panCard" name="holdingPersonName" required>
            <label for="DOB_panCard">Date of Birth</label>
            <input type="date" id="DOB_panCard" name="DOB" required>
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
    // Edit item code here
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
        backgroundImage.src = '/assets/images/gery.jpg';
        backgroundColor = '#F4A460';
        canvasWidth = 500;
        canvasHeight = 300;
    } else if (mappedDocumentType === "PAN") {
        backgroundImage.src = '/assets/images/gery.jpg';
        backgroundColor = '#FFFAFA';
        canvasWidth = 500;
        canvasHeight = 300;
    } else {
        backgroundImage.src = '/assets/images/gery.jpg';
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
    backgroundImage.src = '/assets/images/gery.jpg'; 
};

const formatDOB = (DOB) => {
    const parts = DOB.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};
