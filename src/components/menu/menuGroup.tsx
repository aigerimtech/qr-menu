"use client";

import DishCard, {type Dish} from "@/components/menu/dishCard";

export default function MenuGroup({
  title,
  items,
  first = false
}: {
  title: string;
  items: Dish[];
  /** first group has extra top offset of 117px on desktop */
  first?: boolean;
}) {
  return (
    <section
      className={[
        "mx-auto w-full max-w-[1040px]",
        "px-4",
        first ? "mt-12 md:mt-[117px]" : "mt-16 md:mt-20"
      ].join(" ")}
    >
      <h3 className="font-raleway font-bold text-[#9b1b1b] text-[22px] md:text-[28px] leading-[1.1]">
        {title}
      </h3>

      {/* gap from title to first card (24 mobile / 48 desktop) */}
      <div className="mt-6 md:mt-12" />

      <div className="divide-y divide-[#E4C7C7]">
        {items.map((dish, idx) => (
          <DishCard key={dish.id} dish={dish} showTopDivider={idx > 0} />
        ))}
      </div>
    </section>
  );
}
