"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [showMobileBar, setShowMobileBar] = useState(false);
  const pathname = usePathname();

  // Always call hooks unconditionally
  useEffect(() => {
    const onScroll = () => {
      const y =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setShowMobileBar(y > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Now it's safe to early-return
  const hideOnOffers = pathname?.startsWith("/offers");
  if (hideOnOffers) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile top bar (shows after small scroll) */}
      <div
        className={[
          "md:hidden h-[96px] bg-white border-b-[6px] border-[#9b1b1b]",
          "transition-opacity duration-300",
          showMobileBar ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1440px] h-full px-4 flex flex-col items-center justify-center">
          <Link href="/" aria-label="Домой">
            <Image
              src="/icons/brand/brand-logo-red.svg"
              alt="SVOY"
              width={109}
              height={52}
              priority
            />
          </Link>
          <div className="mt-1 text-[18px] leading-[26px] font-raleway">
            ул. Жумабаева 24
          </div>
        </div>
      </div>

      {/* Desktop / Tablet */}
      <div className="hidden md:block bg-white border-b-[6px] border-[#9b1b1b]">
        <div className="mx-auto max-w-[1440px] h-[96px] px-8 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" className="flex items-center" aria-label="Домой">
              <Image
                src="/icons/brand/brand-logo-red.svg"
                alt="SVOY"
                width={109}
                height={52}
                priority
              />
            </Link>
          </div>

          {/* Menu */}
          <nav className="justify-self-center">
            <ul className="flex items-center gap-[30px] text-[20px] leading-[28px] text-[#151515]">
              <li><Link href="#about"   className="hover:opacity-70">О нас</Link></li>
              <li><Link href="#offers"  className="hover:opacity-70">Наши предложения</Link></li>
              <li><Link href="#menu"    className="hover:opacity-70">Меню ресторана</Link></li>
              <li><Link href="#contact" className="hover:opacity-70">Связаться с нами</Link></li>
            </ul>
          </nav>

          {/* Contacts */}
          <div className="justify-self-end hidden lg:flex flex-col justify-center gap-[12px]">
            <div className="flex items-center gap-2 w-[197px] h-[23px]">
              <Image src="/icons/address-navbar.svg" alt="Адрес" width={16} height={16} />
              <span className="truncate text-[20px] leading-[23px]">ул. Жумабаева 24</span>
            </div>
            <div className="flex items-center gap-2 w-[180px] h-[23px]">
              <Image src="/icons/phone.svg" alt="Телефон" width={16} height={16} />
              <a href="tel:+77770900333" className="text-[20px] leading-[23px] hover:opacity-70">
                +7 777 09 00 333
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
