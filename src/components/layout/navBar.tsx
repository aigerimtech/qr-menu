"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 bg-white border-b-[6px] border-[#9b1b1b] transition-transform duration-300 font-raleway",
        scrolled ? "translate-y-0" : "translate-y-[-100%] md:translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1440px] h-[96px] px-4 md:px-8 flex items-center gap-6">
        
        
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/icons/brand/brand-logo-red.svg"
            alt="SVOY"
            width={109}
            height={52}
            priority
          />
        </Link>

        {/* Меню */}
        <nav className="flex-1 hidden md:flex justify-center">
          <ul className="flex items-center gap-[30px] text-[15px] leading-[23px]">
            <li><Link href="#about" className="hover:opacity-70">О нас</Link></li>
            <li><Link href="#offers" className="hover:opacity-70">Наши предложения</Link></li>
            <li><Link href="#menu" className="hover:opacity-70">Меню ресторана</Link></li>
            <li><Link href="#contact" className="hover:opacity-70">Связаться с нами</Link></li>
          </ul>
        </nav>

        {/* Контакты */}
        <div className="ml-auto hidden md:flex flex-col justify-center gap-[12px]">
          <div className="flex items-center gap-2 w-[197px] h-[23px]">
            <Image src="/icons/address-navbar.svg" alt="Адрес" width={16} height={16} />
            <span className="truncate text-[15px] leading-[23px]">ул. Жумабаева 24</span>
          </div>
          <div className="flex items-center gap-2 w-[180px] h-[23px]">
            <Image src="/icons/phone.svg" alt="Телефон" width={16} height={16} />
            <a
              href="tel:+77770900333"
              className="text-[15px] leading-[23px] hover:opacity-70"
            >
              +7 777 09 00 333
            </a>
          </div>
        </div>

        {/* Мобильное меню */}
        <div className="flex md:hidden flex-1 items-center justify-end"></div>
      </div>
    </header>
  );
}
