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

export default function OffersCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 1.05 },
          768: { slidesPerView: 1.15 },
          1024: { slidesPerView: 1.2 },
        }}
        className="overflow-visible"
      >
        {OFFERS.map((o) => (
          <SwiperSlide key={o.slug}>
            <Link
              href={`/offers/${o.slug}`}
              className="block group rounded-md overflow-hidden"
            >
              <div className="relative w-full h-[240px] md:h-[420px] lg:h-[480px]">
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
                {/* тёмный градиент снизу + текст */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <div className="text-white text-[22px] md:text-[28px] font-semibold drop-shadow">
                    {o.title}
                  </div>
                  <div className="text-white/90 text-[16px] md:text-[18px]">
                    {o.subtitle}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* стрелки под слайдером */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          ref={prevRef}
          aria-label="Предыдущий"
          className="w-[64px] h-[64px] border border-[#9b1b1b] text-[#9b1b1b] rounded-sm grid place-items-center hover:bg-[#9b1b1b] hover:text-white transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          ref={nextRef}
          aria-label="Следующий"
          className="w-[64px] h-[64px] border border-[#9b1b1b] text-[#9b1b1b] rounded-sm grid place-items-center hover:bg-[#9b1b1b] hover:text-white transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
