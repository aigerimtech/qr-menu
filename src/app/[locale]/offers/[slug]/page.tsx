import { notFound } from "next/navigation";
import OfferPageClient from "@/components/sections/offerPageClient";
import { getOfferBySlug, OFFERS_BY_SLUG } from "@/data/offers";

type RouteParams = { locale: string; slug: string };

export default function OfferPage({ params }: { params: RouteParams }) {
  const { slug } = params;
  const offer = getOfferBySlug(slug);

  if (!offer) notFound();

  return <OfferPageClient offer={offer} />;
}

export function generateStaticParams() {
  return Object.keys(OFFERS_BY_SLUG).map((slug) => ({ slug }));
}