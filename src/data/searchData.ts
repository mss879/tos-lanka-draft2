export type SearchCategory = "Services" | "Company" | "Certifications" | "Support";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: SearchCategory;
  keywords: string[];
}

export const searchIndex: SearchResult[] = [
  // --- SERVICES (Home Page Anchors) ---
  {
    id: "svc-smt",
    title: "Surface Mount Technology (SMT)",
    description: "High-speed, automated PCB assembly featuring advanced placement, reflow profiles, and 3D AOI and SPI inspection.",
    url: "/#services", // Assuming a services anchor or scroll logic exists
    category: "Services",
    keywords: ["smt", "pcb", "surface mount", "board", "assembly", "solder", "automated", "electronics", "circuit"]
  },
  {
    id: "svc-sys",
    title: "Systems Integration",
    description: "End-to-end integration including mechanical assembly, firmware flashing, and final testing.",
    url: "/#services",
    category: "Services",
    keywords: ["integration", "firmware", "mechanical", "assembly", "box build", "testing"]
  },
  {
    id: "service-4",
    title: "Supply Chain Network",
    description: "We provide both consigned and turnkey solutions, adapting seamlessly to customer requirements.",
    url: "/#services",
    category: "Services",
    keywords: ["supply chain", "consigned", "turnkey", "logistics", "procurement"]
  },
  {
    id: "svc-coat",
    title: "Coating & Potting",
    description: "Protective conformal coating and potting for harsh environments against moisture and chemicals.",
    url: "/#services",
    category: "Services",
    keywords: ["coating", "potting", "protection", "chemical", "conformal", "harsh", "weatherProof"]
  },
  {
    id: "svc-th",
    title: "Through Hole Technology",
    description: "Traditional printed circuit board assembly services emphasizing rugged operational environments.",
    url: "/#services",
    category: "Services",
    keywords: ["through hole", "tht", "traditional", "rugged", "soldering", "pcb"]
  },
  {
    id: "svc-auto",
    title: "Automotive Harnessing",
    description: "Manufacturing heavy-duty cabling and wire harnesses for automotive applications.",
    url: "/#services",
    category: "Services",
    keywords: ["automotive", "wiring", "harness", "cabling", "heavy duty", "vehicle"]
  },

  // --- COMPANY ---
  {
    id: "comp-contact",
    title: "Contact Us",
    description: "Get in touch with TOS Lanka via Biyagama Export Processing Zone or via Email and Phone.",
    url: "/contact",
    category: "Company",
    keywords: ["contact", "email", "phone", "address", "location", "reach out", "support", "biyagama"]
  },
  {
    id: "comp-hero",
    title: "About TOS Lanka",
    description: "Learn about our 100% Japanese-owned heritage and 20 years of precision engineering.",
    url: "/",
    category: "Company",
    keywords: ["about", "heritage", "japan", "history", "precision", "who we are"]
  },

  // --- CERTIFICATIONS ---
  {
    id: "cert-overview",
    title: "Certifications Page",
    description: "View our entire catalogue of ISO accreditations and Good Manufacturing Practices.",
    url: "/certification",
    category: "Certifications",
    keywords: ["certifications", "standards", "compliance", "iso", "quality"]
  },
  {
    id: "cert-iso9001",
    title: "ISO 9001:2015",
    description: "Our core Quality Management System standard certification.",
    url: "/certification",
    category: "Certifications",
    keywords: ["iso", "9001", "quality", "qms", "standard"]
  },
  {
    id: "cert-iso14001",
    title: "ISO 14001:2015",
    description: "Environmental Management Systems maintaining sustainability.",
    url: "/certification",
    category: "Certifications",
    keywords: ["iso", "14001", "environment", "sustainability", "ems"]
  },
  {
    id: "cert-iso45001",
    title: "ISO 45001:2018",
    description: "Occupational Health and Safety Management System certification.",
    url: "/certification",
    category: "Certifications",
    keywords: ["iso", "45001", "health", "safety", "workplace"]
  },
  {
    id: "cert-nmra",
    title: "NMRA Good Manufacturing Practices",
    description: "Approved for medical device manufacturing by the National Medicines Regulatory Authority of Sri Lanka.",
    url: "/certification",
    category: "Certifications",
    keywords: ["nmra", "gmp", "medical", "healthcare", "approved", "sri lanka"]
  },
  {
    id: "cert-awards",
    title: "Awards & Recognition",
    description: "Hall of fame displaying our Presidential Export Awards and Business Excellence.",
    url: "/certification",
    category: "Certifications",
    keywords: ["awards", "presidential", "export", "productivity", "excellence", "recognition"]
  },

  // --- SUPPORT / FAQ ---
  {
    id: "sup-faq",
    title: "Frequently Asked Questions",
    description: "Answers regarding lead times, MOQs, prototyping, and shipping.",
    url: "/faq",
    category: "Support",
    keywords: ["faq", "questions", "help", "support", "moq", "lead time", "prototyping", "shipping"]
  }
];
