import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "kz"],
  defaultLocale: "ru"
});

export type Locale = (typeof routing.locales)[number];
// Re-export convenience constants if you need them elsewhere:
export const locales = routing.locales;
