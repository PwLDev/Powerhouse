import i18next, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./en.json";
import es from "./es.json";

const resources = {
    en: { translation: en },
    es: { translation: es }
}

const fallbackLng = "en";
const languageDetector: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    detect: (callback) => {
        const locales = RNLocalize.getLocales();
        callback(locales[0]?.languageCode || fallbackLng);
    }
}

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,
        keySeparator: false,
        interpolation: { escapeValue: false }
    });

export default i18next;