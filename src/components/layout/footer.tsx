"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

type WorkRow = { label: string; time: string };

export default function Footer() {
  const t = useTranslations("footer");

  const phoneText = t("phone");
  const phoneHref = phoneText.replace(/[^\d+]/g, "");
  const addressText = t("address");

  const work = t.raw("work") as {
    monThu: WorkRow;
    fri: WorkRow;
    sat: WorkRow;
    sun: WorkRow;
  };

  const rows: WorkRow[] = [work.monThu, work.fri, work.sat, work.sun];

  return (
    <footer id="site-footer" className="w-full text-white">
      {/* Desktop / Tablet */}
      <div className="hidden md:block bg-[#820A0A]">
        <div className="relative mx-auto max-w-[1440px] h-[634px] px-8 pt-[72px]">
          <div className="grid grid-cols-3 gap-8">
            <section className="w-[192px] h-[130px]">
              <h3 className="text-[24px] font-semibold leading-7 mb-3">{t("contacts")}</h3>
              <p className="text-[16px] leading-6 mb-4">
                <a href={`tel:${phoneHref}`} className="hover:opacity-90">
                  {phoneText}
                </a>
              </p>
              <div className="flex items-center gap-4">
                <Image src="/icons/footer/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                <Image src="/icons/footer/instagram.svg" alt="Instagram" width={24} height={24} />
              </div>
            </section>

            <section className="w-[325px] h-[130px]">
              <h3 className="text-[24px] font-semibold leading-7 mb-3">{t("addressTitle")}</h3>
              <p className="text-[16px] leading-6">{addressText}</p>
              <div className="mt-4">
                <Image src="/icons/footer/adress-footer.png" alt={t("addressTitle")} width={24} height={24} />
              </div>
            </section>

            <section className="w-[239px] h-[171px] md:border-l md:border-white/70 md:pl-6">
              <h3 className="text-[24px] font-semibold leading-7 mb-3">{t("hours")}</h3>
              <DesktopSchedule rows={rows} />
            </section>
          </div>

          {/* Центр: 254×192 (лого 254×120 + 12px + бейдж 155×31) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[348px] z-10">
            <div className="w-[254px] h-[192px] flex flex-col items-center">
              <Image
                src="/icons/logo/logo-white.svg"
                alt="SVOY"
                width={254}
                height={120}
                className="w-[254px] h-[120px] object-contain"
                priority
              />
              <div className="mt-[12px] inline-flex items-center justify-center w-[254px] h-[50px] px-[10px] py-[6px] gap-[10px] bg-white text-[#820A0A] rounded-none font-extrabold uppercase text-[24px] leading-none">
                SINCE 2009
              </div>
            </div>
          </div>

          <FooterLinesDesktop />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-[#820A0A]">
        <div className="px-5 pt-8 pb-0 flex flex-col gap-10">
          <section>
            <h3 className="text-[26px] font-semibold leading-[34px]">{t("contacts")}</h3>
            <p className="mt-3 text-[18px] leading-[26px]">
              <a href={`tel:${phoneHref}`} className="hover:opacity-90">
                {phoneText}
              </a>
            </p>
            <div className="mt-3 flex items-center gap-5">
              <Image src="/icons/footer/whatsapp.svg" alt="WhatsApp" width={28} height={28} />
              <Image src="/icons/footer/instagram.svg" alt="Instagram" width={28} height={28} />
            </div>
          </section>

          <section>
            <h3 className="text-[26px] font-semibold leading-[34px]">{t("addressTitle")}</h3>
            <p className="mt-3 text-[18px] leading-[26px]">{addressText}</p>
            <div className="mt-3">
              <Image src="/icons/footer/adress-footer.png" alt={t("addressTitle")} width={28} height={28} />
            </div>
          </section>

          <section className="relative">
            <h3 className="text-[26px] font-semibold leading-[34px]">{t("hours")}</h3>
            <div className="relative mt-4">
              <div className="absolute left-[88px] top-[6px] bottom-[6px] w-px bg-white/70" />
              <MobileSchedule rows={rows} />
            </div>
          </section>

          {/* Лого+бейдж: 155×139; 12px между; 36px до низа */}
          <div className="mt-10 ml-1 mb-[36px]">
            <div className="w-[155px] h-[139px] flex flex-col">
              <Image
                src="/icons/logo/logo-white.svg"
                alt="SVOY"
                width={155}
                height={96}
                className="w-[155px] h-[96px] object-contain"
              />
              <div className="mt-[12px] w-[155px] h-[31px] px-[10px] py-[6px] inline-flex items-center justify-center bg-white text-[#820A0A] rounded-none font-extrabold uppercase text-[14px] leading-none">
                SINCE 2009
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Гибкие линии: 100px от краёв экрана и 97px зазор от логотипа */
function FooterLinesDesktop() {
  const logoW = 254;
  const gapX = 97;

  return (
    <div
      className="absolute left-0 right-0 top-[445px] z-0 px-[100px] mx-[-32px]"
      style={{
        ["--logoW" as any]: `${logoW}px`,
        ["--gapX" as any]: `${gapX}px`,
      }}
    >
      <div className="relative h-[4px]">
        <span
          className="absolute left-0 top-0 h-[4px] bg-white/90"
          style={{ width: "max(0px, calc(50% - (var(--logoW) / 2) - var(--gapX)))" }}
        />
        <span
          className="absolute right-0 top-0 h-[4px] bg-white/90"
          style={{ width: "max(0px, calc(50% - (var(--logoW) / 2) - var(--gapX)))" }}
        />
      </div>
    </div>
  );
}

function DesktopSchedule({rows}: {rows: WorkRow[]}) {
  return (
    <div className="text-[16px] leading-7">
      {rows.map(({label, time}) => (
        <div key={label} className="grid grid-cols-[56px,1fr] gap-4">
          <span className="opacity-90">{label}</span>
          <span className="opacity-100 tabular-nums">{time}</span>
        </div>
      ))}
    </div>
  );
}

function MobileSchedule({rows}: {rows: WorkRow[]}) {
  return (
    <div className="text-[18px] leading-[28px]">
      {rows.map(({label, time}) => (
        <div key={label} className="grid grid-cols-[88px,1fr] gap-x-4 gap-y-2 items-baseline">
          <span>{label}</span>
          <span className="tabular-nums">{time}</span>
        </div>
      ))}
    </div>
  );
}
