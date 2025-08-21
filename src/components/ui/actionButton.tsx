type Props = {
  variant?: "outline" | "solid";
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function ActionButton({
  variant = "outline",
  children,
  href = "#",
  className = "",
}: Props) {
  const base = "inline-flex items-center justify-center text-center text-[16px] leading-[22px] px-[44px] py-[20px] uppercase";
  const styles =
  variant === "outline"
    ? "bg-transparent border border-white text-white hover:bg-white/10 transition-colors"
    : "bg-white text-[#9b1b1b] shadow-[0_0_12px_rgba(0,0,0,0.75)] hover:bg-gray-100 transition-colors";

  return (
    <a href={href} className={[base, styles, className].join(" ")}>
      {children}
    </a>
  );
}
