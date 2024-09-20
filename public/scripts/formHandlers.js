import { generateEntryHTML } from "./entryHelpers.js";

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
  item.remove();
};

// Function to load entries from server
export function loadEntriesFromStorage(container, type, additionalFields) {
  fetch("/api/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Loaded data:", data);

      // Filter or process the data as needed and then populate the container
      const filteredData = data.filter((entry) => entry.type === type);

      // Use helper to generate HTML for each entry and append to container
      filteredData.forEach((entry) => {
        const entryHtml = generateEntryHtml(entry, additionalFields);
        container.insertAdjacentHTML("beforeend", entryHtml);
      });
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
}
export const handleSubmit = (
  event,
  form,
  currentEditItem,
  container,
  { type = "default", additionalFields = [] }
) => {
  event.preventDefault();

  const formData = new FormData(form);
  const documentNumber = formData.get("documentNumber")?.trim();
  const holdingPersonName = formData.get("holdingPersonName")?.trim();
  const DOB = formData.get("DOB")?.trim();
  const gender = formData.get("gender")?.trim();
  const additionalValues = additionalFields.reduce((acc, field) => {
    acc[field] = formData.get(field)?.trim();
    return acc;
  }, {});

  console.log("Form Data:", {
    documentNumber,
    holdingPersonName,
    DOB,
    gender,
    additionalValues,
  });

  if (documentNumber && holdingPersonName && DOB && gender) {
    const entryData = {
      documentNumber,
      holdingPersonName,
      DOB: formatDate(DOB),
      gender,
      ...additionalValues,
    };

    if (currentEditItem) {
      updateEntry({ item: currentEditItem, ...entryData, type });
    } else {
      createNewEntry(entryData, container, { type, additionalFields });
    }

    resetForm(form);
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
  }

  if (nameElement) {
    nameElement.textContent = holdingPersonName;
  }

  if (dobElement) {
    dobElement.textContent = DOB;
  }

  if (genderElement) {
    genderElement.textContent =
      gender === "male"
        ? String.fromCharCode(0x2642)
        : String.fromCharCode(0x2640);
  }

  item.dataset.documentNumber = documentNumber;
  item.dataset.holdingPersonName = holdingPersonName;
  item.dataset.dob = DOB;
  item.dataset.gender = gender;

  additionalFields.forEach((field) => {
    const fieldElement = item.querySelector(`[data-label="${field}"]`);
    if (fieldElement) {
      fieldElement.textContent = additionalFields[field];
    }
    item.dataset[field] = additionalFields[field];
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
