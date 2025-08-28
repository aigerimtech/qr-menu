import type {Dish} from "@/components/menu/dishCard";

// Place your real photos under /public/images/menu/*
export const SALADS: Dish[] = [
  {
    id: "salad-1",
    i18nKey: "placeholder",
    price: "6 200 ₸",
    image: "/images/menu/main-1.png",
    icons: ["/icons/menu/vegan.svg"]
  },
  {
    id: "salad-2",
    i18nKey: "placeholder",
    price: "6 200 ₸",
    image: "/images/menu/main-2.png",
    icons: ["/icons/menu/vegan.svg", "/icons/menu/spicy.svg"]
  },
  {
    id: "salad-3",
    i18nKey: "placeholder",
    price: "6 200 ₸",
    image: "/images/menu/main-3.png",
    icons: ["/icons/menu/spicy.svg"]
  }
];

export const MAINS: Dish[] = [
  {
    id: "main-1",
    i18nKey: "placeholder",
    price: "6 200 ₸",
    image: "/images/menu/main-1.png",
    icons: ["/icons/menu/vegan.svg", "/icons/menu/spicy.svg"]
  },
  {
    id: "main-2",
    i18nKey: "placeholder",
    price: "6 200 ₸",
    image: "/images/menu/main-2.png",
    icons: ["/icons/menu/vegan.svg"]
  },
  {
    id: "main-3",
    i18nKey: "placeholder",
    price: "6 200 ₸",
    image: "/images/menu/main-3.png",
    icons: ["/icons/menu/spicy.svg"]
  }
];
