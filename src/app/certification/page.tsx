import CertificationClient from './CertificationClient';

/* JSON-LD Structured Data for Certification Page */
const certificationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.toslanka.com/certification#webpage",
      url: "https://www.toslanka.com/certification",
      name: "Certifications & Quality Standards | ISO 9001, ISO 14001, ISO 45001 & NMRA | TOS Lanka",
      description:
        "TOS Lanka holds triple ISO certification (ISO 9001:2015, ISO 14001:2015, ISO 45001:2018) and NMRA approval for medical device assembly. Presidential Export Awards winner — Sri Lanka's most certified EMS provider.",
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
      breadcrumb: { "@id": "https://www.toslanka.com/certification#breadcrumb" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.toslanka.com/certification#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.toslanka.com" },
        { "@type": "ListItem", position: 2, name: "Certifications & Quality", item: "https://www.toslanka.com/certification" },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.toslanka.com/certification#certifications",
      name: "ISO Certifications",
      description: "TOS Lanka's internationally recognized quality management certifications",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "EducationalOccupationalCredential",
            name: "ISO 9001:2015",
            credentialCategory: "Quality Management System",
            recognizedBy: { "@type": "Organization", name: "Bureau Veritas" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "EducationalOccupationalCredential",
            name: "ISO 14001:2015",
            credentialCategory: "Environmental Management System",
            recognizedBy: { "@type": "Organization", name: "Bureau Veritas" },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "EducationalOccupationalCredential",
            name: "ISO 45001:2018",
            credentialCategory: "Occupational Health & Safety Management",
            recognizedBy: { "@type": "Organization", name: "Bureau Veritas" },
          },
        },
      ],
    },
  ],
};

export default function CertificationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certificationJsonLd) }}
      />
      <CertificationClient />
    </>
  );
}
