// components/layout/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/container";

export default function Navbar() {
  const pathname = usePathname();
  const [showMobileBar, setShowMobileBar] = useState(false);

  // Не показываем бар на определённых страницах
  if (pathname?.startsWith("/offers")) return null;

  // Управляем появлением мобильного бара после скролла
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (hero && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => {
          setShowMobileBar(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
        },
        { root: null, threshold: 0, rootMargin: "-96px 0px 0px 0px" }
      );
      io.observe(hero);
      return () => io.disconnect();
    }
    // Фолбэк для старых браузеров
    const onScroll = () => {
      const y =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setShowMobileBar(y > window.innerHeight - 96);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      {/* ---------- MOBILE TOP BAR (appears after hero) ---------- */}
      <div
        className={`md:hidden transition-transform duration-300 will-change-transform ${
          showMobileBar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } bg-white border-b-[3px] border-[#9b1b1b]`}
      >
        {/* Figma: bar 96px; logo 85×40 @ top:16px; address @ top:64px */}
        <div className="relative h-[96px] w-full">
          <Link
            href="/"
            aria-label="SVOY"
            className="absolute left-1/2 -translate-x-1/2 top-4"
          >
            <Image
              src="/icons/brand/brand-logo-red.svg"
              alt="SVOY"
              width={85}
              height={40}
              priority
            />
          </Link>

          <span className="absolute left-1/2 -translate-x-1/2 top-16 text-[16px] leading-[16px] font-raleway">
            ул.&nbsp;Жумабаева&nbsp;24
          </span>
        </div>
      </div>

      {/* ---------- DESKTOP / TABLET NAVBAR ---------- */}
      <div className="hidden md:block bg-white border-b-[3px] border-[#9b1b1b]">
        <Container>
          <div className="h-[96px] flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link href="/" aria-label="SVOY">
                <Image
                  src="/icons/brand/brand-logo-red.svg"
                  alt="SVOY"
                  width={109}
                  height={52}
                />
              </Link>
            </div>

            {/* Centre: Menu */}
            <nav className="flex-1 flex justify-center">
              <ul className="flex gap-10 text-[20px] leading-[28px] text-[#151515]">
                <li><Link href="#about" className="hover:opacity-70">О нас</Link></li>
                <li><Link href="#offers" className="hover:opacity-70">Наши предложения</Link></li>
                <li><Link href="#menu" className="hover:opacity-70">Меню ресторана</Link></li>
                <li><Link href="#contact" className="hover:opacity-70">Связаться с нами</Link></li>
              </ul>
            </nav>

            {/* Right: Address + Phone */}
            <div className="hidden lg:flex flex-col items-end space-y-1">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/address-navbar.svg"
                  alt="Адрес"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="whitespace-nowrap text-[20px] leading-[23px]">
                  ул. Жумабаева 24
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/phone.svg"
                  alt="Телефон"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <a
                  href="tel:+77770900333"
                  className="whitespace-nowrap text-[20px] leading-[23px] hover:opacity-70"
                >
                  +7 777 09 00 333
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
