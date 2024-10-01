# Offline Document Storage

An offline application to store and manage personal documents such as Aadhaar Card, Driving License, Pan Card and Voter Card .

## Table of Contents

- [Offline Document Storage](#offline-document-storage)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Screenshots](#screenshots)
    - [Document Entry Page](#document-entry-page)
    - [Forms Section](#forms-section)
    - [Data tabel and Canvas image](#data-tabel-and-canvas-image)

## Installation

To set up the project, clone the repository

```bash
npm install
npm run dev
```

run server separately

```bash
npm install express
npm run server
```

## Introduction

 The Offline Document Storage is a simple yet efficient tool designed to help users store and manage their important personal documents offline. It provides a user-friendly interface to add, view, edit, and delete document details.

## Features

- Add various document types including Aadhaar Card, Driving License, and PAN Card.
- View stored document details.
- Edit and update document information.
- Delete unnecessary or outdated document entries.
- Offline functionality ensures data security and privacy.
- the data also saved to backend in data.json file for future use.

## Usage

1. Open the index.html file in your browser.
2. Select the document type from the dropdown.
3. Fill in the document details.
4. Click on Save Details to save the document information.
5. View, edit, or delete saved document details.


## Project Structure

```sh
D: 
ASTRO
├── .astro
├── .vscode
├── node_modules
├── public
│   ├── assets
│   │   └── images
│   └── styles
│   |  └── common.css
|   |  └── form.css
|   |     
|   └── scripts
│   |   └── entryHelpers.js
|   |   └── formHandlers.js
|   |   └── image.js
|   └── data.json
├── src
|   ├── components
│   │   └── ButtonGroup.astro
|   |   └── Gender.astro
|   |   └── Heading.astro
|   |    └── InputField.astro
|   |    └── Nav.astro
|   |    └── Table.astro
│   ├── layouts
│   │   └── MainLayout.astro
|   |    └── FormLayout.astro
│   └── pages
│   │   └── aadhaar.astro
|   │   └── dl.astro
|   │    └── index.astro
|   │     └── pan.astro 
|   |      └── voter.astro 
│   └── utils
│      └── constant.ts
|  
├── server.js     
├── package.json
├── tsconfig.json
```

## Screenshots

Here are some screenshots of the application:

### Document Entry Page

![HomePage](<public/assets/images/HomePage.png>)
 Entry Page consist of front ui of the application with the options of forms selection in form of Nav links 

### Forms Section

![AadhaarNav](public/assets/images/AadhaarForm.png)
This page consist of aadhaar form , the tabel which stores the form data 


![PanForm](public/assets/images/PanForm.png)
This page consist of Pan form , the tabel which stores the form data 

![DlNav](public/assets/images/DlForm.png)
This page consist of dl form , the tabel which stores the form data 

![idNav](public/assets/images/VoterIdform.png)
This page consist of dl form , the tabel which stores the form data 

### Data tabel and Canvas image

![PanData](public/assets/images/PAN.png)
the tabel data showing is showing in below canvas Image with the option of download them

![AadhaarData](public/assets/images/Aadhaar.png)
the tabel data showing is showing in below canvas Image with the option of download them

![DlData](public/assets/images/License.png)
the tabel data showing is showing in below canvas Image with the option of download them

![idData](public/assets/images/Voterid.png)
the tabel data showing is showing in below canvas Image with the option of download them

![json](public/assets/images/jsondata.png)
 This section consists of the data stored in backends


