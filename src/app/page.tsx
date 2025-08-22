import Hero from "@/components/hero/hero";
import GallerySection from "@/components/sections/gallerySection";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <GallerySection />
        </div>
      </section>
    </>
  );
}
