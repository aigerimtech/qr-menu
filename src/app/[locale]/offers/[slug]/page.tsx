import {notFound} from "next/navigation";
import OfferPageClient from "@/components/sections/offerPageClient";
import {getOfferBySlug, OFFERS_BY_SLUG} from "@/data/offers";
import {routing} from "@/i18n/routing";

export default function OfferPage({
  params
}: {
  params: {locale: string; slug: string};
}) {
  const offer = getOfferBySlug(params.slug);
  if (!offer) notFound();
  return <OfferPageClient offer={offer} />;
}

export function generateStaticParams() {
  const slugs = Object.keys(OFFERS_BY_SLUG);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({locale, slug}))
  );
}
