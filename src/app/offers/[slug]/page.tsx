import { notFound } from "next/navigation";
import OfferPageClient, { Offer } from "@/components/sections/offerPageClient";

const offerData: Record<string, Offer> = {
  "vip-karaoke": {
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

export default async function OfferPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;                
  const offer = offerData[slug as keyof typeof offerData];
  if (!offer) notFound();
  return <OfferPageClient offer={offer} />;
}
