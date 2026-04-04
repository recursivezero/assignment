# Internship Assignment: Dynamic Product Social-Preview System

**Objective:**
Develop a production-ready service that dynamically generates branded social media preview images (OpenGraph images) for fabric listings. The system should take raw data (Product Name, Price, and Image) and turn it into a styled `.png` or `.jpg` on the fly.

**Requirements:**

## 1. The Generator Engine

* **Technology Stack**: Use **Node.js** with **Hono.js** or **Express**.
* **Rendering**: Use a library like `satori` (by Vercel) or `playwright/puppeteer` to convert HTML/CSS templates into images.
* **Input**: The service should expose an API endpoint that accepts query parameters:
  * `title`: The name of the fabric.
  * `price`: The cost per meter.
  * `image_url`: A link to the actual fabric thumbnail.

## 2. Frontend Branding Template

* Create a sophisticated HTML/CSS layout that includes:
  * The **Recursive Zero** logo.
  * A high-quality typography layout for the fabric name.
  * A visually appealing background (gradient or mesh).
  * An overlay or frame for the product image.

## 3. Smart Caching

* To ensure scalability and performance, implement a basic caching layer (e.g., using a local folder or an in-memory cache) so that if the same product is requested twice, the image isn't re-rendered from scratch.

## 4. Interactive Preview Page

* Build a simple **React** or **Astro** page where a user can:
  * Type in product details.
  * See a live "Live Preview" of how the social media card will look.
  * Click a button to "Copy OG Link."

## 5. OpenGraph Compatibility

* Implement the meta tags on the preview page so that when the link is pasted into a [Social Mapper](https://www.opengraph.xyz/), the generated image actually appears.

## 6. User Experience

* Ensure the image generation happens in under 2 seconds.
* Handle "broken image" fallback—if a product image URL is invalid, show a branded placeholder instead.

## 7. Optional Enhancements (Bonus)

* **Edge Deployment**: Deploy the function as a serverless worker.
* **Watermarking**: Automatically add a "Verified by Recursive Zero" watermark to the bottom corner.
* **Custom Fonts**: Integrate a sophisticated font (like Inter or Playfair Display) for a premium marketplace feel.

---

**Submission Guidelines:**

1. **Repository**: Push the code to a public GitHub repository.
2. **Documentation**:
    * A `README.md` explaining how the image generation engine works.
    * Instructions on how to run the project locally (`npm install` & `npm run dev`).
3. **Demo**: A link to the hosted preview page (Vercel, Netlify, or Cloudflare Pages).
4. **Timeline**: **1 Week**.

**Evaluation Criteria:**

* **Visual Fidelity**: Does the generated image look like a professional marketing asset?
* **Code Scalability**: Is the backend structured to handle many simultaneous requests?
* **Tooling**: Proper use of modern web standards and TypeScript.
* **Production Readiness**: Does the solution handle edge cases like long text or missing images?

---

&copy; 2026 **Recursive Zero Pvt Ltd**, All rights reserved.

---
