export type OfferImage = { id: string; src: string };

export type Offer = {
  slug: string;
  images: OfferImage[];
};

export const OFFERS_BY_SLUG: Record<string, Offer> = {
  "vip-karaoke": {
    slug: "vip-karaoke",
    images: [
      { id: "vip-1", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-2", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-3", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-4", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-5", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-6", src: "/images/offers/vip-karaoke.png" }
    ],
  },
};

// Индекс для главной: слаг + первая картинка-обложка
export const OFFERS_INDEX = Object.values(OFFERS_BY_SLUG).map(o => ({
  slug: o.slug,
  image: o.images[0]?.src ?? "",
}));

export function getOfferBySlug(slug: string) {
  return OFFERS_BY_SLUG[slug];
}
