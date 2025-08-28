import Hero from "@/components/hero/hero";
import OffersSlider from "@/components/sections/offersSlider";
import Container from "@/components/layout/container";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n";

type PageProps = {
  params: Promise<{locale: Locale}>; // <- async
};

export default async function Home(props: PageProps) {
  const {locale} = await props.params;          // <- await it
  const t = await getTranslations({locale});

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
