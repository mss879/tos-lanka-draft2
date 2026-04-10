import { Cpu, Blocks, CircuitBoard, Droplets, Microscope, Beaker, CarFront, Magnet, Globe, type LucideIcon } from "lucide-react";

export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  icon: LucideIcon;
  image: string;
  heroParagraphs: string[];
  capabilities: ServiceCapability[];
  industries: string[];
  relatedSlugs: string[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "smt",
    title: "Surface Mount Technology (SMT)",
    shortTitle: "SMT Assembly",
    tagline: "25+ Years of Precision Placement",
    metaTitle: "SMT Assembly Services Sri Lanka | Surface Mount Technology & Reflow Soldering | TOS Lanka",
    metaDescription:
      "TOS Lanka delivers world-class SMT assembly and Surface Mount Technology services in Sri Lanka. Panasonic high-speed placement, reflow soldering, and electronic assembly for automotive, medical, and industrial electronics. 25+ years of contract manufacturing excellence.",
    icon: Cpu,
    image: "/services/smt_new.webp",
    heroParagraphs: [
      "With over 25 years of expertise in Surface Mount Technology, TOS Lanka delivers precision, reliability, and innovation in every project. Our state-of-the-art Panasonic high-speed placement machines and fully ROHS-compliant processes ensure your products meet the highest global quality standards.",
      "From multi-layer PCB assembly and fine-pitch component placement to lead-free soldering, we serve industries spanning automotive, medical devices, consumer electronics, and industrial control — with customized solutions tailored to high-volume production or specialized small-batch orders.",
    ],
    capabilities: [
      {
        title: "High-Speed Panasonic Placement",
        description:
          "State-of-the-art Panasonic high-speed placement machines enabling fine-pitch component placement with exceptional accuracy and throughput.",
      },
      {
        title: "Multi-Layer PCB Assembly",
        description:
          "Complex multi-layer board assembly with full ROHS compliance, lead-free soldering, and rigorous quality control at every stage.",
      },
      {
        title: "Customized Production Runs",
        description:
          "Flexible manufacturing solutions — from high-volume production lines to specialized small-batch orders — tailored to your exact specifications.",
      },
      {
        title: "International Export Excellence",
        description:
          "A proven track record of international partnerships and export excellence, combining advanced technology with a highly skilled workforce.",
      },
    ],
    industries: ["Automotive", "Medical Devices", "Consumer Electronics", "Industrial Control", "Telecommunications"],
    relatedSlugs: ["through-hole", "test-inspection", "prototype-assembling"],
  },
  {
    slug: "system-integration",
    title: "System Integration & Box Build",
    shortTitle: "Systems Integration",
    tagline: "Complete Turnkey Product Assembly",
    metaTitle: "Box Build Assembly & System Integration Sri Lanka | Electronic Assembly | TOS Lanka",
    metaDescription:
      "TOS Lanka provides complete box build assembly and system integration in Sri Lanka — from printed circuit board sub-assemblies to fully finished electronics products. Contract manufacturing with zero-defect electronic assembly.",
    icon: Blocks,
    image: "/services/integration_new.webp",
    heroParagraphs: [
      "We deliver complete product assembly and functional testing as turnkey solutions — from sub-assemblies to fully finished products. Using a combination of manual craftsmanship and precision semi-automatic tools, every component is assembled to exact specifications with zero-defect outcomes.",
      "From mechanical integration to electronic component assembly, our skilled team handles a wide range of product complexities with speed and accuracy. Customized assembly solutions ensure seamless integration into your supply chain, bringing your products to market faster — built to last.",
    ],
    capabilities: [
      {
        title: "Full Product Assembly",
        description:
          "End-to-end assembly from sub-assemblies to fully finished products, including mechanical integration and electronic component placement.",
      },
      {
        title: "Functional Testing",
        description:
          "Comprehensive in-line and end-of-line functional testing to verify every unit meets exact operational specifications before shipment.",
      },
      {
        title: "Precision Semi-Automatic Tools",
        description:
          "A combination of expert manual craftsmanship and precision semi-automatic tooling ensures consistent, repeatable assembly quality.",
      },
      {
        title: "Zero-Defect Manufacturing",
        description:
          "Stringent quality standards and streamlined processes guarantee zero-defect outcomes, reducing rework and maximizing reliability.",
      },
    ],
    industries: ["Consumer Electronics", "Industrial Equipment", "Medical Devices", "Telecommunications"],
    relatedSlugs: ["smt", "test-inspection", "coating-potting"],
  },
  {
    slug: "through-hole",
    title: "Through Hole Assembly",
    shortTitle: "Through Hole",
    tagline: "Japan-Trained Precision Soldering",
    metaTitle: "Through Hole Assembly (THT) Services Sri Lanka | Wave & Manual Soldering | TOS Lanka",
    metaDescription:
      "TOS Lanka's Through Hole Technology (THT) assembly combines automated insertion machines with Japan-trained technicians for wave soldering and manual soldering excellence in Sri Lanka. Electronic assembly for industrial, automotive, and medical electronics.",
    icon: CircuitBoard,
    image: "/services/through-hole_new.webp",
    heroParagraphs: [
      "Our Through Hole assembly process combines advanced insertion machines with the expertise of skilled, Japan-trained technicians to deliver superior quality and precision. This hybrid approach ensures consistent, reliable placement of components that demand enhanced mechanical strength and durability.",
      "We specialize in manual hand soldering for complex or sensitive components, employing rigorous techniques to guarantee strong, defect-free solder joints. With strict quality control and adherence to international manufacturing standards, every through-hole assembly enhances product longevity and performance.",
    ],
    capabilities: [
      {
        title: "Automated Insertion Machines",
        description:
          "Advanced component insertion machines deliver consistent, high-throughput placement for standard through-hole components.",
      },
      {
        title: "Japan-Trained Technicians",
        description:
          "Our skilled technicians, trained to Japanese manufacturing standards, bring deep expertise in manual hand soldering of complex and sensitive components.",
      },
      {
        title: "High-Reliability Connections",
        description:
          "Engineered for applications where mechanical strength is critical — industrial equipment, automotive systems, and medical devices.",
      },
      {
        title: "Defect-Free Solder Joints",
        description:
          "Rigorous soldering techniques and multi-point inspection ensure strong, defect-free joints that meet international quality standards.",
      },
    ],
    industries: ["Industrial Equipment", "Automotive", "Medical Devices", "Power Electronics"],
    relatedSlugs: ["smt", "test-inspection", "prototype-assembling"],
  },
  {
    slug: "coating-potting",
    title: "Conformal Coating & Potting",
    shortTitle: "Coating & Potting",
    tagline: "Advanced Electronics Protection",
    metaTitle: "Conformal Coating & Epoxy Filling Services Sri Lanka | PCB Protection | TOS Lanka",
    metaDescription:
      "TOS Lanka provides conformal coating and epoxy filling solutions in Sri Lanka to protect printed circuit boards from moisture, dust, vibration, and harsh environments. Custom inline coating for automotive, medical, and industrial electronics.",
    icon: Droplets,
    image: "/services/coating_new.webp",
    heroParagraphs: [
      "We provide specialized coating and potting solutions designed to protect sensitive electronics from moisture, dust, vibration, and harsh environmental conditions. Our capabilities include custom conformal coating for moisture-sensitive PCBs and inline coating systems for high-efficiency production.",
      "Our encapsulation processes enhance insulation, improve mechanical strength, and extend product lifespan. We work with a variety of industry-approved materials ensuring compatibility with your specific application and performance requirements — whether for automotive electronics, industrial controls, or consumer devices.",
    ],
    capabilities: [
      {
        title: "Conformal Coating",
        description:
          "Custom conformal coating for moisture-sensitive PCBs using industry-approved materials, applied with precision for complete coverage.",
      },
      {
        title: "Inline Coating Systems",
        description:
          "High-efficiency inline coating systems for production-scale throughput, ensuring consistent application across large batch volumes.",
      },
      {
        title: "Potting & Encapsulation",
        description:
          "Component encapsulation to enhance insulation, improve mechanical strength, and extend product lifespan in demanding environments.",
      },
      {
        title: "Material Compatibility",
        description:
          "We work with a broad range of industry-approved coating and potting compounds, matched to your application's thermal, chemical, and electrical requirements.",
      },
    ],
    industries: ["Automotive Electronics", "Industrial Controls", "Consumer Devices", "Marine Electronics"],
    relatedSlugs: ["smt", "system-integration", "test-inspection"],
  },
  {
    slug: "test-inspection",
    title: "Test & Inspection",
    shortTitle: "Test & Inspection",
    tagline: "Zero-Compromise Quality Assurance",
    metaTitle: "In-Circuit Testing (ICT) & Inspection Services Sri Lanka | AOI | TOS Lanka",
    metaDescription:
      "TOS Lanka offers advanced in-circuit testing (ICT), YAMAHA AOI inspection, functional testing, and firmware uploading in Sri Lanka. Zero-defect electronic assembly verification for printed circuit boards.",
    icon: Microscope,
    image: "/services/inspection_new.webp",
    heroParagraphs: [
      "Our facility is equipped with advanced YAMAHA Automated Optical Inspection (AOI) machines capable of detecting even the smallest defects in solder joints, component placement, and PCB integrity with exceptional accuracy.",
      "For electrical verification, we use In-Circuit Testing (ICT) systems to ensure every circuit board meets exact performance specifications. We also offer functional testing and firmware uploading to guarantee each product performs flawlessly in real-world applications — delivering zero-compromise manufacturing quality.",
    ],
    capabilities: [
      {
        title: "YAMAHA Automated Optical Inspection",
        description:
          "Advanced AOI machines detect the smallest defects in solder joints, component placement, and board integrity with exceptional accuracy.",
      },
      {
        title: "In-Circuit Testing (ICT)",
        description:
          "Comprehensive electrical verification ensures every circuit board meets exact performance specifications before leaving our production line.",
      },
      {
        title: "Functional Testing",
        description:
          "End-to-end functional tests verify that each product performs flawlessly under real-world operating conditions.",
      },
      {
        title: "Firmware Upload & Verification",
        description:
          "On-line firmware uploading and verification ensures each unit ships production-ready with the latest validated software.",
      },
    ],
    industries: ["All Manufacturing Sectors", "Automotive", "Medical Devices", "Industrial Equipment"],
    relatedSlugs: ["smt", "through-hole", "system-integration"],
  },
  {
    slug: "prototype-assembling",
    title: "Prototype PCB Assembly",
    shortTitle: "Prototyping",
    tagline: "Accelerate Your Innovation Cycle",
    metaTitle: "Prototyping & Prototype PCB Assembly Services Sri Lanka | TOS Lanka",
    metaDescription:
      "TOS Lanka offers rapid prototyping and prototype printed circuit board assembly in Sri Lanka. Fast turnaround, flexible EMS processes, and seamless prototype-to-production transition for electronic assembly.",
    icon: Beaker,
    image: "/services/prototype_new.webp",
    heroParagraphs: [
      "At TOS Lanka, we recognize the vital role prototypes play in driving innovation. Our expert technicians specialize in prototype PCB assembly, offering cost-effective and flexible solutions tailored to your design and testing requirements.",
      "With rapid turnaround times and uncompromising quality, we help accelerate your development cycles. Our adaptable processes accommodate design changes and last-minute modifications, ensuring your prototypes align perfectly with your vision — supported by industry expertise and responsive service for a smooth transition from prototype to production.",
    ],
    capabilities: [
      {
        title: "Rapid Turnaround",
        description:
          "Fast-track prototype assembly with short lead times to help you iterate quickly and bring new ideas to market faster.",
      },
      {
        title: "Flexible Process Adaptation",
        description:
          "Accommodate design changes and last-minute modifications without disrupting timelines or compromising quality.",
      },
      {
        title: "Complex Component Placement",
        description:
          "From fine-pitch SMD to through-hole components, our technicians handle complex assemblies with precision soldering techniques.",
      },
      {
        title: "Prototype-to-Production Bridge",
        description:
          "Seamless transition from prototype validation to full-scale production — same facility, same quality standards, zero re-tooling delays.",
      },
    ],
    industries: ["R&D Labs", "Startups", "Consumer Electronics", "Industrial Innovation"],
    relatedSlugs: ["smt", "through-hole", "test-inspection"],
  },
  {
    slug: "automotive-harnessing",
    title: "Automotive Wire Harnessing",
    shortTitle: "Automotive Harnessing",
    tagline: "Safety-Critical Wiring for Global Brands",
    metaTitle: "Cable Harness & Automotive Electronics Assembly Sri Lanka | TOS Lanka",
    metaDescription:
      "TOS Lanka specializes in cable harness assembly and automotive electronics manufacturing in Sri Lanka. Safety sensor harnesses, ABS system wiring, and EV cable harnesses for global automotive brands.",
    icon: CarFront,
    image: "/services/automotive_new.webp",
    heroParagraphs: [
      "With extensive experience in the automotive industry, TOS Lanka specializes in assembling high-quality wiring harnesses for critical vehicle systems. Our expertise includes safety sensor harnesses for seat belts, ABS system wiring, and complex harness assemblies for major global automotive brands.",
      "We adhere to the most stringent industry standards and quality certifications, ensuring every harness delivers optimal performance, durability, and safety under demanding automotive conditions. Our skilled technicians use advanced tools and precision techniques to manage complex wiring layouts, connectors, and shielding requirements.",
    ],
    capabilities: [
      {
        title: "Safety Sensor Harnesses",
        description:
          "Precision assembly of seat belt safety sensor harnesses and crash detection wiring for leading global automotive OEMs.",
      },
      {
        title: "ABS System Wiring",
        description:
          "Complex ABS harness assemblies manufactured to exact automotive specifications with full traceability and quality documentation.",
      },
      {
        title: "Scalable Production",
        description:
          "From prototype harnesses to high-volume production runs, we support your needs with scalable, on-time delivery.",
      },
      {
        title: "Automotive-Grade QA",
        description:
          "Adherence to stringent automotive quality standards with zero-defect manufacturing and comprehensive end-of-line testing.",
      },
    ],
    industries: ["Automotive OEMs", "Tier-1 Suppliers", "Electric Vehicles", "Commercial Vehicles"],
    relatedSlugs: ["system-integration", "test-inspection", "inductive-components"],
  },
  {
    slug: "inductive-components",
    title: "Inductive Component Assemblies",
    shortTitle: "Inductive Components",
    tagline: "Precision Magnetic Component Assembly",
    metaTitle: "Coil Winding & Inductive Component Assembly Sri Lanka | Industrial Electronics | TOS Lanka",
    metaDescription:
      "TOS Lanka specializes in coil winding and inductive component assembly in Sri Lanka — coils, transformers, chokes, and inductors for industrial electronics, power electronics, automotive, and telecom applications.",
    icon: Magnet,
    image: "/services/inductive_new.webp",
    heroParagraphs: [
      "TOS Lanka specializes in the precise assembly of inductive components — including coils, transformers, chokes, and inductors — tailored to diverse industrial applications. Our skilled professionals bring deep expertise in handling sensitive magnetic components, ensuring optimal placement and soldering for peak performance.",
      "We support industries ranging from power electronics and telecommunications to automotive and consumer electronics, delivering assemblies that meet stringent quality standards and electrical specifications. From prototype builds to high-volume production, we offer flexible solutions designed to meet your unique requirements and timelines.",
    ],
    capabilities: [
      {
        title: "Coil & Transformer Assembly",
        description:
          "Precise winding, placement, and soldering of coils and transformers with strict process controls for consistent electrical performance.",
      },
      {
        title: "Choke & Inductor Assembly",
        description:
          "Expert handling of sensitive magnetic components with optimized placement techniques to maintain rated inductance and saturation levels.",
      },
      {
        title: "Advanced Equipment",
        description:
          "Specialized tooling and process controls guarantee manufacturing consistency and superior electrical performance across production runs.",
      },
      {
        title: "Flexible Production Scale",
        description:
          "From prototype builds to high-volume manufacturing — adaptable processes designed to match your design requirements and delivery timelines.",
      },
    ],
    industries: ["Power Electronics", "Telecommunications", "Automotive", "Consumer Electronics"],
    relatedSlugs: ["smt", "through-hole", "automotive-harnessing"],
  },
  {
    slug: "supply-chain",
    title: "Supply Chain Network",
    shortTitle: "Supply Chain",
    tagline: "Global Sourcing, Local Excellence",
    metaTitle: "Electronics Supply Chain & Procurement Sri Lanka | Contract Manufacturing | TOS Lanka",
    metaDescription:
      "TOS Lanka offers consigned and turnkey supply chain solutions for contract manufacturing in Sri Lanka. Global sourcing network spanning Japan, USA, Germany, China, Taiwan. Flexible procurement for EMS and electronic assembly.",
    icon: Globe,
    image: "/services/supply-chain_new.webp",
    heroParagraphs: [
      "We provide both consigned and turnkey solutions, adapting seamlessly to your procurement requirements. Our global sourcing network spans multiple continents, ensuring flexibility, quality, and reliability in every project.",
      "By leveraging established relationships with trusted suppliers across Asia, North America, and Europe, we secure competitive pricing, verified quality, and dependable lead times — so you can focus on product development while we manage the supply chain.",
    ],
    capabilities: [
      {
        title: "PCBs & Components",
        description:
          "Sourced from Hong Kong, China, Taiwan, Japan, USA, Germany, and India — with full traceability and incoming quality inspection.",
      },
      {
        title: "Consumables",
        description:
          "Solder, flux, chemicals, and process consumables sourced from trusted suppliers in Singapore and Malaysia.",
      },
      {
        title: "Plastic & Aluminum Parts",
        description:
          "Enclosures and structural components sourced from China, Vietnam, and Sri Lanka — with custom tooling and finishing capabilities.",
      },
      {
        title: "Consigned & Turnkey Models",
        description:
          "Full flexibility to work with customer-supplied components or manage complete procurement through our turnkey supply chain.",
      },
    ],
    industries: ["All Manufacturing Sectors"],
    relatedSlugs: ["smt", "system-integration", "automotive-harnessing"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
