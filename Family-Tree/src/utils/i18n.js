import i18next from "i18next";
import en from "../locales/en.json";
import hindi from "../locales/hindi.json";

// Determine the language: fallback to 'en' if localStorage is not available
const savedLanguage =
  typeof window !== "undefined" && localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en";

i18next.init({
  lng: savedLanguage,
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    hindi: { translation: hindi },
  },
});

export default i18next;
