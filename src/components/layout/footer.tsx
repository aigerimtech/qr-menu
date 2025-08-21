"use client";

import Image from "next/image";

/* ---------- FOOTER ---------- */
export default function Footer() {
  return (
    <footer className="w-full text-white">
      {/* Desktop / Tablet */}
      <div className="hidden md:block bg-[#820A0A]">
        <div className="relative mx-auto max-w-[1440px] h-[634px] px-8 pt-[72px]">
          <div className="grid grid-cols-3 gap-8">
            <section className="w-[192px] h-[130px]">
              <h3 className="text-[24px] font-semibold leading-7 mb-3">Контакты</h3>
              <p className="text-[16px] leading-6 mb-4">+7 777 09 00 333</p>
              <div className="flex items-center gap-4">
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
                
              </div>
            </section>

            <section className="w-[325px] h-[130px]">
              <h3 className="text-[24px] font-semibold leading-7 mb-3">Адреса</h3>
              <p className="text-[16px] leading-6">г. Астана, ул. Жумабаева, 24</p>
              <div className="mt-4">
                <Image src="/icons/adress-footer.png" alt="Адрес" width={24} height={24} />
              </div>
            </section>

            <section className="w-[239px] h-[171px] md:border-l md:border-white/70 md:pl-6">
              <h3 className="text-[24px] font-semibold leading-7 mb-3">Часы работы</h3>
              <DesktopSchedule />
            </section>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[348px] w-[254px] h-[192px] flex flex-col items-center">
            <Image
              src="/icons/brand/brand-logo-white.svg"
              alt="SVOY"
              width={254}
              height={120}
              priority
              className="w-[254px] h-auto"
            />
            <div className="mt-3 bg-white text-[#820A0A] px-4 py-2 rounded-md font-semibold">
              SINCE 2009
            </div>
          </div>

          <div className="absolute top-[448px] left-[100px] w-[396px] border-t-[4px] border-white/90" />
          <div className="absolute top-[448px] right-[100px] w-[396px] border-t-[4px] border-white/90" />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-[#820A0A]">
        <div className="px-5 pt-8 pb-12 flex flex-col gap-10">
          {/* Контакты */}
          <section>
            <h3 className="text-[26px] font-semibold leading-[34px]">Контакты</h3>
            <p className="mt-3 text-[18px] leading-[26px]">+7 777 09 00 333</p>
            <div className="mt-3 flex items-center gap-5">
              <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={28} height={28} />
              <Image src="/icons/instagram.svg" alt="Instagram" width={28} height={28} />
            </div>
          </section>

          {/* Адреса */}
          <section>
            <h3 className="text-[26px] font-semibold leading-[34px]">Адреса</h3>
            <p className="mt-3 text-[18px] leading-[26px]">г. Астана, ул. Жумабаева, 24</p>
            <div className="mt-3">
              <Image src="/icons/adress-footer.png" alt="Адрес" width={28} height={28} />
            </div>
          </section>

          {/* Часы работы с вертикальной линией между колонками */}
          <section className="relative">
            <h3 className="text-[26px] font-semibold leading-[34px]">Часы работы</h3>
            <div className="relative mt-4">
              <div className="absolute left-[88px] top-[6px] bottom-[6px] w-px bg-white/70" />
              <MobileSchedule />
            </div>
          </section>

          {/* Лого + бейдж слева снизу */}
          <div className="mt-10 ml-1 flex flex-col items-start">
            <Image
              src="/icons/brand/brand-logo-white.svg"
              alt="SVOY"
              width={200}
              height={120}
              className="w-[200px] h-auto"
            />
            <div className="mt-2 inline-flex bg-white text-[#820A0A] px-4 py-2 rounded-md font-extrabold uppercase text-[14px] leading-[14px]">
              Since 2009
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SCHEDULE (desktop) ---------- */
function DesktopSchedule() {
  const rows: [string, string][] = [
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

/* ---------- SCHEDULE (mobile, с вертикальной линией между колонками) ---------- */
function MobileSchedule() {
  const rows: [string, string][] = [
    ["Пн–Чт", "17:00–01:00"],
    ["Пт", "17:00–02:00"],
    ["Сб", "14:00–02:00"],
    ["Вс", "14:00–01:00"],
  ];
  return (
    <div className="text-[18px] leading-[28px]">
      {rows.map(([d, t]) => (
        <div key={d} className="grid grid-cols-[88px,1fr] gap-x-4 gap-y-2 items-baseline">
          <span>{d}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}
