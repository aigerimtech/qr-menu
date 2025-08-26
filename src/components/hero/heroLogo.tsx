"use client";
import Image from "next/image";

export default function HeroLogo() {
  return (
    <>
      <Image
        src="/icons/brand/brand-logo-white.svg"
        alt="SVOY white logo"
        width={353}
        height={164}
        priority
        className="w-full h-auto"
        sizes="24vw"
      />
      <div className="mt-[6.11%] w-full h-[59px] min-h-[42px] flex items-center justify-center
                      bg-white text-[#9b1b1b] font-extrabold uppercase
                      px-[44px] text-[clamp(14px,1.7vw,26px)]">
        SINCE&nbsp;2009
      </div>
    </>
  );
}
