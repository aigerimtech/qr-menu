// app/[locale]/page.tsx
import Hero from "@/components/hero/hero";
import OffersSlider from "@/components/sections/offersSlider";
import Container from "@/components/layout/container";
import {setRequestLocale} from "next-intl/server";
import type {Locale} from "@/i18n";

type PageProps = { params: Promise<{locale: Locale}> };

export default async function Home({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale); // keep static rendering enabled

  return (
    <>
      <Hero />
      <section className="bg-white py-16">
        <Container>
          <OffersSlider slug="vip-karaoke" />
        </Container>
      </section>
    </>
  );
}
