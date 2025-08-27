// app/offers/[slug]/page.tsx
import { notFound } from "next/navigation";
import OfferPageClient from "@/components/sections/offerPageClient";
import { getOfferBySlug, OFFERS_BY_SLUG } from "@/data/offers";

type RouteParams = { slug: string };

export default async function OfferPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;            
  const offer = getOfferBySlug(slug);
  if (!offer) notFound();

  return <OfferPageClient offer={offer} />;
}


export async function generateStaticParams() {
  return Object.keys(OFFERS_BY_SLUG).map((slug) => ({ slug }));
}
