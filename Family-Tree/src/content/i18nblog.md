<h1>Implemention of I18N in Astro with Vanilla JavaScript</h1>

Internationalization (i18n) is essential for creating websites that support multiple languages, providing a seamless experience for users worldwide. This guide will show you how to set up i18n in an Astro project using Vanilla JavaScript.

---

## Why Use i18n?

- **User Engagement**: Users feel more comfortable navigating a website in their native language.
- **Wider Audience**: Makes your website accessible to a global audience.
- **Scalability**: Simplifies adding new languages as your project grows.

---

## File Structure

- The folder and file organization to keep our code neat:

```plaintext
project/
├── public/
│   ├── locales/
│   │   ├── en.json        # English translations
│   │   ├── es.json        # Spanish translations
│   └── favicon.ico        # (Optional) Favicon for the site
├── src/
│   ├── components/
│   │   └── Header.astro   # Header with language selector
│   ├── pages/
│   │   └── index.astro    # Home page
│   ├── layouts/
│   │   └── BaseLayout.astro # Optional layout for reusability
│   └── scripts/
│       └── i18n.js        # Script to fetch translation files
├── astro.config.mjs       # Astro configuration file
└── package.json           # Project dependencies
```

---

## Step 1: Set Up the Project

### Install Astro 🚀

- Start by creating a new Astro project:

```bash
npm create astro@latest project
cd project
npm install
```

---

## Step 2: Create Translation Files

- We’ll store translations in JSON files, one for each language. Create a `locales` folder inside `public/` and add the following files:

### **English (en.json)**

```json
{
  "greeting": "Hello, World!"
}
```

### **Spanish (es.json)**

```json
{
  "greeting": "¡Hola, Mundo!"
}
```

---

## Step 3: Write the i18n Script

- Add a script to fetch translations dynamically. Create `src/scripts/i18n.js`:

```javascript
export async function fetchTranslation(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error("Translation file not found");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return { greeting: "Translation error" };
  }
}
```

**This script handles:**
- Fetching the translation file based on the language code.
- Returning an error message if the file isn’t found.

---

## Step 4: Build the Header Component

- The `Header.astro` component will allow users to switch languages.

### **Header.astro**

```astro
<script>
  import { fetchTranslation } from '../scripts/i18n.js';

  let lang = 'en'; // Default language
  let translation = { greeting: "Loading..." };

  async function updateLanguage(event) {
    lang = event.target.value; // Get selected language
    translation = await fetchTranslation(lang); // Fetch new translations
    document.getElementById('content').innerText = translation.greeting;
  }

  // Fetch default language on load
  updateLanguage({ target: { value: lang } });
</script>

<header>
  <h1>Welcome to Astro i18n</h1>
  <label for="language-selector">Select Language:</label>
  <select id="language-selector" on:change={updateLanguage}>
    <option value="en">English</option>
    <option value="es">Español</option>
  </select>
</header>
```

---

## Step 5: Create the Main Page

- The main page will display the greeting based on the selected language.

### **index.astro**

```astro
---
import Header from '../components/Header.astro';
---

<Header />
<main>
  <p id="content">Loading...</p>
</main>
```

---

## Step 6: Add an Optional Layout

- To keep things reusable, wrap your content in a layout.

### **BaseLayout.astro**

```astro
---
const title = "Astro i18n Demo";
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## Step 7: Test the Project

- Run the development server to see your `i18n` in action:

```bash
npm run dev
```

Visit `http://localhost:3000`, and you should be able to:
1. View the default greeting in English.
2. Change the language using the dropdown to see the Spanish greeting.

---

## Key Takeaways

1. **Dynamic Fetching**: Language files are loaded dynamically to reduce initial load time.
2. **Scalable Design**: Adding new languages is as simple as creating a new JSON file.
3. **Customizable**: The i18n script can be extended to handle fallback languages, pluralization, or other localization features.

---

## Next Steps

- Add more translations for other sections of your website.
- Use browser settings to detect the user's preferred language.
- Implement fallback logic for unsupported languages.

---