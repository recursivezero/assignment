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
        const address = item.getAttribute("data-address").trim();

        const maleSymbol = String.fromCharCode(0x2642);
        const femaleSymbol = String.fromCharCode(0x2640);
        const gender = genderSymbol === maleSymbol ? "male" : "female";
        const genderSymbolText = gender === "male" ? maleSymbol : femaleSymbol;

        generateImage(documentNumber, holdingPersonName, genderSymbolText, DOB,address);
    };
    const generateImage = (documentNumber, holdingPersonName, genderSymbol, DOB, address) => { 
        let canvasWidth = 400;
        let canvasHeight = 300;
    
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    
        context.fillStyle = '#D8BFD8';
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        context.fillStyle = '#8B0000';
        context.font = 'bold 22px Arial';
        context.textAlign = 'center';
    
        
        context.fillText('--Aadhaar Card--', canvasWidth / 2, 50);
    
        
        context.textAlign = 'left';
    
        
        const details = [
            { label: 'U-id:', value: documentNumber },
            { label: 'Name:', value: holdingPersonName },
            { label: 'Gender:', value: genderSymbol === String.fromCharCode(0x2642) ? "Male" : "Female" },
            { label: 'DOB:', value: DOB },
            { label: 'Address:', value: address },
        ];
    
        
        const startX = 40;
        let startY = 100;
        const lineHeight = 30;
        const labelValueGap = 10; 
    
        
        details.forEach((detail, index) => {
            context.fillStyle = '#333';
            context.font = 'bold 16px Arial';
            context.fillText(detail.label, startX, startY + index * lineHeight);
    
            context.fillStyle = '#333';
            context.font = 'bold 14px Arial';
            context.fillText(detail.value, startX + 80 + labelValueGap, startY + index * lineHeight); // Reduced the gap between label and value
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
})    