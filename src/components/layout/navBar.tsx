"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/container";

export default function Navbar() {
  const pathname = usePathname();
  const [showMobileBar, setShowMobileBar] = useState(false);

  // true на странице детального оффера
  const isOfferDetail = /^\/offers\/[^/]+$/.test(pathname ?? "");

  useEffect(() => {
    // На детальной странице ничего не подписываем
    if (isOfferDetail) {
      setShowMobileBar(false);
      return;
    }

    const hero = document.getElementById("hero");
    // Если героя нет (внутр. страницы) — показываем бар сразу
    if (!hero) {
      setShowMobileBar(true);
      return;
    }

    const update = () => {
      const bottom = hero.getBoundingClientRect().bottom;
      // показываем бар, когда герой полностью ушёл вверх
      setShowMobileBar(bottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
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

      {/* Desktop / tablet */}
      <div className="hidden md:block bg-white border-b-[3px] border-[#9b1b1b]">
        <Container>
          <div className="h-[96px] flex items-center justify-between">
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

            <nav className="flex-1 flex justify-center">
              <ul className="flex gap-10 text-[20px] leading-[28px] text-[#151515]">
                <li><Link href="#about" className="hover:opacity-70">О&nbsp;нас</Link></li>
                <li><Link href="#offers" className="hover:opacity-70">Наши&nbsp;предложения</Link></li>
                <li><Link href="#menu" className="hover:opacity-70">Меню&nbsp;ресторана</Link></li>
                <li><Link href="#contact" className="hover:opacity-70">Связаться&nbsp;с&nbsp;нами</Link></li>
              </ul>
            </nav>

            <div className="hidden lg:block">
              <div className="grid grid-cols-[20px_auto] gap-x-2 gap-y-1 items-center">
                <Image src="/icons/address-navbar.svg" alt="Адрес" width={20} height={20} />
                <span className="whitespace-nowrap text-[20px] leading-[23px]">
                  ул.&nbsp;Жумабаева&nbsp;24
                </span>
                <Image src="/icons/phone.svg" alt="Телефон" width={20} height={20} />
                <a href="tel:+77770900333" className="whitespace-nowrap text-[20px] leading-[23px] hover:opacity-70">
                  +7&nbsp;777&nbsp;09&nbsp;00&nbsp;333
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
