import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "kz"] as const,
  defaultLocale: "ru"
});
export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
