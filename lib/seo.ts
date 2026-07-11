import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

const { seo } = siteConfig;

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    title: seo.title,
    description: seo.description,
    siteName: siteConfig.fullName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} - AI培训与本地化部署`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.fullName,
  alternateName: [siteConfig.name, siteConfig.shortName, siteConfig.domain],
  url: siteConfig.url,
  description: seo.description,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "醴陵市",
    addressRegion: "湖南省",
    addressCountry: "CN",
  },
  areaServed: seo.areasServed.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
  knowsAbout: [
    "AI培训",
    "本地Agent搭建",
    "企业API中转",
    "私有化大模型",
    "RAG知识库",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI服务",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI培训",
          description: "面向企业的大模型应用、Prompt工程、Agent开发实战培训",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "本地Agent部署",
          description: "私有化AI Agent部署、大模型推理环境与智能体搭建",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "企业API中转",
          description: "多模型统一接入网关，支持GPT、Claude及国产大模型API中转",
        },
      },
    ],
  },
};
