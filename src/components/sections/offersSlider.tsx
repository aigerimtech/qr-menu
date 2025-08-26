"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Card = { id: string; slug: string; title: string; subtitle: string; image: string };

const CARDS: Card[] = [
  { id: "vip-card-1", slug: "vip-karaoke", title: "VIP-зал с караоке", subtitle: "до 28 человек", image: "/images/offers/vip-karaoke.png" },
  { id: "vip-card-2", slug: "vip-karaoke", title: "VIP-зал с караоке", subtitle: "до 28 человек", image: "/images/offers/vip-karaoke.png" },
  { id: "vip-card-3", slug: "vip-karaoke", title: "VIP-зал с караоке", subtitle: "до 28 человек", image: "/images/offers/vip-karaoke.png" },
];

export default function OffersSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw) return;

    if (prevRef.current && nextRef.current) {
      // @ts-ignore
      sw.params.navigation.prevEl = prevRef.current;
      // @ts-ignore
      sw.params.navigation.nextEl = nextRef.current;
      sw.navigation.destroy();
      sw.navigation.init();
      sw.navigation.update();
    }

    if (paginationRef.current) {
      // @ts-ignore
      sw.params.pagination.el = paginationRef.current;
      // @ts-ignore
      sw.params.pagination.clickable = true;
      // @ts-ignore
      sw.params.pagination.renderBullet = (_i: number, className: string) =>
        `<span class="${className} offer-bullet"></span>`;
      sw.pagination.destroy();
      sw.pagination.init();
      sw.pagination.render();
      sw.pagination.update();
    }
  }, []);

  return (
    <section id="offers" className="w-full">
      <h2 className="text-[28px] md:text-[40px] font-extrabold text-[#9b1b1b] mb-6">
        О НАС И НАШИ ПРЕДЛОЖЕНИЯ
      </h2>

      <div className="relative overflow-hidden md:px-[49px]">
        <div className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-[49px] bg-gradient-to-r from-black/55 to-transparent" />
        <div className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-[49px] bg-gradient-to-l from-black/55 to-transparent" />

        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(sw) => (swiperRef.current = sw)}
          slidesPerView={1}
          spaceBetween={8}
          loop={CARDS.length > 1}
          breakpoints={{ 768: { slidesPerView: "auto", centeredSlides: true, spaceBetween: 8 } }}
          className="!overflow-visible"
        >
          {CARDS.map((c) => (
            <SwiperSlide key={c.id} className="md:!w-[1000px]">
              <Link href={`/offers/${c.slug}`} className="block group rounded-md overflow-hidden">
                <article className="relative aspect-[1000/492]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width:768px) 1000px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/55" />
                  <div className="absolute left-6 bottom-6 text-white">
                    <div className="text-[22px] md:text-[28px] font-semibold drop-shadow-sm">{c.title}</div>
                    <div className="text-[16px] md:text-[18px] opacity-90">{c.subtitle}</div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={paginationRef} className="offers-pagination absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-4 z-30" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          ref={prevRef}
          aria-label="Предыдущий"
          className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Image src="/icons/slidergallery/slider-arrow-back.svg" alt="" width={24} height={24} className="w-6 h-6" />
        </button>
        <button
          type="button"
          ref={nextRef}
          aria-label="Следующий"
          className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Image src="/icons/slidergallery/slider-arrow-forward.svg" alt="" width={24} height={24} className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
