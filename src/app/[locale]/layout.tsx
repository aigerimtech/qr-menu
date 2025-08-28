import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {routing, type Locale} from "@/i18n";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>; // <- async in Next 15
};

export default async function LocaleLayout(props: LayoutProps) {
  const {locale} = await props.params;          // <- await it
  const l = locale as Locale;
  if (!routing.locales.includes(l)) notFound();

  // Either works; this is explicit:
  const messages = await getMessages({locale: l});

  return (
    <html lang={l}>
      <body>
        <NextIntlClientProvider locale={l} messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
