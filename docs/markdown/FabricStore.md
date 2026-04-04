# Internship Assignment: AI-Powered Fabric Sourcing Assistant

**Objective:**
Build a web application featuring a "Voice-to-Form" interface designed for fabric merchants. The form will allow users to describe fabric details (type, GSM, color, etc.) via audio. The system must transcribe the audio, extract key entities using a Python backend, and dynamically populate the form for final manual review and submission.

**Requirements:**

## 1. HTML Structure & UI

* Create a clean, responsive form with the following 5 fields:
  * **Fabric Type** (e.g., Cotton, Silk, Polyester)
  * **GSM** (Grams per Square Meter)
  * **Color/Pattern**
  * **Quantity Required** (in meters/yards)
  * **Delivery Timeline**
* Include a prominent **"Speak"** button with a recording indicator.
* The UI must be professional and minimalist (OpenGraph compatibility is required for the final view mode).

## 2. Voice Recording

* Implement audio recording functionality (Web Speech API or MediaRecorder API).
* Enforce a **strict 1-minute limit** for recordings.
* Provide visual feedback (e.g., a pulsing icon or timer) while recording is active.

## 3. Dynamic Form Filling (The AI Core)

* **Backend**: Use a **Python** backend (FastAPI or Flask managed via **Poetry**).
* **Processing**: Transcribe the audio and use a lightweight LLM or NLP logic to extract the 5 fabric entities.
* **Logic**: Auto-fill the relevant fields. If a specific detail (like GSM) isn't mentioned, that field **must remain empty** for the user to fill manually.

## 4. Edit & Validation

* All auto-filled fields must remain **fully editable** by the user.
* Implement client-side validation to ensure numeric fields (GSM/Quantity) receive correct data types before submission.

## 5. Submit and View

* Store the submitted data (JSON or SQLite).
* Upon successful submission, redirect to a "Summary View" page that displays the fabric request details in a clear, read-only format.

## 6. User Experience & Error Handling

* Handle scenarios where the microphone is blocked or the transcription service fails.
* Ensure the transition from "Audio Processing" to "Form Populated" is seamless and fast.

## 7. Optional Enhancements (Bonus)

* **Audio Playback**: Allow the user to replay their recording before hitting submit.
* **Advanced Extraction**: Use Pydantic models for structured data extraction on the backend.
* **Styling**: Use a modern CSS framework (Tailwind or similar) to ensure a high-quality feel.

---

**Submission Guidelines:**

1. **Codebase**: Push the complete code to your GitHub repository.
2. **Documentation**:
    * A `README.md` with clear setup instructions (include `poetry install` steps if using Python).
    * A brief technical document explaining your choice of transcription library and how you handled the entity extraction.
3. **Timeline**: **1 Week** from the date of receipt.

**Evaluation Criteria:**

* **Accuracy**: How well the AI identifies fabric-specific terms and maps them to fields.
* **Code Quality**: Clean, scalable, and modular code with minimal but effective comments.
* **Production Readiness**: Proper environment management and error handling.
* **UI/UX**: Intuitive design and smooth interaction flow.

---

&copy; 2026 **Recursive Zero Pvt Ltd**, All rights reserved.
