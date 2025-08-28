import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  // normalize & validate locale
  const l =
    typeof locale === 'string' && routing.locales.includes(locale as any)
      ? locale
      : routing.defaultLocale;

  if (!routing.locales.includes(l as any)) notFound();

  const messages = (await import(`../../messages/${l}.json`)).default;

  // IMPORTANT: return both locale and messages
  return {locale: l, messages};
});
