import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationRU from "./locales/ru/translation.json";
import translationDE from "./locales/de/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  de: {
    translation: translationDE,
  },
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
