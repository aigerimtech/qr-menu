"use client";

import {useEffect, useMemo, useRef} from "react";

type Props = {
  items: string[];                 // category labels (already i18n'ed)
  activeIndex: number;             // which one is selected
  onChange: (index: number) => void;
  className?: string;              // optional outer spacing (mt/mb etc.)
};

/** Horizontal, scrollable category tabs
 * - Always scrollable on narrow screens (no md:overflow-visible)
 * - Border hugs only the tabs (inner inline-flex), scroller is borderless
 * - Centers on wide screens via xl:mx-auto
 */
export default function Categories({items, activeIndex, onChange, className}: Props) {
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Snap the active tab into view after change
  useEffect(() => {
    const el = btnRefs.current[activeIndex];
    if (el) el.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
  }, [activeIndex]);

  // simple cx helper
  const cx = useMemo(
    () => (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" "),
    []
  );

  return (
    <div className={cx("w-full bg-white", className)}>
      {/* Full-width scroller wrapper (borderless) */}
      <div
        role="tablist"
        aria-label="menu-categories"
        className="
          overflow-x-auto whitespace-nowrap bg-white
          px-4 md:px-6
          scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent
          snap-x snap-mandatory
        "
      >
        {/* HUG wrapper: width equals sum of tabs; this holds the border */}
        <div
          className="
            inline-flex h-[63px] items-stretch
            border border-[#961515] divide-x divide-[#961515] bg-white
            xl:mx-auto
          "
        >
          {items.map((label, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={`${label}-${i}`}
                ref={(r) => { btnRefs.current[i] = r; }}      // return void
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(i)}
                className={cx(
                  "flex-none h-full flex items-center snap-start",
                  // first has 38px, others 34px
                  "first:px-[38px] px-[34px]",
                  "text-[18px] md:text-[20px] leading-none",
                  isActive ? "bg-[#961515] text-white" : "bg-white text-[#961515]"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
