# Internship Assignment: Build an MCQ App with Feedback Form Functionality

## Objective

Design and develop a web-based Multiple Choice Question (MCQ) app that allows users to take quizzes and also submit feedback. The app should support both quiz-taking and feedback collection, with dynamic loading of quiz data from JSON files uploaded through a backend interface.

## Requirements

### 1. Data Structure

- **Quiz Data:** Each quiz consists of multiple questions grouped by categories and difficulty levels.
- **JSON Format:** The app should load quiz data from JSON files with the following structure:

  ```json
  {
    "id": "unique-quiz-id",
    "category": "category-name",
    "level": "hard/medium/easy",
    "questions": [
      {
        "id": 1,
        "question": "Question text",
        "options": ["option1", "option2", "option3", "option4"],
        "answer": "correct option text"
      },
      ...
    ]
  }
  ```  

- **Feedback Data:** Should include open-ended and multiple-choice questions to collect user feedback.
- **User Data:** Store user responses for both quizzes and feedback forms and display ion finish of the quiz.

### 2. User Interface (UI)

- **Main View:**
  - Dashboard offering two modes: Take Quiz or Submit Feedback.
  - List available quiz categories dynamically loaded from uploaded JSON files.

- **Quiz Mode:**
  - User selects a category and difficulty level.
  - Load questions dynamically based on selection.
  - Display one question at a time with multiple-choice options.
  - Navigation between questions and progress tracking.
  - Display results at the end including score and correct answers.

- **Feedback Mode:**
  - Display various feedback questions.
  - Allow submission with confirmation.

- **Backend Admin Page:**
  - Page for authorized users to upload MCQ JSON files.
  - Validate JSON format on upload.
  - Store JSON data for frontend usage.

- **Design Considerations:**
  - Responsive, accessible, and user-friendly UI.
  - Smooth transitions and clear instructions.

### 3. Technology Stack

- **Frontend:** HTML, CSS, JavaScript; optionally React.js or Vue.js.
- **Backend:** Node.js or any preferred backend tech to handle JSON upload and serve quiz data.
- **Storage:** File system or database to store uploaded JSON files.

### 4. Deliverables

- Fully functional MCQ app with feedback form and backend JSON upload.
- Documentation explaining data structure, design decisions, and challenges.
- Video walkthrough or presentation demonstrating the app.

### 5. Evaluation Criteria

- Functionality, UI/UX, code quality, and creativity/enhancements.

## Sample JSON

```json
{
  "id": "quiz123",
  "category": "General Knowledge",
  "level": "medium",
  "questions": [
    {
      "id":1,
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Rome", "Berlin"],
      "answer": "Paris"
    },
    {
      "id": 2,
      "question": "Which planet is known as the Red Planet?",
      "options": ["Earth", "Mars", "Venus", "Jupiter"],
      "answer": "Mars"
    },
    {
      "id":  3,
      "question": "Who wrote 'Hamlet'?",
      "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
      "answer": "William Shakespeare"
    }
  ]
}
```

### Deadline

Final Submission Date: 7 Days since first Pull Date  

### Submission Process

#### GitHub Repository

- Create a public GitHub repository for your project.
- Commit and push your code regularly, documenting significant changes with clear commit messages.
- Ensure the repository contains all project files, including the source code, documentation, and any necessary resources.

#### Submission

- Invite `@recursivezero` to your private repository as a collaborator.
- Submit a link to your GitHub repository via Email on _recursivezero@outlook.com_ by the deadline.
- Prepare for a brief presentation or demo to showcase your work.

Note: This assignment aims to evaluate your skills in web development, design aesthetics, and attention to detail. Good luck!

> © 2025 RecursiveZero Private Limited, All rights reserved.
