type Props = {
  variant?: "outline" | "solid";
  children: React.ReactNode;
  href?: string;
  className?: string;
};

/* ---------- ACTION BUTTON ---------- */
export default function ActionButton({
  variant = "outline",
  children,
  href = "#",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center text-center uppercase " +
    "h-[63px] px-[44px] text-[20px] leading-[20px] font-semibold " +
    "rounded-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  const styles =
    variant === "outline"
      ? "border border-white text-white bg-black/50 backdrop-blur-[3px] hover:bg-black/60 transition-colors"
      : "bg-white text-[#9b1b1b] shadow-[0_0_12px_rgba(0,0,0,0.75)] hover:bg-gray-100 transition-colors";

  return (
    <a href={href} className={[base, styles, className].join(" ")}>
      {children}
    </a>
  );
}
