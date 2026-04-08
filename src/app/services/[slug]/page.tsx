import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug, getAllServiceSlugs } from "../../../data/servicesData";
import ServicePageContent from "../../../components/ServicePageContent";

// Generate static params for all service slugs
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

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
      images: [{ url: service.image, width: 1200, height: 630 }],
    },
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
    industries: service.industries,
    relatedSlugs: service.relatedSlugs,
  };

  return <ServicePageContent service={serviceProps} />;
}
