import './app.js'; 

document.addEventListener('DOMContentLoaded', () => {
    const aadhaarForm = document.getElementById("aadhaarForm");
    const container = document.querySelector(".container");
    const canvasContainer = document.getElementById("canvasContainer");
    const downloadButton = document.getElementById("downloadButton");
    const canvas = document.getElementById('aadhaarCanvas');
    const context = canvas.getContext('2d');

    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            deleteItem(event);
        } else if (event.target.classList.contains("edit-btn")) {
            editItem(event);
        } else if (event.target.classList.contains("view-btn")) {
            viewFormData(event);
        }
    });

    const deleteItem = (event) => {
        const item = event.target.closest(".item");
        item.remove();
    };

    const editItem = (event) => {
        const item = event.target.closest(".item");
        const documentNumber = item.querySelector("div:nth-child(3)").textContent.trim();
        const holdingPersonName = item.querySelector("div:nth-child(4)").textContent.trim();
        const genderSymbol = item.querySelector("div:nth-child(5)").textContent.trim();
        const DOB = item.querySelector("div:nth-child(6)").textContent.trim();

        const maleSymbol = String.fromCharCode(0x2642);
        const gender = genderSymbol === maleSymbol ? "male" : "female";

        
        aadhaarForm.querySelector("#documentNumber_aadhaar").value = documentNumber;
        aadhaarForm.querySelector("#holdingPersonName_aadhaar").value = holdingPersonName;

        
        const dobFormatted = convertToDateInputFormat(DOB);
        aadhaarForm.querySelector("#DOB_aadhaar").value = dobFormatted;
        
        aadhaarForm.querySelector(`#gender_${gender}`).checked = true;
    };

    const convertToDateInputFormat = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`; 
    };

    const viewFormData = (event) => {
        const item = event.target.closest(".item");
        const documentNumber = item.querySelector("div:nth-child(3)").textContent.trim();
        const holdingPersonName = item.querySelector("div:nth-child(4)").textContent.trim();
        const DOB = item.querySelector("div:nth-child(6)").textContent.trim();
        const genderSymbol = item.querySelector("div:nth-child(5)").textContent.trim();

        const maleSymbol = String.fromCharCode(0x2642);
        const femaleSymbol = String.fromCharCode(0x2640);
        const gender = genderSymbol === maleSymbol ? "male" : "female";
        const genderSymbolText = gender === "male" ? maleSymbol : femaleSymbol;

        generateImage(documentNumber, holdingPersonName, genderSymbolText, DOB);
    };

    const generateImage = (documentNumber, holdingPersonName, genderSymbol, DOB) => {
        let canvasWidth = 400;
        let canvasHeight = 300;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context.fillStyle = '#D8BFD8';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#333';
        context.font = 'bold 45px Arial';
        context.textAlign = 'left';

        const genderSymbolText = genderSymbol === String.fromCharCode(0x2642) ? "Male" : "Female";

        let text = `--Aadhaar Card--\n# ${documentNumber}\nName: ${holdingPersonName}\nGender: ${genderSymbolText}\nDOB: ${DOB}`;

        const lines = text.split('\n');
        lines.forEach((line, index) => {
            if (line.includes('Name:')) {
                context.font = 'bold 16px Arial';
            } else {
                context.font = 'bold 14px Arial';
            }

            context.fillText(line, 40, 40 + index * 30);
        });

        canvasContainer.style.display = 'block';
        downloadButton.style.display = 'block';

        downloadButton.onclick = () => {
            const imageURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = `Aadhaar_${new Date().getTime()}.png`; 
            link.click();

            canvasContainer.style.display = 'none';
            downloadButton.style.display = 'none';
        };
    };
});