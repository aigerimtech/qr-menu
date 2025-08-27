import Hero from "@/components/hero/hero";
import OffersSlider from "@/components/sections/offersSlider";
import Container from "@/components/layout/container";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale });

  return (
    <>
      <Hero />
      <section className="bg-white py-16">
        <Container>
          <OffersSlider title={t("offers.sectionTitle")} />
        </Container>
      </section>
    </>
  );
}
