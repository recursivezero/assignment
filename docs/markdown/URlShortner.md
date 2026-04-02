
# Internship Assignment: Build a Short URL Service

## Objective

Design and develop a web-based Short URL service that allows users to create, manage, and analyze shortened links. The service should include both a user-facing front end and a backend admin page to handle URL submissions and track statistics.

## Requirements

### 1. Data Structure

- **Shortened URL Data:** Each record should include a unique short code, the original URL, creation timestamp, visit count, and optional metadata (such as title, notes, or tags).
- **JSON Format:** The service should support importing/exporting collections of URLs via JSON files using the following structure:

  ```json
  [
    {
      "short_code": "abc123",
      "original_url": "https://example.com/page",
      "created_at": "2025-11-18T23:59:00Z",
      "visit_count": 42,
      "meta": {
        "title": "Example Page",
        "notes": "Optional description or notes",
        "tags": ["test", "demo"]
      }
    },
    // more URL records
  ]
  ```

- **User Data:** Record user actions and allow owner-level visibility on URLs they created.

### 2. User Interface (UI)

- **Main View:**
  - Simple form to enter an original URL and generate a short code.
  - List of recently created short URLs for the current user, each showing visit count and metadata.
  - Form for editing metadata or deleting a short URL.
- **Redirection:**
  - When a short code is accessed, redirect to the original URL and increment the visit count.
- **Backend Admin Page:**
  - Interface for authorized users to upload JSON files containing URL batches.
  - Validate and merge uploaded records, preventing collisions and preserving visit history.
  - Export URL collections to JSON.
- **Design Considerations:**
  - Ensure responsive, clean, and accessible layout.
  - Provide clear feedback for errors, duplicate codes, and link expiration.
  - Optionally allow statistics/analytics on link accesses.

### 3. Technology Stack

- **Frontend:** HTML, CSS, JavaScript; optionally React.js or Vue.js.
- **Backend:** Node.js or preferred backend technology to generate short codes, handle redirects, store records, and manage uploads.
- **Storage:** File system or database (like MongoDB or SQLite) for URL records and visit data.

### 4. Deliverables

- Fully functional Short URL app with user and admin features.
- Documentation for data formats, design choices, and development challenges.
- Video walkthrough or presentation demonstrating features.

### 5. Evaluation Criteria

- Functionality, UI/UX, code quality, and enhancements/analytics.

## Sample JSON

```json
[
  {
    "short_code": "go123",
    "original_url": "https://github.com/RecursiveZero",
    "created_at": "2025-11-18T18:00:00Z",
    "visit_count": 108,
    "meta": {
      "title": "GitHub RecursiveZero",
      "notes": "Company profile link",
      "tags": ["company", "github"]
    }
  },
  {
    "short_code": "tzip",
    "original_url": "https://threadzip.com/privacy",
    "created_at": "2025-11-16T10:30:00Z",
    "visit_count": 70,
    "meta": {
      "title": "Threadzip Privacy Policy",
      "notes": "",
      "tags": ["policy"]
    }
  }
]
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
