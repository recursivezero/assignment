# Internship Assignment: Interactive Indian Map Web Application

## Problem Statement

Create a web-based interactive map of India, where clicking on a specific state or Union Territory (UT) opens a modal containing detailed information about it. Additionally, the border of the selected state should be highlighted, its capital displayed, and an option to copy the state's details should be available.

---

## Assignment Details

### 1. Interactive Map

- Display a map of India with all states and Union Territories (UTs) outlined.
- Each state/UT should be clickable.
- Use a minimal and responsive design so that the map adjusts well across various devices (desktop, tablet, mobile).

### 2. State/UT Modal

- When a user clicks on a state/UT, a modal should appear with the following information:
  - Name of the state/UT.
  - Capital city.
  - Basic details like area, primary languages, traditional dance forms, and literacy rate.
  - Flag image (if any).
  - A brief description of the state/UT.
- Include a **"Copy" button** that allows users to copy the displayed information into their clipboard.
- The modal should be visually appealing and closeable (with a "Close" button or clicking outside the modal).

### 3. State/UT Highlighting

- Highlight the border of the selected state/UT upon click to make it visually distinct.
- The highlight should disappear when the modal is closed.

### 4. Capital Display

- Display the capital city of each state/UT on the map.
- The capital should be indicated with a small dot or marker along with a label.
- Upon state selection, the label for the capital city should become more prominent.

---

## Technical Guidelines

### 1. Tech Stack

- Use HTML, CSS, and JavaScript for this project.
- Consider using libraries like SVG for the map or any JS library like Leaflet.js/D3.js for a more interactive experience.
- No frameworks (e.g., React, Angular, Vue) should be used, as this is intended to be a minimal project.

### 2. Data Source

- Use a JSON file containing details of each state/UT, including name, capital, population, area, languages, traditional dance, literacy rate, and flag image.
- Data should be sourced from official state/UT websites or their overview pages to ensure authenticity.
- Include all states and Union Territories in India.

### 3. Design Considerations

- The map should be easy to navigate and intuitive for users.
- Ensure the modal and map are accessible (e.g., keyboard navigable).
- Use CSS transitions and animations for smooth modal appearance and state/UT highlighting.

### 4. Performance

- Ensure the map is responsive and does not lag during interactions.
- Optimize the loading time of the map and data.

### 5. Code Quality

- Write clean, modular code using ES6+ standards.
- Use meaningful variable and function names.
- Comment your code where necessary to explain logic.

---

## Deliverables

1. **Code Submission**:
   - Push the entire project code to a GitHub repository.
   - Ensure that the repository has regular commits showcasing your development process.
   - Create a `README.md` file with:
     - Detailed instructions on how to run the project locally.
     - Screenshots of the web application.
     - A brief explanation of your approach and any key design decisions.
     - Any known issues or areas for improvement.

2. **Data Collection**:
   - Ensure that all data used in the project is sourced from official state/UT websites.
   - Document the sources in the `README.md` under a "Data Sources" section.

3. **Short Presentation**:
   - Prepare a short presentation (3-5 slides) covering:
     - Your approach to solving the problem.
     - Key challenges faced and how you overcame them.
     - Possible improvements for future iterations.

---

## Bonus (Optional)

- Make the map visually appealing using gradient colors for different regions.
- Add a search bar to quickly find a state or UT.
- Provide a toggle to switch between different views, like "State Information" and "Geographical Features."

---

## Timeline

- **Duration**: 1 week.
- **Submission Deadline**: Push the final code to the GitHub repository within a week from the assignment date.

---

## Additional Notes

- Authentic data collection is critical, so ensure that state information is up-to-date and sourced properly.
- Focus on creating a smooth user experience with intuitive interactions.
- Regular commits to the GitHub repository are highly recommended to track progress.

---

This assignment will assess your ability to handle interactive UI, data management, user experience design, and documentation, all using fundamental web technologies. Happy coding!

---

© 2024 | RecursiveZero Private Limited | All rights reserved.
