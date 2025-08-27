"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { getOfferBySlug } from "@/data/offers";

export default function OffersSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const offer = getOfferBySlug("vip-karaoke");
  const slides = offer?.images ?? [];

  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw || !prevRef.current || !nextRef.current) return;
    // attach external nav
    // @ts-expect-error runtime override
    sw.params.navigation.prevEl = prevRef.current;
    // @ts-expect-error runtime override
    sw.params.navigation.nextEl = nextRef.current;
    sw.navigation.destroy();
    sw.navigation.init();
    sw.navigation.update();
  }, []);

  return (
    <section id="offers" className="w-full">
      <h2 className="text-[24px] md:text-[40px] font-bold text-[#9b1b1b] mb-6 md:whitespace-nowrap">
         О НАС И НАШИ <br className="md:hidden" /> ПРЕДЛОЖЕНИЯ
      </h2>

      <div className="relative overflow-hidden md:px-[49px]">
        {/* edge masks on desktop */}
        <div className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-[49px] bg-gradient-to-r from-black/55 to-transparent" />
        <div className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-[49px] bg-gradient-to-l from-black/55 to-transparent" />

        <Swiper
          modules={[Navigation]}
          onSwiper={(sw) => (swiperRef.current = sw)}
          navigation
          loop={slides.length > 1}
          watchOverflow={false}
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          resistanceRatio={0.85}
          spaceBetween={8}
          breakpoints={{
            // very small phones (Fold portrait, older iPhones): keep a strong peek
            0:    { spaceBetween: 8  },
            360:  { spaceBetween: 10 },
            480:  { spaceBetween: 12 },
            640:  { spaceBetween: 16 },
            768:  { spaceBetween: 24 },
            1024: { spaceBetween: 49 },
          }}
          className="offers-slider !overflow-visible"
        >
          {slides.map((img, idx) => (
            <SwiperSlide
              key={img.id}
              /* Fixed widths per breakpoint so neighbors ALWAYS peek */
              className="
                !w-[80vw]         /* default: tiny phones / Fold portrait */
                xs:!w-[82vw]
                sm:!w-[84vw]
                md:!w-[78vw]
                lg:!w-[1000px]
              "
            >
              <Link href="/offers/vip-karaoke" className="block group overflow-hidden">
                <article className="relative aspect-[1000/492]">
                  <Image
                    src={img.src}
                    alt={offer.title}
                    fill
                    sizes="(min-width:1024px) 1000px, (min-width:768px) 78vw, (min-width:480px) 84vw, 80vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={idx === 0}
                  />

                  {/* bottom-only gradient band (≈52% of slide height) */}
                  <div className="fade-bottom absolute left-0 right-0 bottom-0 pointer-events-none z-10" />

                  {/* dim side slides; active stays bright */}
                  <div className="dim-all absolute inset-0 pointer-events-none z-10 transition-opacity duration-300" />

                  {/* ABSOLUTE text so it's never clipped on any device */}
                  <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-10 md:px-6 md:pb-6 lg:px-8">
                    <div className="text-white drop-shadow-sm">
                      <div className="font-semibold leading-[1.1] text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px]">
                        {offer.title}
                      </div>
                      {offer.subtitle && (
                        <div className="mt-1 opacity-90 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                          {offer.subtitle}
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

      {/* arrows  */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          ref={prevRef}
          aria-label="Предыдущий"
          className="w-[44px] h-[44px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
        >
          <Image src="/icons/sliderGallery/slider-arrow-back.svg" alt="" width={20} height={20} />
        </button>
        <button
          ref={nextRef}
          aria-label="Следующий"
          className="w-[44px] h-[44px] border-2 border-[#9b1b1b] rounded-[6px] grid place-items-center hover:bg-[#9b1b1b]/10 transition"
        >
          <Image src="/icons/sliderGallery/slider-arrow-forward.svg" alt="" width={20} height={20} />
        </button>
      </div>

      {/* styles */}
      <style jsx global>{`
        /* Add a tiny 'xs' breakpoint if you don't already have one in Tailwind config */
        @media (min-width: 420px) {
          .xs\\:\\!w-\\[82vw\\] { width: 82vw !important; }
        }
        @media (min-width: 640px) {
          .sm\\:\\!w-\\[84vw\\] { width: 84vw !important; }
        }
        @media (min-width: 768px) {
          .md\\:\\!w-\\[78vw\\] { width: 78vw !important; }
        }
        @media (min-width: 1024px) {
          .lg\\:\\!w-\\[1000px\\] { width: 1000px !important; }
        }

        /* bottom-only gradient strip ≈ 52% of slide height */
        .offers-slider .fade-bottom {
          height: 52%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%);
        }

        /* dim all slides, keep the center bright */
        .offers-slider .dim-all { background: rgba(0,0,0,.28); }
        .offers-slider .swiper-slide-active .dim-all { background: transparent; }

        /* sharp corners for slides */
        .offers-slider .swiper-slide { border-radius: 0; }
      `}</style>
    </section>
  );
}
