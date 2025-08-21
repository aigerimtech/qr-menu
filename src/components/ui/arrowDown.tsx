"use client";

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
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`cursor-pointer ${className}`}
    >
      <img src="/icons/arrow-down.svg" alt="" width={22} height={35} />
    </button>
  );
}
