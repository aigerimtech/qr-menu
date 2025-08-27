import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, locales, type Locale } from "@/i18n";

import Navbar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";

import "../globals.css";
import { raleway } from "@/fonts/raleway";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages(locale);

  return (
    <html lang={locale} className={raleway.variable}>
      <body className="bg-[#060606] md:pt-[var(--nav-h)]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
