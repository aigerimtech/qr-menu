"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useTranslations} from "next-intl";

import ToggleSwitch from "@/components/ui/toggleSwitch";
import MenuGroup from "@/components/menu/menuGroup";
import {SALADS, MAINS} from "@/data/menu";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function MenuSection({
  initialActiveIndex = 0,
  onChange
}: {
  initialActiveIndex?: number;
  onChange?(index: number, label: string): void;
}) {
  const t = useTranslations();

  const title = t("menu.title");
  const cats = useMemo(
    () => [
      t("menu.categories.salads"),
      t("menu.categories.mains"),
      t("menu.categories.soups"),
      t("menu.categories.drinks"),
      t("menu.categories.coldApps"),
      t("menu.categories.alcohol")
    ],
    [t]
  );

  const [active, setActive] = useState(
    Math.min(Math.max(0, initialActiveIndex), cats.length - 1)
  );

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    const el = btnRefs.current[active];
    if (el) el.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
    onChange?.(active, cats[active]);
  }, [active, cats, onChange]);

  return (
    <section id="menu" className="w-full bg-white">
      {/* Title row */}
      <div className="mx-auto w-full max-w-[1040px] px-4">
        <h2 className="pt-8 md:pt-12 font-raleway font-bold uppercase text-[#961515] text-[28px] md:text-[40px] leading-[1]">
          {title}
        </h2>
      </div>

      {/* Gap: 24 / 64 */}
      <div className="mt-6 md:mt-16" />

      {/* Categories (horizontal scroll on small; bounded to 1040 on desktop) */}
      <div className="w-full">
        <div className="mx-auto w-full max-w-[1040px] px-4">
          <div
            role="tablist"
            aria-label={title}
            className="
              relative flex h-[63px]
              overflow-x-auto
              whitespace-nowrap
              border border-[#961515] bg-white
              scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent
            "
          >
            {cats.map((label, i) => {
              const isActive = i === active;
              return (
                <button
                  key={label + i}
                  ref={(r) => { btnRefs.current[i] = r; }}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={cx(
                    "flex-none h-[63px] flex items-center",
                    i === 0 ? "px-[38px]" : "px-[34px]",
                    i === 0 ? "border-0" : "border-l",
                    "border-[#961515]",
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

      {/* 40px under categories */}
      <div className="mt-10" />

      {/* Filters */}
      <div className="w-full">
        <div className="mx-auto w-full md:max-w-[772px]">
          <div className="overflow-x-auto px-4 whitespace-nowrap">
            <div
              className="
                inline-flex items-stretch
                bg-white border border-[#961515]
                divide-x divide-[#961515]
                md:mx-auto
              "
            >
              <FilterToggle label={t("menu.filters.vegOnly")} />
              <FilterToggle label={t("menu.filters.noSpicy")} />
            </div>
          </div>
        </div>
      </div>

      {/* Groups (sample) */}
      <MenuGroup first title={t("menu.categories.salads")} items={SALADS} />
      <MenuGroup title={t("menu.categories.mains")} items={MAINS} />
    </section>
  );
}

function FilterToggle({label}: {label: string}) {
  const [checked, setChecked] = useState(false);
  const id = useMemo(() => "flt-" + Math.random().toString(36).slice(2), []);

  return (
    <label
      htmlFor={id}
      className={cx(
        "flex-none inline-flex items-center justify-between",
        "snap-start",
        // mobile
        "min-w-[288px] h-[52px] pl-[16px] pr-[66px] pt-[18px] pb-[18px]",
        // desktop
        "md:min-w-0 md:h-[66px] md:pl-[24px] md:pr-[89px] md:pt-[21.5px] md:pb-[21.5px]",
        "gap-3 md:gap-4 cursor-pointer select-none"
      )}
    >
      <span
        className={cx(
          "font-raleway font-medium text-[14px] leading-[1] transition-opacity",
          checked ? "text-[#961515] opacity-100" : "text-[#961515] opacity-50"
        )}
      >
        {label}
      </span>
      <ToggleSwitch id={id} checked={checked} onChange={setChecked} />
    </label>
  );
}
