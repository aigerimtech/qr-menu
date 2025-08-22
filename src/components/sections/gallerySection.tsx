"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    slug: "vip-karaoke",
    title: "VIP-зал с караоке",
    subtitle: "до 28 человек",
    image: "/images/offers/vip-karaoke.png",
  },
];

export default function GallerySection() {
  return (
    <section id="offers" className="w-full">
      <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#9b1b1b] mb-6">
        О нас и наши предложения
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 1.2 },
            1024: { slidesPerView: 1.6 },
          }}
          className="relative"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.slug} className="relative">
              <Link href={`/offers/${offer.slug}`}>
                <article className="relative h-[280px] md:h-[360px] lg:h-[420px] rounded-lg overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 60vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{offer.title}</h3>
                    <p className="text-sm">{offer.subtitle}</p>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* стрелки под слайдером */}
        <div className="mt-4 flex items-center gap-3">
          <button className="swiper-button-prev w-10 h-10 border border-[#9b1b1b] text-[#9b1b1b] flex items-center justify-center rounded-md hover:bg-[#9b1b1b]/10">
            <span>&larr;</span>
          </button>
          <button className="swiper-button-next w-10 h-10 border border-[#9b1b1b] text-[#9b1b1b] flex items-center justify-center rounded-md hover:bg-[#9b1b1b]/10">
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
