// src/i18n.ts
import {getRequestConfig} from "next-intl/server";

export const locales = ["ru", "en", "kk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";
export const localePrefix = "as-needed";

export default getRequestConfig(async ({locale}) => {
  const isKnown = typeof locale === "string" && (locales as readonly string[]).includes(locale);
  const l: Locale = isKnown ? (locale as Locale) : defaultLocale;
  const messages = (await import(`./messages/${l}.json`)).default; // note ./messages (inside src)
  return {locale: l, messages};
});
