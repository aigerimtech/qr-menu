"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

export type Dish = {
  id: string;
  /** Accepts "placeholder" or "dishes.placeholder" */
  i18nKey: string;
  price: string;
  image: string;
  /** e.g. ["/icons/menu/vegan.svg", "/icons/menu/spicy.svg"] */
  icons?: string[];
  frame?: boolean;
};

export default function DishCard({
  dish,
  showTopDivider = false
}: { dish: Dish; showTopDivider?: boolean }) {
  // Namespaced translator
  const t = useTranslations("dishes");

  // If the key was given as "dishes.placeholder" → make it "placeholder"
  const localKey = dish.i18nKey.replace(/^dishes\./, "");

  // Safely read a key within the "dishes" namespace
  const safeT = (k: string) => {
    try {
      const v = t(k as any);
      // next-intl returns the key itself if missing; hide that
      return v === k ? "" : v;
    } catch {
      return "";
    }
  };

  const title = safeT(`${localKey}.title`);
  const description = safeT(`${localKey}.desc`);

  return (
    <article
      className={[
        "w-full bg-white",
        showTopDivider ? "pt-6 border-t border-[#E4C7C7]" : "pt-0",
        "pb-6"
      ].join(" ")}
    >
      <div className="w-full grid grid-cols-[auto,1fr] items-start gap-4 lg:pl-[33px] lg:gap-[37px]">
        {/* Image (with optional decorative frame) */}
        <div className="relative shrink-0">
          <div
            aria-hidden
            className={[
              "hidden lg:block absolute",
              "-left-[20px] -top-[10px] w-[160px] h-[160px]",
              "bg-[url('/images/menu/photo-frame.svg')] bg-contain bg-no-repeat"
            ].join(" ")}
            style={{opacity: dish.frame === false ? 0 : 1}}
          />
          <div className="relative w-[84px] h-[84px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden">
            <Image
              src={dish.image}
              alt=""
              fill
              sizes="(min-width:1024px) 140px, 84px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <div className="space-y-[12px]">
            <h3 className="font-raleway font-extrabold uppercase text-[#9b1b1b] text-[18px] lg:text-[28px] leading-[1.1] truncate">
              {title}
            </h3>

            {description && (
              <p className="text-[#6B6B6B] text-[12px] lg:text-[16px] leading-snug">
                {description}
              </p>
            )}

            <div className="flex items-end justify-between">
              <div className="font-raleway font-extrabold text-[#9b1b1b] text-[16px] lg:text-[20px]">
                {dish.price}
              </div>

              {dish.icons?.length ? (
                <div className="flex items-center gap-2 lg:mr-[20px]">
                  {dish.icons.map((src, i) => {
                    const resolved = src.endsWith(".svg") ? src : `${src}.svg`;
                    return (
                      <Image
                        key={`${resolved}-${i}`}
                        src={resolved}
                        alt=""
                        width={28}
                        height={28}
                        className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]"
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
