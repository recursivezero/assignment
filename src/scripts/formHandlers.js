import { generateEntryHTML } from "./entryHelpers.js";
let jsonData = [];
export const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const convertToDateInputFormat = (date) => {
  if (!date) return "";
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const navLinks = document.querySelectorAll(".nav-item");
const currentPath = window.location.pathname;
if (navLinks) {
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
}

export const deleteItem = (event) => {
  const item = event.target.closest(".item");
  if (!item) return;
  const documentNumber = item.dataset.documentNumber;
  if (!documentNumber) return;
  jsonData = jsonData.filter(
    (entry) => entry.documentNumber !== documentNumber
  );
  item.remove();
  updateTable(container);
};

export const handleSubmit = (
  event,
  form,
  currentEditItem,
  container,
  jsonData,
  updateTable,
  { type = "default", additionalFields = [] }
) => {
  event.preventDefault();

  const formData = new FormData(form);
  const documentNumber = formData.get("documentNumber")?.trim();
  const holdingPersonName = formData.get("holdingPersonName")?.trim();
  const DOB = formData.get("DOB")?.trim();
  const gender = formData.get("gender");
  const additionalValues = additionalFields.reduce((acc, field) => {
    acc[field] = formData.get(field)?.trim();
    return acc;
  }, {});

  if (documentNumber && holdingPersonName && DOB) {
    const entryData = {
      documentNumber,
      holdingPersonName,
      DOB: formatDate(DOB),
      gender,
      ...additionalValues,
    };

    if (currentEditItem) {
      const index = jsonData.findIndex(
        (item) => item.documentNumber === currentEditItem.dataset.documentNumber
      );
      jsonData[index] = entryData;
    } else {
      jsonData.push(entryData);
    }
    updateTable(container);
    resetForm(form);
    currentEditItem = null;
  } else {
    console.log("Please fill in all required fields.");
  }
};

export const createNewEntry = (
  entryData,
  container,
  { type = "default", additionalFields = [], entryCount }
) => {
  const newEntryHTML = generateEntryHTML({
    entryCount,
    ...entryData,
    type,
    additionalFields: additionalFields.reduce((acc, field) => {
      acc[field] = entryData[field];
      return acc;
    }, {}),
  });
  container.insertAdjacentHTML("beforeend", newEntryHTML);
};

export const updateEntry = ({
  item,
  documentNumber,
  holdingPersonName,
  DOB,
  gender,
  additionalFields = [],
}) => {
  if (!item) {
    console.error("Item is null or undefined.");
    return;
  }

  const numberElement = item.querySelector('[data-label="documentNumber"]');
  const nameElement = item.querySelector('[data-label="holdingPersonName"]');
  const dobElement = item.querySelector('[data-label="DOB"]');
  const genderElement = item.querySelector('[data-label="genderSymbol"]');

  if (numberElement) {
    numberElement.textContent = documentNumber;
  } else {
    console.error("Element with data-label 'documentNumber' not found.");
  }

  if (nameElement) {
    nameElement.textContent = holdingPersonName;
  } else {
    console.error("Element with data-label 'holdingPersonName' not found.");
  }

  if (dobElement) {
    dobElement.textContent = DOB;
  } else {
    console.error("Element with data-label 'DOB' not found.");
  }

  if (genderElement) {
    genderElement.textContent =
      gender === "male"
        ? String.fromCharCode(0x2642)
        : String.fromCharCode(0x2640);
  } else {
    console.error("Element with data-label 'genderSymbol' not found.");
  }

  additionalFields.forEach((field) => {
    const fieldElement = item.querySelector(`[data-label="${field}"]`);
    if (fieldElement) {
      fieldElement.textContent = additionalFields[field];
    } else {
      console.error(`Element with data-label '${field}' not found.`);
    }
  });
};

export const resetForm = (form) => {
  form.reset();
};

export const populateForm = (formId, data) => {
  const form = document.getElementById(formId);
  data.forEach((item) => {
    const element = form.querySelector(`#${item.id}`);
    if (element) {
      if (item.id.startsWith("gender")) {
        element.checked = true;
      } else if (element.type === "date") {
        element.value = convertToDateInputFormat(item.value);
      } else {
        element.value = item.value;
      }
    }
  });
};

export const generateImageData = (type, details) => {
  const detailMap = {
    aadhaar: [
      { label: "Number:", value: details.number },
      { label: "Name:", value: details.name },
      { label: "Gender:", value: details.gender === "♂" ? "Male" : "Female" },
      { label: "Date of Birth:", value: details.dob },
      { label: "Address:", value: details.address },
    ],
    dl: [
      { label: "Number:", value: details.number },
      { label: "Name:", value: details.name },
      { label: "Gender:", value: details.gender === "♂" ? "Male" : "Female" },
      { label: "Date of Birth:", value: details.dob },
      { label: "Date of Expiry:", value: details.doe },
    ],
  };

  return { [type]: detailMap[type] };
};
