import './Action.js';
document.addEventListener('DOMContentLoaded', () => {
    const aadhaarForm = document.getElementById("aadhaarForm");
    const saveButton = document.querySelector(".saveButton");
    const resetButton = document.querySelector(".resetButton");
    const container = document.querySelector(".container");
    const canvasContainer = document.getElementById("canvasContainer");
    const downloadButton = document.getElementById("downloadButton");
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvasContainer.appendChild(canvas);

    let entryCount = 0;
    let currentEditItem = null;

    const handleSubmit = (event) => {
        event.preventDefault();

        const documentNumber = aadhaarForm.querySelector("#documentNumber_aadhaar").value.trim();
        const holdingPersonName = aadhaarForm.querySelector("#holdingPersonName_aadhaar").value.trim();
        const DOB = aadhaarForm.querySelector("#DOB_aadhaar").value.trim();
        const gender = aadhaarForm.querySelector('input[name="gender"]:checked').value;
        const address = aadhaarForm.querySelector("#aadhaarAddress").value.trim(); // Address added here

        if (documentNumber && holdingPersonName && DOB) {
            if (currentEditItem) {
                updateEntry(currentEditItem, documentNumber, holdingPersonName, DOB, gender,address);
            } else {
                createNewEntry(documentNumber, holdingPersonName, DOB, gender, address);
            }
            resetForm();
        } else {
            console.log("Please fill in all required fields.");
        }
    };

    const formatDOB = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };

    const createNewEntry = (documentNumber, holdingPersonName, DOB, gender,address) => {
        entryCount++;
        const maleSymbol = String.fromCharCode(0x2642); 
        const femaleSymbol = String.fromCharCode(0x2640);
        const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;
        const formattedDOB = formatDOB(DOB);

        container.insertAdjacentHTML('beforeend', `
            <div class="item" data-entry-id="${entryCount}" data-address="${address}"> <!-- Store address in data attribute -->
                <div>${entryCount}</div>
                <div>Aadhaar</div>
                <div>${documentNumber}</div>
                <div>${holdingPersonName}</div>
                <div>${genderSymbol}</div>
                <div>${formattedDOB}</div>
                <div>
                    <button class="view-btn" type="button">View</button>
                    <button class="edit-btn" type="button">Edit</button>
                    <button class="delete-btn" type="button">Delete</button>
                </div>
            </div>
        `);
    };

    const updateEntry = (item, documentNumber, holdingPersonName, DOB, gender,address) => {
        const maleSymbol = String.fromCharCode(0x2642); 
        const femaleSymbol = String.fromCharCode(0x2640); 
        const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;
        const formattedDOB = formatDOB(DOB);

        item.querySelector("div:nth-child(3)").textContent = documentNumber;
        item.querySelector("div:nth-child(4)").textContent = holdingPersonName;
        item.querySelector("div:nth-child(5)").textContent = genderSymbol;
        item.querySelector("div:nth-child(6)").textContent = formattedDOB;
        item.setAttribute("data-address", address);

        currentEditItem = null;
    };

    const resetForm = () => {
        aadhaarForm.reset();
        currentEditItem = null;
    };

    const handleReset = () => {
        resetForm();
    };

    if (resetButton) {
        resetButton.addEventListener("click", handleReset);
    } else {
        console.error('Reset button not found');
    }

    if (saveButton) {
        saveButton.addEventListener("click", handleSubmit);
    } else {
        console.error('Save button not found');
    }
})