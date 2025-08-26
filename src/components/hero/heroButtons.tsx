"use client";

import React from "react";

type Props = { variant?: "mobile" | "desktop" };

function SmoothScroll({
  targetId,
  offset = 96,
  children,
  className = "",
}: {
  targetId: string;
  offset?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };
  return (
    <a href={`#${targetId}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

export default function HeroButtons({ variant = "desktop" }: Props) {
  const isMobile = variant === "mobile";

  // размеры по макету
  const dlW = isMobile ? "w-[188px]" : "w-[226px]";
  const dlH = isMobile ? "h-[51px]" : "h-[63px]";
  const viewW = isMobile ? "w-[273px]" : "w-[332px]";
  const viewH = isMobile ? "h-[51px]" : "h-[63px]";
  const pxX = isMobile ? "px-[40px]" : "px-[44px]";
  const pyY = "py-[20px]";

  return (
    <div className={`flex flex-col items-center ${isMobile ? "gap-[16px]" : "gap-[24px]"}`}>
      {/* Скачать меню */}
      <a
        href="#"
        className={[
          "flex items-center justify-center rounded-[2px] border font-semibold text-[20px] leading-[20px]",
          dlW, dlH, pxX, pyY,
          "bg-black/50 text-white border-white",
          "shadow-[0_0_12px_0_#000000BF] backdrop-blur-[3px]",
          "hover:bg-black/60",
        ].join(" ")}
      >
        Скачать&nbsp;меню
      </a>

      {/* Смотреть меню на сайте — скролл к #menu */}
      <SmoothScroll targetId="menu" offset={96}
        className={[
          "flex items-center justify-center rounded-[2px] border font-semibold text-[20px] leading-[20px]",
          viewW, viewH, pxX, pyY,
          "bg-white text-[#9b1b1b] border-[#9b1b1b]",
          "shadow-[0_0_12px_0_rgba(0,0,0,0.75)] hover:bg-gray-50",
        ].join(" ")}
      >
        Смотреть&nbsp;меню&nbsp;на&nbsp;сайте
      </SmoothScroll>
    </div>
  );
}
