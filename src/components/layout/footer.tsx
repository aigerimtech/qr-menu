"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full text-white">
      {/* ====== LAPTOP / iPad (≥ md) ====== */}
      <div className="hidden md:block bg-[#820A0A]">
        <div className="relative mx-auto max-w-[1440px] h-[634px] px-8 pt-[72px]">
          {/* 3 columns */}
          <div className="grid grid-cols-3 gap-8">
            {/* Контакты (≈192×130) */}
            <section style={{ width: 192, height: 130 }}>
              <h3 className="text-[24px] font-semibold leading-7 mb-3">Контакты</h3>
              <p className="text-[16px] leading-6 mb-4">+7 777 09 00 333</p>
              <div className="flex items-center gap-4">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" width="24" height="24" />
                <img src="/icons/instagram.svg" alt="Instagram" width="24" height="24" />
                <img src="/icons/phone.svg" alt="Phone" width="24" height="24" />
              </div>
            </section>

            {/* Адреса (≈325×130) */}
            <section style={{ width: 325, height: 130 }}>
              <h3 className="text-[24px] font-semibold leading-7 mb-3">Адреса</h3>
              <p className="text-[16px] leading-6">г. Астана, ул. Жумабаева, 24</p>
              <div className="mt-4">
                {/* your PNG address icon */}
                <img src="/icons/adress-footer.png" alt="Адрес" width="24" height="24" />
              </div>
            </section>

            {/* Часы работы (≈239×171) + левый бордер 1px */}
            <section
              className="pl-6"
              style={{ width: 239, height: 171, borderLeft: "1px solid rgba(255,255,255,0.7)" }}
            >
              <h3 className="text-[24px] font-semibold leading-7 mb-3">Часы работы</h3>
              <Schedule />
            </section>
          </div>

          {/* Центр SVOY (254×192) */}
          <div className="absolute left-[593px] top-[348px] w-[254px] h-[192px] flex flex-col items-center">
            <Image
              src="/assets/brand/brand-logo-red.svg"
              alt="SVOY"
              width={254}
              height={120}
              className="w-[254px] h-auto"
              priority
            />
            <div className="mt-3 bg-white text-[#820A0A] px-4 py-2 rounded-md font-semibold">
              SINCE 2009
            </div>
          </div>

          {/* Белые линии (396px; border 4px; y ≈ 448) */}
          <div className="absolute left-[100px] top-[448px] w-[396px] border-t-[4px] border-white/90" />
          <div className="absolute left-[944px] top-[448px] w-[396px] border-t-[4px] border-white/90" />
        </div>
      </div>

      {/* ====== MOBILE (< md) ====== */}
      <div className="md:hidden bg-[#820A0A]">
        <div className="px-4 py-6 flex flex-col gap-10">
          {/* Контакты (≈160×107) */}
          <section style={{ width: 160 }}>
            <h3 className="text-[22px] font-semibold mb-2">Контакты</h3>
            <p className="text-[16px] leading-6 mb-3">+7 777 09 00 333</p>
            <div className="flex items-center gap-4">
              <img src="/icons/whatsapp.svg" alt="WhatsApp" width="24" height="24" />
              <img src="/icons/instagram.svg" alt="Instagram" width="24" height="24" />
              <img src="/icons/phone.svg" alt="Phone" width="24" height="24" />
            </div>
          </section>

          {/* Адреса (≈271×107) */}
          <section style={{ width: 271 }}>
            <h3 className="text-[22px] font-semibold mb-2">Адреса</h3>
            <p className="text-[16px] leading-6">г. Астана, ул. Жумабаева, 24</p>
            <div className="mt-3">
              <img src="/icons/adress-footer.png" alt="Адрес" width="24" height="24" />
            </div>
          </section>

          {/* Часы работы (≈195×156) + левый бордер 1px */}
          <section
            className="pl-4"
            style={{ width: 195, borderLeft: "1px solid rgba(255,255,255,0.7)" }}
          >
            <h3 className="text-[22px] font-semibold mb-2">Часы работы</h3>
            <Schedule />
          </section>

          {/* Лого SVOY (≈155×139) */}
          <div className="mt-2 flex flex-col items-start">
            <Image
              src="/assets/brand/brand-logo-red.svg"
              alt="SVOY"
              width={155}
              height={100}
              className="w-[155px] h-auto"
            />
            <div className="mt-2 bg-white text-[#820A0A] px-3 py-1.5 rounded-md font-semibold text-sm">
              SINCE 2009
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* schedule lines helper */
function Schedule() {
  const rows = [
    ["Пн–Чт", "17:00–01:00"],
    ["Пт", "17:00–02:00"],
    ["Сб", "14:00–02:00"],
    ["Вс", "14:00–01:00"],
  ];
  return (
    <div className="text-[16px] leading-7">
      {rows.map(([d, t]) => (
        <div key={d} className="grid grid-cols-[56px,1fr] gap-4">
          <span className="opacity-90">{d}</span>
          <span className="opacity-100">{t}</span>
        </div>
      ))}
    </div>
  );
}
