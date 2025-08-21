"use client";

export default function SinceBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        // Defaults: white background, dark-red text, extra-bold, uppercase
        "bg-white text-[#9b1b1b] font-extrabold uppercase",
        "flex items-center justify-center",
        // Mobile default sizes – can be overridden via className
        "w-[240px] h-[42px] text-[14px] leading-[18px] tracking-wide",
        className,
      ].join(" ")}
    >
      SINCE 2009
    </div>
  );
}
