import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

type Locale = (typeof routing.locales)[number];

function isLocale(x: unknown): x is Locale {
  return typeof x === "string" && (routing.locales as readonly string[]).includes(x);
}

export default getRequestConfig(async ({ locale }) => {
  if (!isLocale(locale)) notFound();

  const messages = (await import(`../messages/${locale}.json`)).default;

  // v2 needs `locale`; v3/v4 accept extra props (structural typing)
  return { locale, messages };
});
