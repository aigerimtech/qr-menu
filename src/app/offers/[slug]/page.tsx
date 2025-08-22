"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Modal from "@/components/sections/modal";

const offerData: Record<string, { title: string; description: string[]; images: string[] }> = {
  "vip-karaoke": {
    title: "VIP-зал с караоке",
    description: [
      "Наслаждайтесь приватной атмосферой для 28 гостей..."
    ],
    images: [
      "/images/offers/vip-karaoke.png",
      "/images/offers/vip-karaoke.png",
      "/images/offers/vip-karaoke.png"
    ],
  },
};

export default function OfferPage({ params }: { params: { slug: string } }) {
  const offer = offerData[params.slug];
  const [open, setOpen] = useState(false);
  if (!offer) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* back */}
      <Link
        href="/#offers"
        className="fixed top-[96px] left-4 z-40 md:hidden text-[#9b1b1b] p-2 bg-white/90 rounded-sm"
        aria-label="Назад"
      >
        ←
      </Link>

      {/* gallery */}
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={1}
        className="h-[300px] md:h-[460px] lg:h-[560px]"
      >
        {offer.images.map((img) => (
          <SwiperSlide key={img}>
            <div className="relative h-full">
              <Image src={img} alt={offer.title} fill sizes="100vw" className="object-cover" priority />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* text + CTA */}
      <section className="max-w-[720px] mx-auto p-5 md:p-8 space-y-4">
        <h1 className="text-[28px] md:text-[36px] font-bold text-[#151515]">{offer.title}</h1>
        {offer.description.map((p, i) => (
          <p key={i} className="text-[16px] md:text-[18px] leading-[26px] text-[#2a2a2a]">
            {p}
          </p>
        ))}
        <div className="pt-2">
          <button
            onClick={() => setOpen(true)}
            className="w-full md:w-auto bg-[#9b1b1b] text-white px-8 py-3 rounded-sm hover:bg-[#821616] transition"
          >
            Забронировать
          </button>
        </div>
      </section>

      {/* modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="text-center space-y-5">
            <h2 className="text-[22px] md:text-[24px] font-bold">Бронирование</h2>
            <p>Свяжитесь с нами удобным способом:</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/77770900333"
                target="_blank"
                rel="noopener"
                className="bg-green-600 text-white px-5 py-2 rounded-sm"
              >
                WhatsApp
              </a>
              <a href="tel:+77770900333" className="bg-[#9b1b1b] text-white px-5 py-2 rounded-sm">
                Позвонить
              </a>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

