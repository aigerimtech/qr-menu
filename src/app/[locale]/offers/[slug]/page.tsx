import { notFound } from "next/navigation";
import OfferPageClient from "@/components/sections/offerPageClient";
import { getOfferBySlug, OFFERS_BY_SLUG } from "@/data/offers";

export default function OfferPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const offer = getOfferBySlug(params.slug);
  if (!offer) notFound();
  return <OfferPageClient offer={offer} />;
}

export function generateStaticParams() {
  return Object.keys(OFFERS_BY_SLUG).map((slug) => ({ slug }));
}
