// Direct JSON imports — resolved at build time by Vite/Astro, zero runtime cost.
import en from "@heyshaun/utils/translations/en.json";
import fr from "@heyshaun/utils/translations/fr.json";

export type Lang = "en" | "fr";
export const LANGS: Lang[] = ["en", "fr"];

export const translations = { en, fr } as const;

/** Return the full translation dictionary for the given language. */
export function getTranslations(lang: Lang) {
  return translations[lang];
}

/** Type of a full translation dictionary (same shape for en & fr). */
export type Translations = ReturnType<typeof getTranslations>;
