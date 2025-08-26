"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/container";

export default function Navbar() {
  const pathname = usePathname();
  const [showMobileBar, setShowMobileBar] = useState(false);

  // Hide navbar on /offers if needed
  if (pathname?.startsWith("/offers")) return null;

  useEffect(() => {
    const hero = document.getElementById("hero");

    // Show mobile top bar after hero leaves viewport
    if (hero && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => {
          setShowMobileBar(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
        },
        { root: null, threshold: 0, rootMargin: "-100px 0px 0px 0px" } // ~nav height
      );
      io.observe(hero);
      return () => io.disconnect();
    }

    // Fallback
    const onScroll = () => {
      const y =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setShowMobileBar(y > window.innerHeight - 100);
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
        } bg-white border-b-4 border-[#9b1b1b]`}
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

      {/* ---------- DESKTOP / TABLET NAVBAR (always visible) ---------- */}
      <div className="hidden md:block bg-white border-b-4 border-[#9b1b1b]">
        <Container>
          <div
            className="
              h-[96px] relative
              grid grid-cols-[auto_1fr_auto] items-center
            "
          >
            {/* Left: Logo (grid places it; no absolute offsets) */}
            <div className="justify-self-start">
              <Link href="/" aria-label="SVOY" className="flex items-center">
                <Image
                  src="/icons/brand/brand-logo-red.svg"
                  alt="SVOY"
                  width={109}
                  height={52}
                  priority
                />
              </Link>
            </div>

            {/* Center: Menu with 135px spacing on BOTH sides (Figma) */}
            <div className="px-[135px] min-w-0">
              <nav className="justify-self-center">
                <ul className="flex items-center gap-[30px] text-[20px] leading-[28px] text-[#151515]">
                  <li><Link href="#about"   className="hover:opacity-70">О нас</Link></li>
                  <li><Link href="#offers"  className="hover:opacity-70">Наши предложения</Link></li>
                  <li><Link href="#menu"    className="hover:opacity-70">Меню ресторана</Link></li>
                  <li><Link href="#contact" className="hover:opacity-70">Связаться с нами</Link></li>
                </ul>
              </nav>
            </div>

            {/* Right: relative cell; children absolutely placed by Figma offsets */}
            <div className="hidden lg:block relative h-full min-w-0">
              {/* Address: top:19px; right:100px */}
              <div className="absolute top-[19px] right-[100px] flex items-center gap-2">
                <Image
                  src="/icons/address-navbar.svg"
                  alt="Адрес"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="whitespace-nowrap text-[20px] leading-[23px]">
                  ул. Жумабаева 24
                </span>
              </div>

              {/* Phone: top:52px; right:117px */}
              <div className="absolute top-[52px] right-[117px] flex items-center gap-2">
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
                  +7 777 09 00 333
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
