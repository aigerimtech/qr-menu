"use client";

import Image from "next/image";

interface Props {
  className?: string;
  targetId?: string;
  offset?: number;
  ariaLabel?: string;
}

export default function ArrowDown({
  className = "",
  targetId = "next-section",
  offset = 0,
  ariaLabel = "Scroll down",
}: Props) {
  const handleClick = () => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      <Image
        src="/icons/arrow-down.svg"
        alt=""
        width={20}
        height={20}
      />
    </button>
  );
}
