# Internship Assignment: Toy Sharing App for Housing Society

## Objective

Assess the candidate’s ability to design a **mini web application** using **HTML, CSS, and JavaScript** by building a toy-sharing platform for society members. The project should simulate user actions like **login, add toy, request toy, and manage sharing**.

---

## Assignment Overview

Create a 3-page application where society members can:

1. **Login / Enter Flat Number**
2. **Upload Toys for Sharing** (with available dates)
3. **Browse & Request Toys**, and see current borrow status.

All data will be handled **in-browser** using **JavaScript** (local storage or in-memory structures).

---

## Pages & Features

### 🏠 Page 1: Login / Flat Entry

- Simple input to **enter flat number** (used as identity).
- Save the flat number in local/session storage.
- Redirect to Toy Dashboard (Page 2).

### 🎁 Page 2: Upload Toy (Toy Dashboard)

- Show the **logged-in flat number** at the top.
- Form to **upload toy**:
  - Toy name
  - Description
  - Available from (start date)
  - Available till (end date)
  - Optional image upload (can be simulated)
- List of **your uploaded toys** with their share status.
- All toy data must be stored in memory or localStorage.

### 🔍 Page 3: Browse & Request Toys

- Display **all toys shared by others**.
- **Search functionality** by toy name or keyword.
- Show:
  - Toy name, description, flat number (owner), availability dates
  - **Request button** (only if not already requested by someone else)
- When requested:
  - Toy is **locked** for the requesting flat.
  - Status: "Requested by Flat X"
- Add a **Return** option when the toy is returned, to release it.

---

## Technology Stack

- **HTML**: Page structure
- **CSS**: Basic responsive layout, flex/grid, and styling
- **JavaScript**:
  - Simulate login and data persistence with localStorage
  - Handle toy uploads, availability, and request status
  - Filtering and form validations

---

## Submission Instructions

- Complete the assignment in **1 week**
- Upload the project to your **GitHub repository**
- Include a **README.md** with:
  - Project description
  - How to run
  - Features implemented
  - Any improvements or challenges faced

---

## Bonus Points

- Add a filter by **date availability**
- Add **toy categories** (e.g., board games, puzzles, etc.)
- Responsive UI for mobile users
- Simple **notification badge** for requested/available toys

---

## Evaluation Criteria

- **Functionality**: All core flows working (upload, request, return)
- **Code Quality**: Modular, clean JS with comments
- **Design & UX**: User-friendly, responsive layout
- **Creativity**: Any additional enhancements or polish
- **GitHub Usage**: Clear commits, README, and structure

---

**Optional Tip**: You can simulate an image preview using a base64 placeholder or emoji for toy images.

Good luck and have fun building! 🧸✨

**Note:**
Interns are encouraged to be creative and innovative in their approach to designing the portal. The goal is to create a user-friendly and visually appealing platform for accessing brand information efficiently.

---

&copy; 2025 RecursiveZero Private Limited | All rights reserved
