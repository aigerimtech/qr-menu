export const locales = ['ru', 'en', 'kk'] as const;
export type Locale = typeof locales[number];

export async function getMessages(locale: Locale) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return messages;
}
