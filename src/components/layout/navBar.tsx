"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ---------- NAVBAR ---------- */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 bg-white border-b-[6px] border-[#9b1b1b] transition-transform duration-300 font-raleway shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        scrolled || open ? "translate-y-0" : "translate-y-[-100%] md:translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1440px] h-[96px] px-4 md:px-8 flex items-center gap-6">
        {/* Brand */}
        <Link href="/" className="shrink-0 flex items-center" onClick={closeMenu}>
          <Image
            src="/icons/brand/brand-logo-red.svg"
            alt="SVOY"
            width={109}
            height={52}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="flex-1 hidden md:flex justify-center">
          <ul className="flex items-center gap-[30px] text-[15px] leading-[23px]">
            <li><Link href="#about"  className="hover:opacity-70">О нас</Link></li>
            <li><Link href="#offers" className="hover:opacity-70">Наши предложения</Link></li>
            <li><Link href="#menu"   className="hover:opacity-70">Меню ресторана</Link></li>
            <li><Link href="#contact" className="hover:opacity-70">Связаться с нами</Link></li>
          </ul>
        </nav>

        {/* Desktop Contacts */}
        <div className="ml-auto hidden md:flex flex-col justify-center gap-[12px]">
          <div className="flex items-center gap-2 w-[197px] h-[23px]">
            <Image src="/icons/address-navbar.svg" alt="Адрес" width={16} height={16} />
            <span className="truncate text-[15px] leading-[23px]">ул. Жумабаева 24</span>
          </div>
          <div className="flex items-center gap-2 w-[180px] h-[23px]">
            <Image src="/icons/phone.svg" alt="Телефон" width={16} height={16} />
            <a href="tel:+77770900333" className="text-[15px] leading-[23px] hover:opacity-70">
              +7 777 09 00 333
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden flex-1 items-center justify-end">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-2 -mr-1"
          >
            {open ? (
              /* Close icon */
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="#9b1b1b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#9b1b1b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ---------- MOBILE MENU PANEL ---------- */}
      <div
        className={[
          "md:hidden fixed inset-0 z-40",
          open ? "visible" : "invisible",
        ].join(" ")}
      >
        <div
          onClick={closeMenu}
          className={[
            "absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <aside
          className={[
            "absolute top-0 right-0 h-full w-[86%] max-w-[360px] bg-white border-l border-neutral-200",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <nav className="p-6 pt-8">
            <ul className="space-y-4 text-[17px] leading-[26px]">
              <li><Link href="#about"    onClick={closeMenu} className="block py-2">О нас</Link></li>
              <li><Link href="#offers"   onClick={closeMenu} className="block py-2">Наши предложения</Link></li>
              <li><Link href="#menu"     onClick={closeMenu} className="block py-2">Меню ресторана</Link></li>
              <li><Link href="#contact"  onClick={closeMenu} className="block py-2">Связаться с нами</Link></li>
            </ul>

            <div className="mt-6 h-px bg-neutral-200" />

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <Image src="/icons/address-navbar.svg" alt="Адрес" width={16} height={16} />
                <span className="text-[15px] leading-[23px]">ул. Жумабаева 24</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/phone.svg" alt="Телефон" width={16} height={16} />
                <a href="tel:+77770900333" className="text-[15px] leading-[23px] text-[#9b1b1b]">
                  +7 777 09 00 333
                </a>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
