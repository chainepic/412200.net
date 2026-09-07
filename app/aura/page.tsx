import type { Metadata } from "next";

import { AuraLanding } from "@/components/aura/landing";
import { auraConfig } from "@/config/aura";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: auraConfig.seo.title },
  description: auraConfig.seo.description,
  alternates: { canonical: auraConfig.url },
  openGraph: {
    title: auraConfig.seo.title,
    description: auraConfig.seo.description,
    url: auraConfig.url,
    siteName: siteConfig.fullName,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: auraConfig.ogImage,
        width: 1536,
        height: 1024,
        alt: auraConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: auraConfig.seo.title,
    description: auraConfig.seo.description,
    images: [auraConfig.ogImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name: auraConfig.shortName,
  alternateName: auraConfig.name,
  description: auraConfig.seo.description,
  url: auraConfig.url,
  provider: {
    "@type": "Organization",
    name: siteConfig.fullName,
    url: siteConfig.url,
  },
  educationalProgramMode: "Onsite",
  timeToComplete: "P7D",
  offers: [
    {
      "@type": "Offer",
      name: auraConfig.pricing.earlyBird.label,
      price: "9800",
      priceCurrency: "CNY",
    },
    {
      "@type": "Offer",
      name: auraConfig.pricing.standard.label,
      price: "16800",
      priceCurrency: "CNY",
    },
  ],
};

export default function AuraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuraLanding />
    </>
  );
}
