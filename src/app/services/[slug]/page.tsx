import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug, getAllServiceSlugs } from "../../../data/servicesData";
import ServicePageContent from "../../../components/ServicePageContent";

// Generate static params for all service slugs — ensures every service page is
// statically generated at build time for optimal crawlability and performance.
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// Dynamic SEO metadata per service page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | TOS Lanka" };
  }

  const canonicalUrl = `https://www.toslanka.com/services/${service.slug}`;
  const imageUrl = `https://www.toslanka.com${service.image}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: "TOS Lanka",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} — TOS Lanka Electronic Manufacturing Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD Structured Data generator for each service page
function generateServiceJsonLd(service: ReturnType<typeof getServiceBySlug>) {
  if (!service) return null;

  const canonicalUrl = `https://www.toslanka.com/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: service.title,
        description: service.metaDescription,
        url: canonicalUrl,
        image: `https://www.toslanka.com${service.image}`,
        provider: {
          "@type": "Organization",
          "@id": "https://www.toslanka.com/#organization",
          name: "TOS Lanka Co. (Pvt.) Ltd.",
          url: "https://www.toslanka.com",
        },
        areaServed: {
          "@type": "Country",
          name: "Sri Lanka",
        },
        serviceType: service.title,
        category: "Electronic Manufacturing Services",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.shortTitle} Capabilities`,
          itemListElement: service.capabilities.map((cap, idx) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: cap.title,
              description: cap.description,
            },
            position: idx + 1,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.toslanka.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.toslanka.com/#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.shortTitle,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.toslanka.com/#website",
          url: "https://www.toslanka.com",
          name: "TOS Lanka",
          publisher: {
            "@type": "Organization",
            "@id": "https://www.toslanka.com/#organization",
          },
        },
        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
        },
        about: {
          "@id": `${canonicalUrl}#service`,
        },
        inLanguage: "en-US",
      },
    ],
  };
}

// FAQ Page JSON-LD for rich snippet eligibility
function generateFaqJsonLd(service: ReturnType<typeof getServiceBySlug>) {
  if (!service || !service.faqs || service.faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = generateServiceJsonLd(service);
  const faqJsonLd = generateFaqJsonLd(service);

  // Serialize data for client component (strip non-serializable icon)
  const serviceProps = {
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    tagline: service.tagline,
    iconName: service.slug,
    image: service.image,
    heroParagraphs: service.heroParagraphs,
    capabilities: service.capabilities,
    faqs: service.faqs,
    industries: service.industries,
    relatedSlugs: service.relatedSlugs,
  };

  return (
    <>
      {/* JSON-LD Structured Data — rendered server-side for immediate crawler access */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* FAQ JSON-LD — enables rich snippet "People also ask" boxes */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ServicePageContent service={serviceProps} />
    </>
  );
}
