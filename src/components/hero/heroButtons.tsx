// src/components/hero/HeroButtons.tsx
"use client";

export default function HeroButtons() {
  return (
    <div className="flex flex-col items-center gap-[12px] md:gap-[24px]">
      {/* Скачать меню — тёмная полупрозрачная кнопка */}
      <a
        href="#"
        className="
          flex items-center justify-center
          w-[188px] md:w-[226px]
          h-[51px] md:h-[63px]
          px-[40px] md:px-[44px]
          text-[20px] leading-[20px] font-semibold
          bg-[#00000066] md:bg-black/50 text-white
          border border-white rounded-[2px]
          shadow-[0_0_12px_0_rgba(0,0,0,0.75)]
          backdrop-blur-[3px]
          hover:bg-black/60
        "
      >
        Скачать меню
      </a>

      {/* Смотреть меню на сайте — белая кнопка с красной рамкой */}
      <a
        href="#menu"
        className="
          flex items-center justify-center
          w-[273px] md:w-[226px]
          h-[51px] md:h-[63px]
          px-[40px] md:px-[44px]
          text-[20px] leading-[20px] font-semibold
          bg-white text-[#9b1b1b]
          border border-[#9b1b1b] rounded-[2px]
          shadow-[0_0_12px_0_rgba(0,0,0,0.75)]
          hover:bg-gray-50
        "
      >
        Смотреть меню на сайте
      </a>
    </div>
  );
}
