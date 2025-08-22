"use client";

import { usePathname } from "next/navigation";

export default function LayoutTopPadding({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onOffers = pathname?.startsWith("/offers");
  // Keep md navbar offset only when navbar is visible (non-offers pages)
  return <main className={onOffers ? "pt-0" : "pt-0 md:pt-[102px]"}>{children}</main>;
}
