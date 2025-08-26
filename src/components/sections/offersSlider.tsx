"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

type Offer = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
};

const OFFERS: Offer[] = [
  {
    slug: "vip-karaoke",
    title: "VIP-зал с караоке",
    subtitle: "до 28 человек",
    image: "/images/offers/vip-karaoke.png",
  },
  
];

export default function OffersSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="offers" className="w-full">
      <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#9b1b1b] mb-6">
        О НАС И НАШИ ПРЕДЛОЖЕНИЯ
      </h2>

      {/* Clamp with 49px on md+, hide overflow so side slides attach to edges */}
      <div className="relative overflow-hidden md:px-[49px]">
        {/* Side dark masks (only on md+) to imitate dimmed gallery neighbors */}
        <div className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-[49px] bg-gradient-to-r from-black/55 to-transparent" />
        <div className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-[49px] bg-gradient-to-l from-black/55 to-transparent" />

        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            // @ts-expect-error external nav refs
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error external nav refs
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            // Desktop/tablet: center a fixed 1000px card; neighbors peek
            768: { slidesPerView: "auto", spaceBetween: 0, centeredSlides: true },
          }}
          className="!overflow-visible"
        >
          {OFFERS.map((o) => (
            <SwiperSlide key={o.slug} className="md:!w-[1000px]">
              <Link href={`/offers/${o.slug}`} className="block group rounded-md overflow-hidden">
                {/* exact Figma aspect 1000×492 */}
                <article className="relative aspect-[1000/492]">
                  <Image
                    src={o.image}
                    alt={o.title}
                    fill
                    sizes="(min-width:768px) 1000px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                  {/* Bottom gradient for legibility */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/55" />
                  <div className="absolute left-6 bottom-6 text-white">
                    <div className="text-[28px] font-semibold drop-shadow-sm">{o.title}</div>
                    <div className="text-[18px] opacity-90">{o.subtitle}</div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Arrows under the slider — 64×64, gap 16px, with your SVG icons */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          ref={prevRef}
          aria-label="Предыдущий"
          className="w-[64px] h-[64px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
        >
          <Image
            src="/icons/slidergallery/slider-arrow-back.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>

        <button
          ref={nextRef}
          aria-label="Следующий"
          className="w-[64px] h-[64px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
        >
          <Image
            src="/icons/slidergallery/slider-arrow-forward.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>
    </section>
  );
}
 