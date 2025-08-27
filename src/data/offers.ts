export type OfferImage = { id: string; src: string };
export type Offer = {
  slug: string;
  title: string;
  subtitle?: string;
  images: OfferImage[];
  content?: string[];
};


export const OFFERS_BY_SLUG: Record<string, Offer> = {
  "vip-karaoke": {
    slug: "vip-karaoke",
    title: "VIP-зал с караоке",
    subtitle: "до 28 человек",
    images: [
      { id: "vip-1", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-2", src: "/images/offers/vip-karaoke.png" },
      { id: "vip-3", src: "/images/offers/vip-karaoke.png" },
    ],
    content: [
      "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
      "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper.",
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.",
    ],
  },
};


export const OFFERS_INDEX = Object.values(OFFERS_BY_SLUG).map(o => ({
  slug: o.slug,
  title: o.title,
  subtitle: o.subtitle,
  image: o.images[0]?.src ?? "",
}));

export function getOfferBySlug(slug: string) {
  return OFFERS_BY_SLUG[slug];
}
