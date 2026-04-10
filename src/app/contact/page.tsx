import ContactClient from './ContactClient';

/* JSON-LD Structured Data for Contact Page */
const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.toslanka.com/contact#webpage",
      url: "https://www.toslanka.com/contact",
      name: "Contact TOS Lanka | Electronics Manufacturing & EMS Inquiries",
      description:
        "Contact TOS Lanka for electronic manufacturing services, contract manufacturing, and OEM manufacturing inquiries. Located at Biyagama Export Processing Zone, Sri Lanka.",
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
      breadcrumb: { "@id": "https://www.toslanka.com/contact#breadcrumb" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.toslanka.com/contact#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.toslanka.com" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.toslanka.com/contact" },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://www.toslanka.com/#organization",
      name: "TOS Lanka Co. (Pvt.) Ltd.",
      url: "https://www.toslanka.com",
      telephone: "+94-2465160",
      email: "info@toslanka.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: 'Block "B", Biyagama Export Processing Zone',
        addressLocality: "Biyagama",
        postalCode: "11672",
        addressCountry: "LK",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+94-2465160",
          contactType: "customer service",
          email: "info@toslanka.com",
          availableLanguage: ["English", "Japanese", "Sinhala"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+94-2996661",
          contactType: "sales",
          email: "dexter@toslanka.com",
          availableLanguage: ["English", "Japanese"],
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
