"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { OFFERS_INDEX } from "@/data/offers";

export default function OffersSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // If you have < 3 items, clone the first to keep a continuous loop
  const slides = useMemo(() => {
    if (OFFERS_INDEX.length >= 3) return OFFERS_INDEX;
    const base = OFFERS_INDEX[0];
    return [0, 1, 2].map((i) => ({ ...base, _key: `${base.slug}-${i}` })) as any[];
  }, []);

  // Wire external arrows after Swiper is ready
  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw || !prevRef.current || !nextRef.current) return;
    // @ts-expect-error – runtime override is OK
    sw.params.navigation.prevEl = prevRef.current;
    // @ts-expect-error – runtime override is OK
    sw.params.navigation.nextEl = nextRef.current;
    sw.navigation.destroy();
    sw.navigation.init();
    sw.navigation.update();
  }, []);

  return (
    <section id="offers" className="w-full">
      <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#9b1b1b] mb-6">
        О НАС И НАШИ ПРЕДЛОЖЕНИЯ
      </h2>

      {/* No side gradients anymore. We darken non-active slides instead. */}
      <div className="relative overflow-hidden md:px-[49px]">
        <Swiper
          modules={[Navigation]}
          onSwiper={(sw) => (swiperRef.current = sw)}
          navigation
          loop
          loopAdditionalSlides={3}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={8}
          breakpoints={{
            768: { spaceBetween: 49 }, // keep Figmas 49px on md+
          }}
          className="offers-slider !overflow-visible"
        >
          {slides.map((o: any, idx: number) => (
            <SwiperSlide
              key={o._key ?? o.slug}
              /* Sharp rectangles + width that peeks neighbors on all devices:
                 - mobile:   100vw - 64px   (≈32px peek on each side)
                 - tablet+:  100vw - 98px   (keeps 49px gaps)
                 - xl:       fixed 1000px   (your desktop card width)
              */
              className="relative !w-[calc(100vw-64px)] md:!w-[calc(100vw-98px)] xl:!w-[1000px]"
            >
              <Link href={`/offers/${o.slug}`} className="block overflow-hidden">
                <article className="relative aspect-[1000/492]">
                  <Image
                    src={o.image}
                    alt={o.title}
                    fill
                    sizes="(min-width:1280px) 1000px, (min-width:768px) calc(100vw - 98px), calc(100vw - 64px)"
                    className="object-cover"
                    priority={idx === 0}
                  />

                  {/* Darken non-active slides (controlled by CSS below) */}
                  <div className="dim absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none" />

                  {/* Bottom gradient for legibility of text */}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/15 to-black/55" />

                  {/* Absolute text – always visible and never clipped */}
                  <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-10 md:px-6 md:pb-6 lg:px-8">
                    <div className="text-white drop-shadow-sm">
                      <div className="font-semibold leading-[1.1] text-[18px] sm:text-[20px] md:text-[28px]">
                        {o.title}
                      </div>
                      {o.subtitle && (
                        <div className="mt-1 opacity-90 text-[12px] sm:text-[14px] md:text-[18px]">
                          {o.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* External arrows (unchanged) */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          ref={prevRef}
          aria-label="Предыдущий"
          className="w-[64px] h-[64px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
        >
          <Image src="/icons/slidergallery/slider-arrow-back.svg" alt="" width={24} height={24} />
        </button>
        <button
          ref={nextRef}
          aria-label="Следующий"
          className="w-[64px] h-[64px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
        >
          <Image src="/icons/slidergallery/slider-arrow-forward.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {/* Global styles for the darkening rule */}
      <style jsx global>{`
        /* Slightly darken all slides except the centered one */
        .offers-slider .swiper-slide .dim {
          opacity: 0.35; /* tweak this value to match Figma exactly */
        }
        .offers-slider .swiper-slide-active .dim {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
