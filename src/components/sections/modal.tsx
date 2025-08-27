"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const t = useTranslations("modal");
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC + outside click
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative bg-white w-[90%] max-w-[400px] rounded-md p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#9b1b1b] text-xl"
          aria-label={t("close")}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
