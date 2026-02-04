# Internship Assignment: Image-Based Object Counting using Python

## Objective  
Assess the candidate’s ability to work with **Python**, **image processing**, and **basic computer vision concepts** by building an application that analyzes an image and returns the **count of distinct objects** arranged in stacks or blocks.

---

## Assignment Overview  
You are given an image containing **multiple stacked objects** (for example, stacks of clothes arranged in rows and columns such as 3×3).  
The task is to **analyze the image**, ignore noise, identify similar objects based on **shape, size, or block structure**, and return the **total count of distinct objects**.

The application should also provide a **simple UI** where a user can upload an image and trigger the object-counting process.

---

## Problem Statement  
- Input image may contain:
  - Objects stacked **vertically or horizontally**
  - Similar-looking objects (colors may repeat)
  - **Noise** around or inside the image
- Example:
  - If the image contains **9 stacks of cloths arranged in a 3×3 grid**, the output should be:
    ```
    Total distinct object count: 9
    ```

The logic should rely on **image analysis**, not manual hardcoding.

---

## Functional Requirements

### 1. Image Upload
- Provide a UI input to **upload an image**.
- Display the **uploaded image thumbnail** on the screen.
- Validate that the uploaded file is a valid image format.

### 2. Object Detection & Counting
- Analyze the image to:
  - Detect object boundaries or blocks
  - Identify similarity using **width, height, contours, or block-based segmentation**
- Ignore:
  - Small noisy regions
  - Irrelevant artifacts
- Return the **total number of distinct objects** detected.

### 3. Count Trigger
- A **“Count Objects”** button that:
  - Processes the uploaded image
  - Displays the final object count clearly

---

## Technical Constraints

- Must be implemented using **Python**
- Allowed libraries:
  - **OpenCV**
  - NumPy
  - Any open-source image processing or ML library
  - Open-source LLMs (optional, if used for assistance or reasoning)
- The solution should **not rely on manual marking** of objects.

---

## UI Requirements
- Simple UI (any one is acceptable):
  - Streamlit
  - Flask + HTML
  - Gradio
- UI must include:
  - Image upload input
  - Uploaded image preview
  - Button to start object counting
  - Clear display of the result

---

## Suggested Approach (Not Mandatory)
- Image preprocessing (grayscale, blur, thresholding)
- Noise removal using morphological operations
- Contour detection or block segmentation
- Filtering contours based on size/aspect ratio
- Counting valid detected objects

---

## Submission Instructions
- Complete the assignment within **one week**
- Upload the project to your **own GitHub repository**
- Include a **README.md** with:
  - Problem explanation
  - Approach and algorithm used
  - Libraries used
  - How to run the project
  - Sample input and output screenshots

---

## Bonus Points
- Show bounding boxes around detected objects
- Display intermediate steps (noise removal, segmentation)
- Support both **horizontal and vertical stack layouts**
- Ability to handle different image sizes gracefully

---

## Evaluation Criteria
- **Correctness**: Accurate object counting
- **Image Processing Logic**: Proper noise handling and segmentation
- **Code Quality**: Readable, modular, and well-commented Python code
- **UI Usability**: Clear and simple user flow
- **Documentation**: Clear README and explanation

---

Good luck! This assignment tests how well you can make machines “see” structure inside visual chaos 📷🧠