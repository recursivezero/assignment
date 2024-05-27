# SafeDocs:-

# Project Overview:-
SafeDocs is an offline Progressive Web Application (PWA) developed to securely store and manage personal documents such as Aadhaar Card, Driving License, and PAN Card. The application provides a clean and user-friendly interface for entering document details, saving them locally on the device, and viewing, editing, or deleting these details. Additionally, users can convert the saved details into an image for easy sharing. The application is designed to work seamlessly without an internet connection and ensures data persistence and security.

# Features:-

User Interface (UI)->

Input Fields: The application provides input fields for entering details of various documents including Aadhaar Card, Driving License, and PAN Card.
Save Button: A button to save the entered details locally on the device.
View, Edit, and Delete: Options to view, edit, and delete the saved document details.
Reset Button: A button to reset the form fields.
Download as Picture
Convert to Image: The application allows users to convert the saved details into an image.
Download Image: Users can download the generated image for easy sharing.
Local Storage
Data Persistence: Utilizes local storage to save the entered details securely, ensuring data persistence even if the app is closed or the device is restarted.
Offline Functionality
Seamless Offline Experience: The PWA works seamlessly without an internet connection, clearly communicating to the user when offline.
Security
Data Encryption: Implements basic encryption techniques to secure the stored data on the device.
Sensitive Information Handling: Follows best practices for handling sensitive information.

# Project Structure
HTML-
The HTML structure consists of:

A header with the application title.
A main section with two sections:
A form section for entering document details.
A section for displaying saved document details.
A footer with copyright information.
Links to external CSS and JavaScript files.

CSS-
The CSS file styles the application, ensuring a responsive and user-friendly interface. It includes styles for the main elements, form elements, buttons, and container for saved document details.

JavaScript-
The JavaScript file handles the core functionality of the application:

Form Submission: Handles form submission, extracting entered details, and creating new entries.
Dynamic Form Fields: Dynamically generates form fields based on the selected document type.
Local Storage Operations: Manages saving, retrieving, editing, and deleting details from local storage.
Image Generation: Converts the saved details into an image using the Canvas API.
Detailed Steps
1. Setting Up the HTML Structure
The HTML structure provides a clean layout for the application. Key components include:

A header with the title "Offline Document Storage".
A main section with:
A form for entering document details.
A section for displaying saved document details with options to view, edit, and delete entries.
A footer with copyright information.
2. Styling with CSS
The CSS file styles the application to ensure a responsive and user-friendly interface:

Body: Basic styling for the body element.
Main Section: Padding and margin adjustments.
Container: Flexbox layout for the container displaying saved document details.
Item: Styling for individual items within the container.
Buttons: Styles for save, reset, view, edit, and delete buttons with hover effects.
Form Elements: Styles for input fields, labels, and select elements.
3. Implementing Functionality with JavaScript
The JavaScript file handles the core functionality of the application:

Form Submission and Handling
handleSubmit: Extracts details from the form and creates a new entry.
resetForm: Resets the form fields after submission.
populateFields: Dynamically generates form fields based on the selected document type.
Local Storage Operations
createNewEntry: Creates a new entry in the container displaying saved details.
deleteItem: Deletes an item from the container.
editItem: Fills the form with details of the selected item for editing.
viewItem: Generates an image of the selected item’s details.
Dynamic Form Fields
populateAadhaarFields, populateDrivingLicenseFields, populatePanCardFields: Functions to generate specific form fields based on the selected document type.
Image Generation
generateImage: Uses the Canvas API to convert saved details into an image.
formatDOB: Formats the date of birth for display.
4. Adding Event Listeners
Form Submission: Event listener for form submission to handle adding new entries.
Document Type Change: Event listener to dynamically generate form fields based on the selected document type.
Reset Button: Event listener to reset the form fields.
Container Actions: Event listener for view, edit, and delete buttons in the container.

# Steps to Run the Project
Clone the Repository:
git clone <repository-url>

Navigate to the Project Directory:
cd SafeDocs


# Open the Project in a Browser:

Open the index.html file in a web browser to run the application.

# Using the Application:

Enter Document Details: Select the document type and enter the required details.
Save Details: Click the "Save Details" button to save the entered details.
View, Edit, Delete: Use the respective buttons to view, edit, or delete saved entries.
Convert to Image: Click the "View" button to generate and download the image of the saved details.
Reset Form: Click the "Reset Form" button to clear the form fields.

# Conclusion
SafeDocs is a comprehensive offline PWA for securely storing and managing personal document details. The application ensures a seamless offline experience, secure data handling, and provides a convenient way to share details through image generation. The well-structured code, intuitive UI, and robust functionality make SafeDocs a reliable tool for managing essential personal documents.