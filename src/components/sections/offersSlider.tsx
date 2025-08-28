// src/components/sections/offersSlider.tsx
"use client";

import {useEffect, useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import type {Swiper as SwiperType} from "swiper";
import {Navigation} from "swiper/modules";
import "swiper/css";

import {OFFERS_INDEX} from "@/data/offers";
import {useTranslations, useLocale} from "next-intl";

export default function OffersSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const locale = useLocale();

  // Section title (client-side)
  const t = useTranslations();
  const sectionTitle = safeT(t, "offers.sectionTitle") ?? "Offers";

  // Offer card texts (client-side, using a namespace)
  const tOffer = useTranslations("offerItems");

  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw || !prevRef.current || !nextRef.current) return;

    // Wire custom buttons after mount
    // @ts-expect-error - Swiper runtime params override
    sw.params.navigation.prevEl = prevRef.current;
    // @ts-expect-error - Swiper runtime params override
    sw.params.navigation.nextEl = nextRef.current;

    // Re-init navigation with custom elements
    try {
      sw.navigation.destroy();
    } catch {}
    sw.navigation.init();
    sw.navigation.update();
  }, []);

  // Small helper to insert a line break before/after " И " on mobile (Russian title style)
  const titleMobile =
    locale === "ru"
      ? sectionTitle.replace(" И ", " И\n ")
      : sectionTitle;

  return (
    <section id="offers" className="w-full">
      <h2 className="text-[24px] md:text-[40px] font-bold text-[#9b1b1b] mb-6 md:whitespace-nowrap">
        <>
          <span className="md:hidden whitespace-pre-line">{titleMobile}</span>
          <span className="hidden md:inline">{sectionTitle}</span>
        </>
      </h2>

      <div className="relative overflow-hidden md:px-[49px]">
        {/* edge masks for desktop */}
        <div className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-[49px] bg-gradient-to-r from-black/55 to-transparent" />
        <div className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-[49px] bg-gradient-to-l from-black/55 to-transparent" />

        <Swiper
          modules={[Navigation]}
          onSwiper={(sw) => (swiperRef.current = sw)}
          // We'll enable & attach navigation in the effect
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          loop={OFFERS_INDEX.length > 1}
          watchOverflow={false}
          resistanceRatio={0.85}
          spaceBetween={8}
          breakpoints={{
            0: {spaceBetween: 8},
            360: {spaceBetween: 10},
            480: {spaceBetween: 12},
            640: {spaceBetween: 16},
            768: {spaceBetween: 24},
            1024: {spaceBetween: 49}
          }}
          className="offers-slider !overflow-visible"
        >
          {OFFERS_INDEX.map(({slug, image}, idx) => {
            const offerTitle = safeT(tOffer, `${slug}.title`) ?? slug;
            const offerSubtitle = safeT(tOffer, `${slug}.subtitle`);

            return (
              <SwiperSlide
                key={slug}
                className="!w-[80vw] xs:!w-[82vw] sm:!w-[84vw] md:!w-[78vw] lg:!w-[1000px]"
              >
                <Link
                  href={`/${locale}/offers/${slug}`}
                  className="block group overflow-hidden"
                >
                  <article className="relative aspect-[1000/492]">
                    <Image
                      src={image}
                      alt={offerTitle}
                      fill
                      sizes="(min-width:1024px) 1000px, (min-width:768px) 78vw, (min-width:480px) 84vw, 80vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={idx === 0}
                    />
                    <div className="fade-bottom absolute left-0 right-0 bottom-0 pointer-events-none z-10" />
                    <div className="dim-all absolute inset-0 pointer-events-none z-10 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-10 md:px-6 md:pb-6 lg:px-8">
                      <div className="text-white drop-shadow-sm">
                        <div className="font-semibold leading-[1.1] text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px]">
                          {offerTitle}
                        </div>
                        {offerSubtitle && (
                          <div className="mt-1 opacity-90 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                            {offerSubtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* External arrows */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          ref={prevRef}
          aria-label="Предыдущий"
          className="grid place-items-center transition hover:bg-[#9b1b1b]/10 border-2 border-[#9b1b1b] rounded-[6px] w-[44px] h-[44px] md:w-[64px] md:h-[64px]"
        >
          <Image
            src="/icons/sliderGallery/slider-arrow-back.svg"
            alt=""
            width={20}
            height={20}
            className="block md:hidden"
            aria-hidden
          />
          <Image
            src="/icons/sliderGallery/slider-arrow-back.svg"
            alt=""
            width={32}
            height={32}
            className="hidden md:block"
            aria-hidden
          />
        </button>

        <button
          ref={nextRef}
          aria-label="Следующий"
          className="grid place-items-center transition hover:bg-[#9b1b1b]/10 border-2 border-[#9b1b1b] rounded-[6px] w-[44px] h-[44px] md:w-[64px] md:h-[64px]"
        >
          <Image
            src="/icons/sliderGallery/slider-arrow-forward.svg"
            alt=""
            width={20}
            height={20}
            className="block md:hidden"
            aria-hidden
          />
          <Image
            src="/icons/sliderGallery/slider-arrow-forward.svg"
            alt=""
            width={32}
            height={32}
            className="hidden md:block"
            aria-hidden
          />
        </button>
      </div>

      <style jsx global>{`
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
        .offers-slider .fade-bottom {
          height: 52%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 100%);
        }
        .offers-slider .dim-all { background: rgba(0,0,0,.28); }
        .offers-slider .swiper-slide-active .dim-all { background: transparent; }
        .offers-slider .swiper-slide { border-radius: 0; }
      `}</style>
    </section>
  );
}

// ---------- utils ----------
type TFunc = (key: string) => string;
function safeT(t: TFunc, key: string): string | undefined {
  try {
    const v = t(key);
    return typeof v === "string" ? v : undefined;
  } catch {
    return undefined;
  }
}
