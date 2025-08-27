import React from "react";

type Props = React.PropsWithChildren<{ className?: string }>;

export default function Container({ className = "", children }: Props) {
  return (
    <div
      className={[
        "mx-auto w-full",
        // Cap at 1280 px on laptops and 1440 px on large desktops
        "max-w-[1280px] lg:max-w-[1440px]",
        "px-4 sm:px-6 lg:px-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
