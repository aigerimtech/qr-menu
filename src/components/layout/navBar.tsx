"use client";

import {useEffect, useState, useMemo} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {locales} from "@/i18n";
import Container from "@/components/layout/container";

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [showMobileBar, setShowMobileBar] = useState(false);

  // удаляем префикс локали из pathname, чтобы корректно определить страницу оффера
  const pathWithoutLocale = useMemo(() => {
    if (!pathname) return "";
    const parts = pathname.split("/").filter(Boolean); // ["ru","offers","vip-karaoke"]
    if (parts.length && (locales as readonly string[]).includes(parts[0])) {
      return "/" + parts.slice(1).join("/");
    }
    return pathname;
  }, [pathname]);

  const isOfferDetail = /^\/offers\/[^/]+$/.test(pathWithoutLocale ?? "");

  useEffect(() => {
    if (isOfferDetail) {
      setShowMobileBar(false);
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) {
      setShowMobileBar(true);
      return;
    }

    const update = () => {
      const bottom = hero.getBoundingClientRect().bottom;
      setShowMobileBar(bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isOfferDetail]);

  if (isOfferDetail) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      {/* Mobile top bar */}
      <div
        className={`md:hidden transition-transform duration-300 will-change-transform ${
          showMobileBar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } bg-white border-b-[3px] border-[#9b1b1b]`}
      >
        <div className="relative h-[96px] w-full">
          <Link
            href={`/${locale}`}
            aria-label="SVOY"
            className="absolute left-1/2 -translate-x-1/2 top-4"
          >
            <Image
              src="/icons/logo/logo-red.svg"
              alt="SVOY"
              width={85}
              height={40}
              priority
            />
          </Link>
          <span className="absolute left-1/2 -translate-x-1/2 top-16 text-[16px] leading-[16px] font-raleway">
            {t("address")}
          </span>
        </div>
      </div>

      {/* Desktop / tablet */}
      <div className="hidden md:block bg-white border-b-[3px] border-[#9b1b1b]">
        <Container>
          <div className="h-[96px] flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href={`/${locale}`} aria-label="SVOY">
                <Image
                  src="/icons/logo/logo-red.svg"
                  alt="SVOY"
                  width={109}
                  height={52}
                />
              </Link>
            </div>

            <nav className="flex-1 flex justify-center">
              <ul className="flex gap-10 text-[20px] leading-[28px] text-[#151515]">
                <li>
                  <Link href="#about" className="hover:opacity-70">
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link href="#offers" className="hover:opacity-70">
                    {t("offers")}
                  </Link>
                </li>
                <li>
                  <Link href="#menu" className="hover:opacity-70">
                    {t("menu")}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:opacity-70">
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="hidden lg:block">
              <div className="grid grid-cols-[20px_auto] gap-x-2 gap-y-1 items-center">
                <Image
                  src="/icons/navbar/address-navbar.svg"
                  alt="Адрес"
                  width={20}
                  height={20}
                />
                <span className="whitespace-nowrap text-[20px] leading-[23px]">
                  {t("address")}
                </span>
                <Image
                  src="/icons/navbar/phone.svg"
                  alt="Телефон"
                  width={20}
                  height={20}
                />
                <a
                  href={`tel:${t("phone").replace(/[^\d+]/g, "")}`}
                  className="whitespace-nowrap text-[20px] leading-[23px] hover:opacity-70"
                >
                  {t("phone")}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
