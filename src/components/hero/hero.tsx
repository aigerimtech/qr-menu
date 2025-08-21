"use client";

import Image from "next/image";
import SinceBadge from "@/components/ui/sinceBadge";
import ActionButton from "@/components/ui/actionButton";
import ArrowDown from "@/components/ui/arrowDown";

/* ---------- HERO ---------- */
export default function Hero() {
  return (
    <section className="relative w-full">
      {/* Mobile */}
      <div className="relative w-full aspect-[9/16] max-h-[92dvh] md:hidden">
        <Image
          src="/images/hero/hero-steak.png"
          alt=""
          fill
          priority
          className="object-cover brightness-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <Image
            src="/icons/brand/brand-logo-white.svg"
            alt="SVOY white logo"
            width={240}
            height={80}
            priority
          />
          <SinceBadge className="mt-2" />
          <div className="mt-12 flex w-[273px] flex-col gap-4">
            <ActionButton variant="outline">Скачать меню</ActionButton>
            <ActionButton variant="solid">Смотреть меню на сайте</ActionButton>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <ArrowDown targetId="next-section" />
          </div>
        </div>
      </div>

      {/* Desktop / Tablet (Figma 1440x940 stage that scales) */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1440px] aspect-[1440/940]">
          {/* Background cropped by 57px each side (30 strip + 27 gap) */}
          <div className="absolute inset-y-0 left-[57px] right-[57px]">
            <Image
              src="/images/hero/hero-desktop.png"
              alt=""
              fill
              priority
              className="object-cover brightness-115 lg:brightness-125"
              sizes="100vw"
            />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/30 via-black/15 to-transparent" />
          </div>

          {/* Filmstrips UNDER collage (z-20) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[57px] bg-black">
            <div
              className="absolute top-0 left-0 w-[30px] h-full bg-repeat-y bg-center bg-contain opacity-85"
              style={{ backgroundImage: "url(/images/hero/filmstrip.png)" }}
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[57px] bg-black">
            <div
              className="absolute top-0 right-0 w-[30px] h-full bg-repeat-y bg-center bg-contain opacity-85"
              style={{ backgroundImage: "url(/images/hero/filmstrip.png)" }}
            />
          </div>

          {/* Left stack: logo + since (kept together) */}
          <div
            className="absolute z-40"
            style={{ top: "26.8%", left: "11.7%", width: "24.5%" }}
          >
            <Image
              src="/icons/brand/brand-logo-white.svg"
              alt="SVOY white logo"
              width={353}
              height={100}
              priority
              className="w-full h-auto"
              sizes="24vw"
            />
            <SinceBadge
              className="
                mt-[6.11%] w-full h-[59px] min-h-[42px]
                px-[44px] text-[clamp(14px,1.7vw,26px)] font-extrabold uppercase
              "
            />
          </div>

          {/* Buttons + arrow */}
          <div
            className="absolute z-40 flex flex-col gap-[12px]"
            style={{ top: "64.7%", left: "12.5%", width: "23.1%" }}
          >
            <ActionButton variant="outline" className="w-full md:w-[226px]">
              Скачать меню
            </ActionButton>
            <ActionButton variant="solid" className="w-full md:w-[332px]">
              Смотреть меню на сайте
            </ActionButton>
            <div className="relative mx-auto mt-5 w-[21.21px] h-[34.85px]">
              <ArrowDown
                className="absolute top-[10px] left-[2.73px]"
                targetId="next-section"
                offset={102}
              />
            </div>
          </div>

          {/* Collage ABOVE filmstrips (z-30) */}
          <div className="relative z-30 w-full h-full">
            <div
              className="absolute border-[3px] border-white rounded-md shadow-lg overflow-hidden z-30"
              style={{ top: "38.9%", left: "46.6%", width: "15.5%", height: "45.6%" }}
            >
              <Image
                src="/images/hero/hero-collage-meat.png"
                alt=""
                fill
                className="object-cover"
                sizes="15.5vw"
              />
            </div>
            <div
              className="absolute border-[3px] border-white rounded-md shadow-lg overflow-hidden z-30"
              style={{ top: "16.4%", left: "71%", width: "18.8%", height: "51.6%" }}
            >
              <Image
                src="/images/hero/hero-collage-pizza.png"
                alt=""
                fill
                className="object-cover"
                sizes="18.8vw"
              />
            </div>
            <div
              className="absolute border-[3px] border-white rounded-md shadow-xl overflow-hidden z-30"
              style={{ top: "23.4%", left: "56.6%", width: "23.5%", height: "69.1%" }}
            >
              <Image
                src="/images/hero/hero-steak.png"
                alt=""
                fill
                className="object-cover"
                sizes="23.5vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
