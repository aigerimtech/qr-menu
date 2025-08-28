import {ReactNode} from "react";
import {notFound} from "next/navigation";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import Navbar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";
import MenuSection from "@/components/menu/menuSection";

type Props = {children: ReactNode; params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // enable static rendering for everything here
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
      <html lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
           <Navbar />
             <main className="relative">
              {children}
             </main>
             <MenuSection/>
           <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
