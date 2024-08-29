export const generateEntryHTML = ({
  documentNumber,
  holdingPersonName,
  DOB,
  gender,
  type,
  ...restFields
}) => {
  const displayFields = [
    "documentNumber",
    "holdingPersonName",
    "DOB",
    "genderSymbol",
    `${type}Type`,
  ];

  const maleSymbol = String.fromCharCode(0x2642);
  const femaleSymbol = String.fromCharCode(0x2640);
  const genderSymbol = gender === "male" ? maleSymbol : femaleSymbol;

  const fieldValues = {
    [`${type}Type`]: type,
    documentNumber,
    holdingPersonName,
    genderSymbol,
    DOB,
    ...restFields,
  };

  const visibleFields = Object.entries(fieldValues).filter(([key]) =>
    displayFields.includes(key)
  );

  return `
    <div class="item" 
         data-document-number="${documentNumber}" 
         data-holding-person-name="${holdingPersonName}" 
         data-dob="${DOB}" 
         data-gender="${gender}" 
         ${Object.entries(restFields)
           .map(([key, value]) => `data-${key.toLowerCase()}="${value}"`)
           .join(" ")}>
        <div class="row">
            ${visibleFields
              .map(([key, value]) => `<div data-label="${key}">${value}</div>`)
              .join("")}
            <div class="action__group">
               <button class="view__btn" type="button">View</button>
               <button class="edit__btn" type="button">Edit</button>
               <button class="delete__btn" type="button">Delete</button>
            </div>
        </div>
    </div>
  `;
};
