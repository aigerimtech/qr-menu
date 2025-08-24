"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [showMobileBar, setShowMobileBar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
      const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setShowMobileBar(rect.bottom <= 0);
      } else {
        const headerHeight = 96;
        const y =
          window.scrollY ??
          document.documentElement.scrollTop ??
          document.body.scrollTop ??
          0;
        setShowMobileBar(y > window.innerHeight - headerHeight);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/offers")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      {/* Mobile top bar */}
      <div
        className={`md:hidden transition-transform duration-300 ${
          showMobileBar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } bg-white border-b-4 border-[#9b1b1b]`}
      >
        <div className="flex items-center justify-between px-4 py-2 h-[96px]">
          <Link href="/" aria-label="SVOY" className="flex items-center">
            <Image
              src="/icons/brand/brand-logo-red.svg"
              alt="SVOY"
              width={109}
              height={52}
              priority
            />
          </Link>
            <span className="ml-4 mt-1 text-[18px] leading-[26px] font-raleway truncate">
              ул. Жумабаева 24
            </span>
        </div>
      </div>

      {/* Desktop / tablet navigation */}
      <div className="hidden md:block bg-white border-b-4 border-[#9b1b1b]">
        <div className="mx-auto max-w-[1440px] h-[96px] px-8 grid grid-cols-[1fr_auto_1fr] items-center">
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
          <nav className="justify-self-center">
            <ul className="flex items-center gap-[30px] text-[20px] leading-[28px] text-[#151515]">
              <li>
                <Link href="#about" className="hover:opacity-70">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="#offers" className="hover:opacity-70">
                  Наши предложения
                </Link>
              </li>
              <li>
                <Link href="#menu" className="hover:opacity-70">
                  Меню ресторана
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:opacity-70">
                  Связаться с нами
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden lg:flex justify-self-end items-center gap-2 w-[180px] h-[23px]">
            <Image
              src="/icons/address-navbar.svg"
              alt="Адрес"
              width={16}
              height={16}
            />
            <span className="truncate text-[20px] leading-[23px]">
              ул. Жумабаева 24
            </span>
            <Image src="/icons/phone.svg" alt="Телефон" width={16} height={16} />
            <a
              href="tel:+77770900333"
              className="text-[20px] leading-[23px] hover:opacity-70"
            >
              +7 777 09 00 333
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
