import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";
import type {Locale} from "./routing";

export default getRequestConfig(async ({locale}) => {
  // validate locale
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const l = locale as Locale; // narrowed after guard
  const messages = (await import(`../messages/${l}.json`)).default;

  return { locale: l, messages };
});
