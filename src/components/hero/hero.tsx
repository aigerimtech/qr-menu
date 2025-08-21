"use client";

import Image from "next/image";
import SinceBadge from "@/components/ui/sinceBadge";
import ActionButton from "@/components/ui/actionButton";
import ArrowDown from "@/components/ui/arrowDown";

/* ---------- MOBILE-ONLY HERO ---------- */
function HeroMobile() {
  return (
    <div
      className="
        relative md:hidden w-screen
        h-[92svh] supports-[height:100dvh]:h-[92dvh]
        overflow-hidden bg-[#060606]
      "
    >
      <Image
        src="/images/hero/hero-steak.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/55" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <Image
          src="/icons/brand/brand-logo-white.svg"
          alt="SVOY"
          width={240}
          height={80}
          priority
        />
        {/* Since */}
        <SinceBadge className="mt-2" />
        {/* Buttons */}
        <div className="mt-10 w-full max-w-[280px] flex flex-col gap-4">
          <ActionButton variant="outline">Скачать меню</ActionButton>
          <ActionButton variant="solid">Смотреть меню на сайте</ActionButton>
        </div>
        {/* Arrow */}
        <div className="mt-8">
          <ArrowDown targetId="next-section" />
        </div>
      </div>
    </div>
  );
}

/* ---------- DESKTOP/TABLET HERO ---------- */
function HeroDesktop() {
  return (
    <div
      className="
        relative hidden md:block w-screen
        min-h-[calc(100svh-102px)] supports-[height:100dvh]:min-h-[calc(100dvh-102px)]
        overflow-hidden bg-[#060606]
      "
    >
      {/* Brightened background */}
      <Image
        src="/images/hero/hero-desktop.png"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ filter: "brightness(1.15)" }}
        sizes="100vw"
      />
      {/* Softer gradient for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/20 to-black/0" />

      {/* Filmstrips */}
      <div className="absolute inset-y-0 left-0 w-[72px] bg-black/70 z-20 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-full bg-repeat-y bg-center bg-contain opacity-85"
          style={{ backgroundImage: "url(/images/hero/filmstrip.png)" }}
        />
      </div>
      <div className="absolute inset-y-0 right-0 w-[72px] bg-black/70 z-20 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-full bg-repeat-y bg-center bg-contain opacity-85"
          style={{ backgroundImage: "url(/images/hero/filmstrip.png)" }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-30 max-w-[1440px] mx-auto h-full flex items-center px-4 md:px-8">
        {/* Left column: logo, badge, buttons, arrow */}
        <div className="flex flex-col gap-6" style={{ flexBasis: "45%", maxWidth: "520px" }}>
          {/* Responsive logo size */}
          <Image
            src="/icons/brand/brand-logo-white.svg"
            alt="SVOY"
            width={353}
            height={110}
            priority
            className="w-[clamp(240px,32vw,353px)] h-auto"
          />
          {/* Responsive SinceBadge */}
          <SinceBadge className="w-[clamp(240px,32vw,353px)] h-[clamp(42px,6vw,59px)] text-[clamp(14px,1.7vw,26px)] px-[10px] py-[11px]" />
          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-3 w-[clamp(240px,35vw,332px)]">
            <ActionButton variant="outline" className="w-full">Скачать меню</ActionButton>
            <ActionButton variant="solid" className="w-full">Смотреть меню на сайте</ActionButton>
          </div>
          {/* Arrow */}
          <div className="mt-6">
            <ArrowDown targetId="next-section" offset={102} />
          </div>
        </div>

        {/* Right column: collage */}
        <div className="relative flex-1 hidden lg:block overflow-visible hero-collage">
          {/* These absolute positions scale proportionally to the container
              so the collage looks correct on tablets and large desktops */}
          <div
            className="absolute border-[3px] border-white rounded-md shadow-lg overflow-hidden"
            style={{ top: "28%", left: "49%", width: "15%", height: "38%" }}
          >
            <Image
              src="/images/hero/hero-collage-meat.png"
              alt=""
              fill
              className="object-cover"
              sizes="223px"
            />
          </div>
          <div
            className="absolute border-[3px] border-white rounded-md shadow-lg overflow-hidden"
            style={{ top: "12%", left: "75%", width: "18%", height: "43%" }}
          >
            <Image
              src="/images/hero/hero-collage-pizza.png"
              alt=""
              fill
              className="object-cover"
              sizes="271px"
            />
          </div>
          <div
            className="absolute border-[3px] border-white rounded-md shadow-xl overflow-hidden"
            style={{ top: "18%", left: "60%", width: "22%", height: "58%" }}
          >
            <Image
              src="/images/hero/hero-steak.png"
              alt=""
              fill
              className="object-cover"
              sizes="338px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="w-full bg-[#060606]">
      <HeroMobile />
      <HeroDesktop />
    </section>
  );
}
