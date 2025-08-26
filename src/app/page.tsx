import Hero from "@/components/hero/hero";
import OffersSlider from "@/components/sections/offersSlider";
import Container from "@/components/layout/container";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white py-16">
        <Container>
          <OffersSlider />
        </Container>
      </section>
    </>
  );
}
