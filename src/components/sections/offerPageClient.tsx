"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Modal from "@/components/sections/modal";

export interface OfferImage {
  id: string;
  src: string;
}

export interface Offer {
  title: string;
  subtitle?: string;
  images: OfferImage[];
  content?: string[]; // optional long text blocks
}

export default function OfferPageClient({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false);

  // Share button behavior
  const onShare = useCallback(async () => {
    const shareData = {
      title: offer.title,
      text: offer.subtitle ?? offer.title,
      url: typeof window !== "undefined" ? window.location.href : "/",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Ссылка скопирована в буфер обмена");
      } else {
        // Fallback: open system share via mailto
        window.location.href = `mailto:?subject=${encodeURIComponent(
          shareData.title
        )}&body=${encodeURIComponent(shareData.url)}`;
      }
    } catch {
      // user canceled or failed; silently ignore
    }
  }, [offer]);

  return (
    <main className="min-h-screen bg-white">
      {/* Slider wrapper keeps overlay buttons inside the frame */}
      <div className="relative">
        {/* Back button (40x40, bg white 0.6, white icon) */}
        <Link
          href="/#offers"
          aria-label="Назад"
          className="absolute top-4 left-4 z-40 grid place-items-center w-10 h-10 rounded bg-white/60"
        >
          <Image
            src="/icons/arrow-back.svg"
            alt="Назад"
            width={24}
            height={24}
            className="w-6 h-6"
            priority
          />
        </Link>

        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          slidesPerView={1}
          className="aspect-[412/372] md:h-[492px] lg:h-[560px]"
        >
          {offer.images.map(({ id, src }, i) => (
            <SwiperSlide key={id}>
              <div className="relative h-full">
                <Image
                  src={src}
                  alt={offer.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content */}
      <section className="mx-auto w-full max-w-[720px] px-6 md:px-8">
        {/* Title row */}
        <div className="flex items-center justify-between pt-4">
          <h1 className="font-raleway font-semibold text-[20px] leading-[20px] text-[#000]">
            {offer.title}
          </h1>

          {/* Share button (24x24 icon, no label) */}
          <button
            onClick={onShare}
            aria-label="Поделиться"
            className="p-2 -m-2 rounded hover:bg-black/5 active:bg-black/10"
          >
            {/* Inline share icon so you don't need a file; swap to your svg if preferred */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 8a3 3 0 10-2.83-3.99A3 3 0 0018 8zM6 14a3 3 0 102.83 3.99A3 3 0 006 14zm12 0a3 3 0 102.83 3.99A3 3 0 0018 14z"
                fill="#151515"
                opacity="0.9"
              />
              <path
                d="M8.6 16.6l6.8-3.2M8.6 7.6l6.8 3.2"
                stroke="#151515"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Thin divider */}
        <div className="mt-3 h-px w-full bg-[#E5E5E5]" />

        {/* Text blocks — constrained to 364px on small screens to match Figma */}
        <div className="mx-auto w-full max-w-[364px] md:max-w-none">
          {(offer.content ?? []).map((p, i) => (
            <p
              key={i}
              className="mt-6 text-[16px] leading-[24px] text-black/80 font-raleway"
            >
              {p}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-auto w-full max-w-[364px] md:max-w-[520px] lg:max-w-[640px] pb-10 md:pb-14">
          <button
            onClick={() => setOpen(true)}
            className="mt-8 w-full rounded-sm bg-[#961515] px-10 py-[16px] text-white text-[18px] leading-[22px] font-raleway shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
          >
            Забронировать
          </button>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="text-center space-y-5">
            <h2 className="text-[22px] md:text-[24px] font-bold">Бронирование</h2>
            <p>Свяжитесь с нами удобным способом:</p>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/77770900333"
                target="_blank"
                rel="noopener"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-sm"
              >
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                <span>Написать Whatsapp</span>
              </a>
              <a
                href="tel:+77770900333"
                className="w-full flex items-center justify-center gap-3 border-2 border-[#9b1b1b] text-[#9b1b1b] px-5 py-3 rounded-sm"
              >
                <Image src="/icons/phone.svg" alt="Телефон" width={24} height={24} />
                <span>Позвонить по номеру</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
