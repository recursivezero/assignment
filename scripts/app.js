const documentForm = document.getElementById("documentForm");
const documentTypeSelect = document.getElementById("documentType");
const documentFieldsDiv = document.getElementById("documentFields");
const container = document.querySelector(".container");


const handleSubmit = (event) => {
    event.preventDefault();

    const selectedDocumentType = documentTypeSelect.value;
    const documentNumberInput = documentForm.querySelector("#documentNumber_" + selectedDocumentType);
    const holdingPersonNameInput = documentForm.querySelector("#holdingPersonName_" + selectedDocumentType);
    const DOBInput = documentForm.querySelector("#DOB_" + selectedDocumentType);

    const documentNumber = documentNumberInput.value;
    const holdingPersonName = holdingPersonNameInput.value;
    const DOB = DOBInput.value;

    createNewEntry(selectedDocumentType, documentNumber, holdingPersonName, DOB);
    resetForm();
};

documentForm.addEventListener("submit", handleSubmit);


const  createNewEntry = (selectedDocumentType, documentNumber, holdingPersonName, DOB)=>{
    const tableBody = document.querySelector(".container");
    
tableBody.insertAdjacentHTML('beforeend', `
<div class="item">
    <div># ${selectedDocumentType}</div>
    <div> ${documentNumber}</div>
    <div> ${holdingPersonName}</div>
    <div> ${DOB}</div>
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
};

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", handleReset);

function handleReset() {

const formFields = documentForm.querySelectorAll('input, textarea, select');
formFields.forEach(field => {
    field.value = ''; 
});

}


const populateFields = (selectedDocumentType) => {
let documentFieldsHTML = "";

if (selectedDocumentType === "Aadhaar") {
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
        <div class='formContainer' id='aadhar'>
            <label for="documentNumber_aadhaar">Aadhaar Number:</label>
            <input type="number" id="documentNumber_aadhaar" name="documentNumber" required>
            <label for="holdingPersonName_aadhaar">Name:</label>
            <input type="text" id="holdingPersonName_aadhaar" name="holdingPersonName" required>
            <select id="gender" name="gender" required>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
            </select>
            <label for="DOB_aadhaar">Date of Birth:</label>
            <input type="date" id="DOB_aadhaar" name="DOB" required>
            <label for="aadhaarAddress">Address:</label>
            <textarea id="aadhaarAddress" name="aadhaarAddress" required></textarea>
            </div>
        `;
};
const populateDrivingLicenseFields = () => {
    return `
        <div class='formContainer' id='driver'>
            <label for="documentNumber_drivingLicense">Driving License Number:</label>
            <input type="number" id="documentNumber_drivingLicense" name="documentNumber" required>
            <label for="holdingPersonName_drivingLicense">Name:</label>
            <input type="text" id="holdingPersonName_drivingLicense" name="holdingPersonName" required>
            <label for="DOB_drivingLicense">Date of issue:</label>
            <input type="date" id="DOB_drivingLicense" name="DOB" required>
            <label for="expiry">Date of Expiry:</label>
            <input type="date" id="DOE" name="DOE" required>
            </div>
        `;
};
const populatePanCardFields = () => {
    return `
        <div class='formContainer' id='pan'>
            <label for="documentNumber_panCard">PAN Card Number:</label>
            <input type="number" id="documentNumber_panCard" name="documentNumber" required>
            <label for="holdingPersonName_panCard">Name:</label>
            <input type="text" id="holdingPersonName_panCard" name="holdingPersonName" required>
            <label for="DOB_panCard">Date of Birth:</label>
            <input type="date" id="DOB_panCard" name="DOB" required>
            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
            </select>
            </div>
        `;
};
const documentMapper = new Map([
    ['aadhaar', 'Aadhaar'],
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
    const documentType = item.querySelector("div:nth-child(1)").textContent.split("#")[1].trim();
    const documentNumber = item.querySelector("div:nth-child(2)").textContent.trim();
    const holdingPersonName = item.querySelector("div:nth-child(3)").textContent.trim();
    const DOB = item.querySelector("div:nth-child(4)").textContent.trim();

    documentTypeSelect.value = documentType;
    const documentNumberInput = documentForm.querySelector("#documentNumber_" + documentType);
    if (documentNumberInput) {
        documentNumberInput.value = documentNumber;
    }
    const holdingPersonNameInput = documentForm.querySelector("#holdingPersonName_" + documentType);
    if (holdingPersonNameInput) {
        holdingPersonNameInput.value = holdingPersonName;
    }
    const DOBInput = documentForm.querySelector("#DOB_" + documentType);
    if (DOBInput) {
        DOBInput.value = DOB;
    }

    documentTypeSelect.dispatchEvent(new Event('change'));

};
const viewItem = (event) => {
    const item = event.target.closest(".item");
const documentType = item.querySelector("div:nth-child(1)").textContent.split("#")[1].trim();
const documentNumber = item.querySelector("div:nth-child(2)").textContent.trim();
const holdingPersonName = item.querySelector("div:nth-child(3)").textContent.trim();
const DOB = item.querySelector("div:nth-child(4)").textContent.trim();

generateImage(documentType, documentNumber, holdingPersonName, DOB);
};

const generateImage =(documentType, documentNumber, holdingPersonName,DOB) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let canvasWidth = 600; 
    let canvasHeight = 400;

    const backgroundImage = new Image();
    let backgroundColor = '#ffe6e6'; 

    const mappedDocumentType = documentMapper.get(documentType.toLowerCase());

    
if (mappedDocumentType === "DrivingLicense") {
    backgroundImage.src = '../styles/images/gery.jpg';
    backgroundColor = '#F4A460';
    canvasWidth = 500;
    canvasHeight = 300;
} else if (mappedDocumentType === "PAN") {
    backgroundImage.src = '../styles/images/image.jpg';
    backgroundColor = 'FFFAFA';
    canvasWidth = 500;
    canvasHeight = 300;
} else {
    backgroundImage.src = '../styles/images/tricolour.jpg';
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
        if (mappedDocumentType === "Aadhaar") {
            text = `--Aadhaar Card--\n#: ${documentNumber}\nName: ${holdingPersonName}\nDOB: ${formattedDOB}`;
        } else if (mappedDocumentType === "DrivingLicense") {
            text = `--Driving License--\n#: ${documentNumber}\nName: ${holdingPersonName}\nDOB: ${formattedDOB}`;
        } else if (mappedDocumentType === "PAN") {
            text = `--PAN Card--\n#: ${documentNumber}\nName: ${holdingPersonName}\nDOB: ${formattedDOB}`;
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
   
   
        
        




    const image=canvas.toDataURL("image/png");

    const newWindow = window.open();
    newWindow.document.write('<img src="' + image + '" />');
};

};
const formatDOB = (DOB) => {
const parts = DOB.split('-');
return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
