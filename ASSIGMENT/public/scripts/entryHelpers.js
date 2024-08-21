export function generateEntryHTML(entryCount, documentNumber, holdingPersonName, DOB, gender, type, additionalFields = {}) {
  const maleSymbol = String.fromCharCode(0x2642);
  const femaleSymbol = String.fromCharCode(0x2640);
  const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;

  return `
    <div class="item" data-document-number="${documentNumber}" data-holding-person-name="${holdingPersonName}" data-dob="${DOB}" data-gender="${gender}" ${Object.entries(additionalFields).map(([key, value]) => `data-${key.toLowerCase()}="${value}"`).join(" ")}>
        <div class="row">
            <div data-label="entryCount">${entryCount}</div>
            <div data-label="${type}Type">${type}</div>
            <div data-label="documentNumber">${documentNumber}</div>
            <div data-label="holdingPersonName">${holdingPersonName}</div>
            <div data-label="genderSymbol">${genderSymbol}</div>
            <div data-label="DOB">${DOB}</div>
            ${Object.entries(additionalFields).map(([key, value]) => `<div style="display:none;" data-label="${key}">${value}</div>`).join("")}
        </div>
        <div class="action__group">
            <button class="view__btn" type="button">View</button>
            <button class="edit__btn" type="button">Edit</button>
            <button class="delete__btn" type="button">Delete</button>
        </div>
    </div>
  `;
}

