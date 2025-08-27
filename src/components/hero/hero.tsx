"use client";

import Image from "next/image";
import Container from "@/components/layout/container";
import HeroLogo from "@/components/hero/heroLogo";       
import HeroButtons from "@/components/hero/heroButtons"; 
import ArrowDown from "@/components/ui/arrowDown";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* ---------- Mobile ---------- */}
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

        {/* Центровка логотипа и плашки */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center px-4 h-full pointer-events-none">
          {/* Логотип + SINCE (mobile размеры из прежней версии) */}
          <div className="pointer-events-auto">
            <Image
              src="/icons/logo/logo-white.svg"
              alt="SVOY white logo"
              width={240}
              height={80}
              priority
            />
            <div className="mt-2 w-[240px] h-[42px] flex items-center justify-center bg-white text-[#9b1b1b] font-extrabold uppercase text-[14px] leading-[18px] tracking-wide">
              SINCE&nbsp;2009
            </div>
          </div>

          {/* Кнопки — строго от низа:
              нижняя на 98px, верхняя из-за h=51 и gap=16 даёт 165px */}
          <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-[98px]">
            <HeroButtons variant="mobile" />
          </div>

          {/* Стрелка — на 38px ниже нижней кнопки → 98 - 38 = 60 */}
          <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-[60px]">
            <div className="relative w-[21.21163px] h-[34.84713px]">
              <ArrowDown
                className="absolute top-[10px] left-[2.73px]"
                targetId="offers"
                offset={100}
                ariaLabel="Прокрутить вниз"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Desktop / Tablet ---------- */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <Container>
          <div className="relative w-full aspect-[1440/940]">
            {/* Фон (обрез по 57px слева/справа) */}
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

            {/* Плёнки по бокам */}
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

            {/* Логотип + SINCE (позиционирование только здесь) */}
            <div
              className="absolute z-40 flex flex-col items-start"
              style={{ top: "26.8%", left: "11.7%", width: "24.5%" }}
            >
              <HeroLogo />
            </div>

            {/* Кнопки + стрелка (позиции в % по макету) */}
            <div
              className="absolute z-40 flex flex-col"
              style={{ top: "64.7%", left: "12.5%", width: "23.1%" }}
            >
              <HeroButtons variant="desktop" />
              <div className="relative mx-auto mt-[38px] w-[21.21163px] h-[34.84713px]">
                <ArrowDown
                  className="absolute top-[10px] left-[2.73px]"
                  targetId="offers"
                  offset={100}
                />
              </div>
            </div>

            {/* Коллаж */}
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
        </Container>
      </div>
    </section>
  );
}
