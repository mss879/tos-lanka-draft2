import type { Metadata } from "next";
import { staticArticles, getStaticArticleBySlug } from "@/data/articlesData";
import ArticleDetailClient from "./ArticleDetailClient";

// Generate static params for all static articles so they get pre-rendered
export async function generateStaticParams() {
  return staticArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata for SEO — static articles get keyword-rich meta
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const staticArticle = getStaticArticleBySlug(slug);

  if (staticArticle) {
    return {
      title: staticArticle.metaTitle,
      description: staticArticle.metaDescription,
      keywords: staticArticle.keywords,
      openGraph: {
        title: staticArticle.metaTitle,
        description: staticArticle.metaDescription,
        images: staticArticle.coverImage
          ? [{ url: staticArticle.coverImage }]
          : undefined,
        type: "article",
      },
      alternates: {
        canonical: `https://www.toslanka.com/articles/${slug}`,
      },
    };
  }

  // Fallback for Supabase articles — basic metadata
  return {
    title: "Article",
    description: "Read the latest articles from TOS Lanka on electronics manufacturing, EMS, and technology insights.",
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticArticle = getStaticArticleBySlug(slug);

  // Generate JSON-LD for static articles
  const jsonLd = staticArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: staticArticle.title,
        description: staticArticle.metaDescription,
        image: staticArticle.coverImage
          ? `https://www.toslanka.com${staticArticle.coverImage}`
          : undefined,
        datePublished: staticArticle.createdAt,
        author: {
          "@type": "Organization",
          name: "TOS Lanka",
          url: "https://www.toslanka.com",
        },
        publisher: {
          "@type": "Organization",
          name: "TOS Lanka",
          logo: {
            "@type": "ImageObject",
            url: "https://www.toslanka.com/tos-logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.toslanka.com/articles/${slug}`,
        },
        keywords: staticArticle.keywords.join(", "),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleDetailClient
        slug={slug}
        staticArticle={
          staticArticle
            ? {
                title: staticArticle.title,
                content: staticArticle.content,
                coverImage: staticArticle.coverImage,
                createdAt: staticArticle.createdAt,
                excerpt: staticArticle.excerpt,
              }
            : null
        }
      />
    </>
  );
}
