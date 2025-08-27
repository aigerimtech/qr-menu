import Hero from "@/components/hero/hero";
import OffersSlider from "@/components/sections/offersSlider";
import Container from "@/components/layout/container";
import { getMessages, type Locale } from "@/i18n";

export default async function Home({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getMessages(params.locale);

  return (
    <>
      <Hero />
      <section className="bg-white py-16">
        <Container>
          <OffersSlider title={dict.offers.sectionTitle} />
        </Container>
      </section>
    </>
  );
}
