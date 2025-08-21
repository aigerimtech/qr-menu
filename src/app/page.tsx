import Hero from "@/components/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="next-section"
        className="scroll-mt-[102px] py-24 bg-white"
      >
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#9b1b1b]">
            О нас и наши предложения
          </h2>

          <div className="mt-8 h-64 border border-dashed rounded-xl grid place-items-center text-gray-500">
            Здесь будет галерея / меню
          </div>
        </div>
      </section>
    </>
  );
}
