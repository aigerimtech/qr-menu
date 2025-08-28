"use client";

import {memo} from "react";

type Props = {
  id?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  className?: string;
  /** When true (default), mobile=38x20 & md=49x26 per Figma */
  responsive?: boolean;
  /** Track color when ON (default brand) */
  onColorClass?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function ToggleSwitch({
  id,
  checked,
  onChange,
  disabled,
  className,
  responsive = true,
  onColorClass = "bg-[#961515] hover:bg-[#7b1111]"
}: Props) {
  // sizes
  const trackSize = responsive ? "w-[38px] h-[20px] md:w-[49px] md:h-[26px]" : "w-[49px] h-[26px]";
  const thumbSize = responsive ? "w-[16px] h-[16px] md:w-[22px] md:h-[22px]" : "w-[22px] h-[22px]";
  const offTranslate = responsive ? "translate-x-[2px] md:translate-x-[2px]" : "translate-x-[2px]";
  const onTranslate = responsive ? "translate-x-[18px] md:translate-x-[25px]" : "translate-x-[25px]";

  return (
    <span className={cx("inline-flex items-center", className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="peer sr-only"
      />
      {/* Track */}
      <span
        aria-hidden
        className={cx(
          "relative rounded-full transition-colors",
          trackSize,
          disabled ? "bg-neutral-200" :
          checked ? onColorClass : "bg-neutral-300 hover:bg-neutral-300/90"
        )}
      >
        {/* Thumb */}
        <span
          className={cx(
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
            thumbSize,
            checked ? onTranslate : offTranslate
          )}
        />
        {/* focus ring driven by the hidden input */}
        <style jsx>{`
          input.peer:focus-visible + span {
            box-shadow: 0 0 0 3px rgba(150, 21, 21, 0.35);
          }
        `}</style>
      </span>
    </span>
  );
}

export default memo(ToggleSwitch);
