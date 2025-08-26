// src/components/hero/hero.tsx
"use client";

import Image from "next/image";
import HeroLogo from "@/components/hero/heroLogo";
import HeroButtons from "@/components/hero/heroButtons";
import ArrowDown from "@/components/ui/arrowDown";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* --- Mobile layout --- */}
      <div className="relative w-full aspect-[9/16] max-h-[92vh] md:hidden">
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
          {/* Логотип и плашка SINCE */}
          <Image
            src="/icons/brand/brand-logo-white.svg"
            alt="SVOY white logo"
            width={240}
            height={80}
            priority
          />
          <div className="mt-2 w-[240px] h-[42px] flex items-center justify-center bg-white text-[#9b1b1b] font-extrabold uppercase text-[14px] leading-[18px] tracking-wide">
            SINCE 2009
          </div>
          {/* Кнопки */}
          <HeroButtons />
          {/* Стрелка: прокручивает к секции «offers» */}
          <ArrowDown
            className="mt-[20px] md:mt-0"
            targetId="offers"
            offset={100}
          />
        </div>
      </div>

      {/* --- Desktop / Tablet layout --- */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <div className="relative w-full aspect-[1440/940]">
          {/* Фон с лёгким увеличением и градиентом */}
          <div className="absolute inset-y-0 left-[57px] right-[57px] overflow-hidden">
            <div className="relative w-full h-full transform scale-105">
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

          {/* Логотип + плашка SINCE — блок поднят вверх на 156px от навбара */}
          <div
            className="absolute z-40 flex flex-col items-start"
            style={{
              top: `calc(var(--nav-h) + 156px)`,
              left: "11.7%",
              width: "24.5%",
            }}
          >
            <HeroLogo />
          </div>

          {/* Блок кнопок (226 px ширина) и стрелка — всё внутри одного контейнера */}
          <div
            className="absolute z-40 flex flex-col gap-[24px]"
            style={{ top: "64.7%", left: "12.5%", width: "23.1%" }}
          >
            <HeroButtons />
            <div className="relative mx-auto mt-5 w-[21.21px] h-[34.85px]">
              <ArrowDown
                className="absolute top-[10px] left-[2.73px]"
                targetId="offers"
                offset={100}
              />
            </div>
          </div>

          {/* Коллаж — он оставался без изменений и теперь снова присутствует */}
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
