import {
  Factory,
  CarFront,
  Stethoscope,
  RadioReceiver,
  Activity,
  Sofa,
  Sprout,
  type LucideIcon,
} from "lucide-react";

export interface IndustryCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

export const industriesData: IndustryCategory[] = [
  {
    title: "Industrial & Automation",
    description:
      "We deliver advanced electronic solutions for industrial applications, from oil drilling systems to factory automation and energy management. Our products ensure precision, reliability, and efficiency across diverse industrial environments.",
    icon: Factory,
    items: [
      "Oil drilling",
      "Elevator control systems",
      "Railway tracking device",
      "Factory automation equipment",
      "Studio lighting",
      "Energy meters",
      "Industrial power supply",
    ],
  },
  {
    title: "Automotive",
    description:
      "Our automotive electronics enhance safety, performance, and innovation. From dashboard indication systems to EV cable harnesses, we support the evolving needs of modern mobility.",
    icon: CarFront,
    items: [
      "Dashboard indication system",
      "Motor control circuits",
      "Airbag sensor harness",
      "EV cable harness",
    ],
  },
  {
    title: "Medical",
    description:
      "We partner with healthcare innovators to produce reliable medical electronics. Our devices—from health monitoring systems to anesthesia equipment—are designed with precision and compliance at their core.",
    icon: Stethoscope,
    items: [
      "Health monitoring devices",
      "Massager device",
      "Devices for general anesthesia",
    ],
  },
  {
    title: "Telecommunication",
    description:
      "We strengthen connectivity with telecom solutions such as signal repeaters and set-top boxes, enabling faster, more reliable communication worldwide.",
    icon: RadioReceiver,
    items: [
      "Signal repeaters",
      "Set Top Boxes",
    ],
  },
  {
    title: "IoT & Smart Apparel",
    description:
      "We integrate technology into everyday life through smart home systems, wearable electronics, and environmental monitoring devices—bringing intelligence and sustainability to modern living.",
    icon: Activity,
    items: [
      "Animal behavior monitoring device",
      "Smart home systems",
      "Smart garments",
      "Energy and environment monitoring device",
    ],
  },
  {
    title: "High-end Consumer",
    description:
      "Our consumer electronics combine innovation with convenience. From temperature control systems to age-assistance devices, we design products that improve comfort and quality of life.",
    icon: Sofa,
    items: [
      "Temperature control systems",
      "Mini battery backup device",
      "Age assistance devices",
    ],
  },
  {
    title: "Agriculture",
    description:
      "Tos Lanka introduces novel high-tech solutions for pesticide-free agriculture, helping farmers manage pests such as pod borers and leaf-eating caterpillars without harmful chemicals.",
    icon: Sprout,
    items: [
      "Anti Moth LED Lamp",
    ],
  },
];
