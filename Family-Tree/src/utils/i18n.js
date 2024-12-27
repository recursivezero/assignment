import i18next from "i18next";
import en from "../locales/en.json";
import hindi from "../locales/hindi.json";

i18next.init({
  lng: "en", // Default language
  resources: {
    en: { translation: en },
    hindi: { translation: hindi },
  },
});

export default i18next;
