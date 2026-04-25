import { Cpu, Blocks, CircuitBoard, Droplets, Microscope, Beaker, CarFront, Magnet, Globe, type LucideIcon } from "lucide-react";

export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  icon: LucideIcon;
  image: string;
  heroParagraphs: string[];
  capabilities: ServiceCapability[];
  faqs: ServiceFAQ[];
  industries: string[];
  relatedSlugs: string[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "smt",
    title: "Surface Mount Technology (SMT)",
    shortTitle: "SMT Assembly",
    tagline: "25+ Years of Precision Placement",
    metaTitle: "PCB Assembly & SMT Services Sri Lanka | Panasonic High-Speed Line | TOS Lanka",
    metaDescription:
      "PCB assembly and SMT services in Sri Lanka — Panasonic high-speed placement, lead-free reflow soldering, fine-pitch BGA assembly. Japanese-owned, triple ISO certified EMS provider. Serving automotive, medical, and industrial OEMs worldwide.",
    keywords: ["PCB assembly services Sri Lanka", "SMT assembly company Sri Lanka", "surface mount technology provider Sri Lanka", "Panasonic SMT placement line", "fine pitch BGA assembly services", "lead free reflow soldering Sri Lanka", "contract PCB assembly Asia"],
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
    faqs: [
      { question: "What SMT equipment does TOS Lanka operate?", answer: "Our SMT lines feature Panasonic high-speed placement machines capable of placing fine-pitch components including BGAs, QFNs, and 0201 passives. All lines operate with lead-free, RoHS-compliant reflow soldering profiles." },
      { question: "Can you handle mixed-technology boards with both SMT and through-hole?", answer: "Yes. Our facility integrates SMT placement with through-hole assembly, wave soldering, and selective soldering — all under one roof. Mixed-technology boards are a core capability." },
      { question: "What quality certifications cover your SMT assembly?", answer: "Our SMT operations are covered by ISO 9001:2015 (Quality), ISO 14001:2015 (Environmental), and ISO 45001:2018 (Safety) certifications, all audited by Bureau Veritas." },
    ],
    industries: ["Automotive", "Medical Devices", "Consumer Electronics", "Industrial Control", "Telecommunications"],
    relatedSlugs: ["through-hole", "test-inspection", "prototype-assembling"],
  },
  {
    slug: "system-integration",
    title: "System Integration & Box Build",
    shortTitle: "Systems Integration",
    tagline: "Complete Turnkey Product Assembly",
    metaTitle: "Box Build & Turnkey Product Assembly Sri Lanka | PCB to Finished Product | TOS Lanka",
    metaDescription:
      "Box build assembly and turnkey product integration in Sri Lanka — from PCB sub-assemblies to fully finished, tested, and packaged electronics. Japanese-owned EMS with zero-defect manufacturing and triple ISO certification.",
    keywords: ["box build assembly company Sri Lanka", "turnkey product assembly EMS", "electromechanical assembly Sri Lanka", "PCB to finished product manufacturer", "systems integration electronics Sri Lanka", "contract box build Asia"],
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
    faqs: [
      { question: "What does box build assembly include?", answer: "Our box build service covers the complete journey from bare PCB assembly through mechanical integration, cable and harness routing, firmware loading, functional testing, and final packaging — delivering a finished, market-ready product." },
      { question: "Can you handle both the PCB assembly and the final product assembly?", answer: "Yes. As a full-service EMS provider with nine integrated service lines, we assemble the PCBs, wind any custom inductive components, build the cable harnesses, and integrate everything into the final enclosure — all in one facility." },
      { question: "What industries do you serve with box build?", answer: "We provide box build services for consumer electronics, industrial equipment, medical devices, telecommunications, and IoT products. Our facility handles a wide range of product complexities." },
    ],
    industries: ["Consumer Electronics", "Industrial Equipment", "Medical Devices", "Telecommunications"],
    relatedSlugs: ["smt", "test-inspection", "coating-potting"],
  },
  {
    slug: "through-hole",
    title: "Through Hole Assembly",
    shortTitle: "Through Hole",
    tagline: "Japan-Trained Precision Soldering",
    metaTitle: "Through Hole & Wave Soldering Assembly Sri Lanka | IPC Class 3 | TOS Lanka",
    metaDescription:
      "Through hole assembly and wave soldering in Sri Lanka — automated insertion, Japan-trained manual soldering technicians, and IPC Class 3 quality. Industrial, automotive, and power electronics THT assembly by a triple ISO certified EMS.",
    keywords: ["through hole assembly services Sri Lanka", "wave soldering manufacturer Sri Lanka", "manual soldering electronics Sri Lanka", "THT PCB assembly provider", "IPC Class 3 soldering services", "selective soldering Sri Lanka"],
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
    faqs: [
      { question: "What soldering methods does TOS Lanka use for through-hole assembly?", answer: "We offer wave soldering for high-volume production, selective soldering for mixed-technology boards, and expert manual hand soldering by Japan-trained technicians for complex or heat-sensitive components." },
      { question: "Can you assemble boards with both SMT and through-hole components?", answer: "Absolutely. Mixed-technology PCB assembly is one of our core strengths. We integrate our SMT and THT lines to handle boards requiring both surface mount and through-hole components in a single production flow." },
      { question: "What quality standards apply to your through-hole soldering?", answer: "All through-hole assemblies are inspected against IPC-A-610 workmanship standards. Our triple ISO certification and Japanese-trained workforce ensure consistently high-reliability solder joints." },
    ],
    industries: ["Industrial Equipment", "Automotive", "Medical Devices", "Power Electronics"],
    relatedSlugs: ["smt", "test-inspection", "prototype-assembling"],
  },
  {
    slug: "coating-potting",
    title: "Conformal Coating & Potting",
    shortTitle: "Coating & Potting",
    tagline: "Advanced Electronics Protection",
    metaTitle: "Conformal Coating & Potting Services Sri Lanka | Automotive Medical Industrial | TOS Lanka",
    metaDescription:
      "Conformal coating and epoxy potting services in Sri Lanka — protect PCBs from moisture, dust, vibration, and chemicals. Inline coating systems for automotive, medical, and marine electronics. Triple ISO certified EMS.",
    keywords: ["conformal coating services Sri Lanka", "PCB potting encapsulation Sri Lanka", "epoxy filling electronics protection", "conformal coating automotive electronics", "inline coating systems EMS", "PCB moisture protection manufacturer"],
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
    faqs: [
      { question: "What types of conformal coating does TOS Lanka apply?", answer: "We apply acrylic, silicone, and urethane-based conformal coatings depending on the application requirements. Our inline coating systems provide consistent, production-scale application for high-volume orders." },
      { question: "When should I use potting instead of conformal coating?", answer: "Potting and encapsulation provide more robust protection than conformal coating. It is recommended for electronics exposed to extreme vibration, submersion, or significant thermal cycling — common in automotive and marine applications." },
      { question: "Can you coat boards that were assembled elsewhere?", answer: "Yes. We accept boards assembled by other manufacturers for conformal coating and potting services. We will review your boards and recommend the appropriate coating process for your application." },
    ],
    industries: ["Automotive Electronics", "Industrial Controls", "Consumer Devices", "Marine Electronics"],
    relatedSlugs: ["smt", "system-integration", "test-inspection"],
  },
  {
    slug: "test-inspection",
    title: "Test & Inspection",
    shortTitle: "Test & Inspection",
    tagline: "Zero-Compromise Quality Assurance",
    metaTitle: "PCB Testing & Inspection Sri Lanka | ICT, AOI, X-Ray, Functional Test | TOS Lanka",
    metaDescription:
      "PCB testing and inspection services in Sri Lanka — in-circuit testing (ICT), YAMAHA AOI, X-ray inspection, functional testing, and firmware uploading. Zero-defect verification for every board by a triple ISO certified EMS.",
    keywords: ["PCB testing inspection Sri Lanka", "in circuit testing ICT company Sri Lanka", "AOI inspection services PCB", "X-ray inspection BGA verification", "functional testing EMS Sri Lanka", "zero defect verification electronics"],
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
    faqs: [
      { question: "What testing methods does TOS Lanka offer?", answer: "We provide automated optical inspection (AOI) using YAMAHA systems, in-circuit testing (ICT) for electrical verification, X-ray inspection for BGA and hidden joint verification, functional testing, and firmware uploading." },
      { question: "Do you develop custom test fixtures?", answer: "Yes. Our engineering team designs and builds custom ICT fixtures and functional test jigs tailored to each customer's specific board layout and test requirements." },
      { question: "Can you test boards that were assembled elsewhere?", answer: "Yes. We accept externally assembled boards for inspection and testing services, including AOI, ICT, X-ray, and functional testing on a contract basis." },
    ],
    industries: ["All Manufacturing Sectors", "Automotive", "Medical Devices", "Industrial Equipment"],
    relatedSlugs: ["smt", "through-hole", "system-integration"],
  },
  {
    slug: "prototype-assembling",
    title: "Prototype PCB Assembly",
    shortTitle: "Prototyping",
    tagline: "Accelerate Your Innovation Cycle",
    metaTitle: "Prototype PCB Assembly Sri Lanka | Low MOQ, Free DFM Review | TOS Lanka",
    metaDescription:
      "Prototype PCB assembly in Sri Lanka with low minimum orders, free DFM review, and seamless prototype-to-production transition. Japanese-owned EMS with production-grade quality from the first board.",
    keywords: ["prototype PCB assembly company Sri Lanka", "low MOQ electronics assembly", "rapid prototyping EMS Sri Lanka", "free DFM review PCB assembly", "prototype to production manufacturer", "fast turn PCB prototype Asia"],
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
    faqs: [
      { question: "What is TOS Lanka's minimum order for prototypes?", answer: "We accept prototype orders starting from a small number of boards. There is no prohibitively high minimum order quantity — we treat every prototype with the same production-grade quality as a full production run." },
      { question: "Do you offer a DFM review before assembly?", answer: "Yes. Every new project receives a complimentary Design for Manufacturing review. Our engineers identify potential manufacturing issues before they reach the production floor, saving you time and revision cycles." },
      { question: "Can I scale from prototype to production with TOS Lanka?", answer: "Absolutely. One of our key advantages is prototype-to-production continuity. Your prototype and production boards are built in the same facility, by the same team, on the same equipment — eliminating transfer risk." },
    ],
    industries: ["R&D Labs", "Startups", "Consumer Electronics", "Industrial Innovation"],
    relatedSlugs: ["smt", "through-hole", "test-inspection"],
  },
  {
    slug: "automotive-harnessing",
    title: "Automotive Wire Harnessing",
    shortTitle: "Automotive Harnessing",
    tagline: "Safety-Critical Wiring for Global Brands",
    metaTitle: "Automotive Wire Harness Manufacturer Sri Lanka | Safety, ABS, EV Harnesses | TOS Lanka",
    metaDescription:
      "Automotive wire harness manufacturer in Sri Lanka — safety sensor harnesses, ABS system wiring, EV cable harnesses for global OEMs. 100% continuity tested, triple ISO certified. Japanese-owned EMS.",
    keywords: ["automotive wire harness manufacturer Sri Lanka", "cable harness assembly company Sri Lanka", "safety sensor harness manufacturer", "ABS wiring harness assembly", "EV cable harness manufacturer Asia", "automotive electronics assembly Sri Lanka"],
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
    faqs: [
      { question: "What types of automotive harnesses does TOS Lanka manufacture?", answer: "We manufacture safety sensor harnesses for seat belt systems, ABS brake system wiring, engine management harnesses, and EV cable harnesses including high-voltage battery interconnects and charging system wiring." },
      { question: "How do you ensure harness quality?", answer: "Every harness undergoes 100% electrical continuity testing before shipment. Our automotive-grade quality processes include full traceability, visual inspection against IPC/WHMA-A-620 standards, and pull-force verification on all crimped connections." },
      { question: "Do you supply harnesses to global automotive brands?", answer: "Yes. We manufacture wire harnesses for major global automotive OEMs, with proven export relationships across Japan, Europe, and North America. Our harnesses are installed in vehicles worldwide." },
    ],
    industries: ["Automotive OEMs", "Tier-1 Suppliers", "Electric Vehicles", "Commercial Vehicles"],
    relatedSlugs: ["system-integration", "test-inspection", "inductive-components"],
  },
  {
    slug: "inductive-components",
    title: "Inductive Component Assemblies",
    shortTitle: "Inductive Components",
    tagline: "Precision Magnetic Component Assembly",
    metaTitle: "Custom Coil Winding & Transformer Manufacturer Sri Lanka | TOS Lanka",
    metaDescription:
      "Custom coil winding and inductive component manufacturing in Sri Lanka — transformers, inductors, EMI chokes, and ferrite core assemblies. Unique dual capability: wound components and PCB assembly under one roof.",
    keywords: ["custom coil winding company Sri Lanka", "transformer manufacturer Sri Lanka", "inductor assembly manufacturer Asia", "EMI choke winding services", "ferrite core assembly manufacturer", "inductive component EMS provider"],
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
    faqs: [
      { question: "What inductive components can TOS Lanka manufacture?", answer: "We wind and assemble custom transformers, power inductors, EMI common-mode chokes, ferrite core assemblies, and signal transformers. Components are wound to your exact specification including turns ratio, inductance value, and insulation class." },
      { question: "Can you manufacture wound components and assemble them onto PCBs?", answer: "Yes — this is our unique advantage. We are one of the very few EMS providers globally that manufactures custom wound components and assembles PCBs under the same roof, eliminating inter-vendor logistics and quality mismatches." },
      { question: "What testing is performed on inductive components?", answer: "Every component undergoes inductance measurement, DC resistance verification, turns ratio testing for transformers, insulation resistance testing, and dielectric withstand (Hi-Pot) testing per applicable safety specifications." },
    ],
    industries: ["Power Electronics", "Telecommunications", "Automotive", "Consumer Electronics"],
    relatedSlugs: ["smt", "through-hole", "automotive-harnessing"],
  },
  {
    slug: "supply-chain",
    title: "Supply Chain Network",
    shortTitle: "Supply Chain",
    tagline: "Global Sourcing, Local Excellence",
    metaTitle: "Electronics Supply Chain & Turnkey Procurement Sri Lanka | Global Sourcing | TOS Lanka",
    metaDescription:
      "Turnkey and consigned electronics supply chain solutions from Sri Lanka — global component sourcing across Japan, USA, Germany, China, and Taiwan. Competitive pricing, verified quality, and reliable lead times.",
    keywords: ["electronics supply chain Sri Lanka", "turnkey component sourcing EMS", "consigned PCB assembly Sri Lanka", "global electronics procurement Asia", "component sourcing Japan USA Germany", "BOM management EMS provider"],
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
    faqs: [
      { question: "Does TOS Lanka offer turnkey manufacturing?", answer: "Yes. We offer both turnkey (we source all components) and consigned (you supply the components) models. Our global sourcing network covers Japan, USA, Germany, China, Taiwan, Hong Kong, India, Singapore, and Malaysia." },
      { question: "How do you verify component quality?", answer: "All incoming components undergo inspection including visual verification, packaging integrity checks, and cross-referencing against the approved BOM. For critical applications, we perform additional electrical verification." },
      { question: "Can you help with BOM optimisation to reduce costs?", answer: "Absolutely. Our procurement team regularly identifies cost-saving component alternatives and consolidation opportunities. We work with your engineering team to validate any suggested alternatives before implementation." },
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
