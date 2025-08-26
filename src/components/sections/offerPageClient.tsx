"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Modal from "@/components/sections/modal";

export interface OfferImage { id: string; src: string }
export interface Offer {
  title: string;
  subtitle?: string;
  images: OfferImage[];
  content?: string[];
}

export default function OfferPageClient({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // Remove navbar gap & hide footer only on this page
  useEffect(() => {
    const root = document.documentElement;
    const prevNavH = root.style.getPropertyValue("--nav-h");

    root.style.setProperty("--nav-h", "0px");
    root.classList.add("hide-footer");

    return () => {
      if (prevNavH) root.style.setProperty("--nav-h", prevNavH);
      else root.style.removeProperty("--nav-h");
      root.classList.remove("hide-footer");
    };
  }, []);

  // Custom white rectangle pagination (8×8 inactive, 12×8 active)
  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw || !paginationRef.current) return;
    // @ts-expect-error override
    sw.params.pagination.el = paginationRef.current;
    // @ts-expect-error override
    sw.params.pagination.clickable = true;
    // @ts-expect-error override
    sw.params.pagination.renderBullet = (_i: number, className: string) =>
      `<span class="${className} offer-detail-bullet"></span>`;
    sw.pagination.destroy();
    sw.pagination.init();
    sw.pagination.render();
    sw.pagination.update();
  }, []);

  const onShare = useCallback(async () => {
    const shareData = {
      title: offer.title,
      text: offer.subtitle ?? offer.title,
      url: typeof window !== "undefined" ? window.location.href : "/",
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Ссылка скопирована в буфер обмена");
      } else {
        window.location.href = `mailto:?subject=${encodeURIComponent(
          shareData.title
        )}&body=${encodeURIComponent(shareData.url)}`;
      }
    } catch {}
  }, [offer]);

  return (
    <main className="min-h-screen bg-white font-raleway">
      {/* Gallery */}
      <div className="relative">
        <Link
          href="/#offers"
          aria-label="Назад"
          className="absolute top-4 left-4 z-40 grid place-items-center w-10 h-10 rounded bg-white/60"
        >
          <Image src="/icons/arrow-back.svg" alt="Назад" width={24} height={24} className="w-6 h-6" priority />
        </Link>

        <Swiper
          modules={[Pagination]}
          onSwiper={(sw) => (swiperRef.current = sw)}
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

        {/* white rectangle bullets */}
        <div
          ref={paginationRef}
          className="offer-detail-pagination absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-3 z-30"
        />
      </div>

      {/* Content */}
      <section className="mx-auto w-full max-w-[720px] px-6 md:px-8">
        <div className="flex items-center justify-between pt-4">
          <h1 className="font-semibold text-[20px] leading-[100%] text-[#000]">{offer.title}</h1>
          <button
            onClick={onShare}
            aria-label="Поделиться"
            className="p-2 -m-2 rounded hover:bg-black/5 active:bg-black/10"
          >
            <Image
              src="/icons/contact/share.svg"
              alt=""
              width={18}
              height={20}
              className="w-[18px] h-[20px]"
              priority
            />
          </button>
        </div>

        <div className="mt-3 h-px w-full bg-[#E5E5E5]" />

        <div className="mx-auto w-full max-w-[364px] md:max-w-none">
          {(offer.content ?? []).map((p, i) => (
            <p
              key={i}
              className="mt-6 text-[14px] leading-[100%] font-medium text-black/80"
              style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[364px] md:max-w-[520px] lg:max-w-[640px]">
          <button
            onClick={() => setOpen(true)}
            className="mt-12 w-[364px] max-w-full h-[51px] rounded-sm bg-[#961515] text-white px-[40px] py-[16px] text-[18px] leading-[100%] font-raleway shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
          >
            Забронировать
          </button>
        </div>
      </section>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="w-[364px] max-w-full mx-auto text-center">
            <h2 className="text-[22px] md:text-[24px] font-bold font-raleway">Бронирование</h2>
            <p className="mt-3 text-[14px] text-black/70">Свяжитесь с нами удобным способом:</p>

            <div className="mt-5 flex flex-col items-center gap-4">
              <a
                href="https://wa.me/77770900333"
                target="_blank"
                rel="noopener"
                className="w-[364px] max-w-full h-[56px] bg-[#25D366] text-white flex items-center justify-center gap-3 px-[40px] py-[16px] rounded-sm text-[16px] leading-[100%] font-medium font-raleway"
              >
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
                Написать Whatsapp
              </a>

              <a
                href="tel:+77770900333"
                className="w-[364px] max-w-full h-[56px] bg-white text-[#9b1b1b] border-2 border-[#9b1b1b] flex items-center justify-center gap-3 px-[40px] py-[16px] rounded-sm text-[16px] leading-[100%] font-medium font-raleway"
              >
                <Image src="/icons/phone.svg" alt="Телефон" width={24} height={24} className="w-6 h-6" />
                Позвонить по номеру
              </a>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
