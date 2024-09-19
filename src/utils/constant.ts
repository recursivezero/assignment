export const SERVER_HOST = "http://localhost:3000";

export const AADHAAR_FIELDS = [
  {
    id: "doc-number",
    label: "Aadhaar Number",
    type: "text",
    name: "id",
    placeholder: "1234 5678 9012",
    pattern: "[0-9]{12}",
    required: true,
  },
  {
    id: "doc-name",
    label: "Name on Aadhaar",
    type: "text",
    name: "name",
    placeholder: "RAM SINGH",
    required: true,
  },
  {
    id: "doc-dob",
    label: "Date of Birth",
    type: "date",
    name: "dob",
    required: true,
  },
  {
    id: "doc-address",
    label: "Aadhaar Address",
    type: "textarea",
    name: "address",
    placeholder: "as per aadhaar",
    required: true,
  },
];
