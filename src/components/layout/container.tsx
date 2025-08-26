import React from "react";

type Props = React.PropsWithChildren<{ className?: string }>;

export default function Container({ className = "", children }: Props) {
  return (
    <div
      className={[
        "mx-auto w-full",
        "max-w-[1280px] lg:max-w-[1440px]",   // 1280 on laptops, 1440 on big desktops
        "px-4 sm:px-6 lg:px-8",               // safe side paddings
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
