export const siteConfig = {
  name: "AZKA.",
  fullName: "Azka Hafeez",
  title: "AI Engineer & Full-Stack Developer",
  description:
    "I build AI-powered products that people actually use. Full-Stack Developer and AI Engineer focused on transforming ideas into production-ready web applications, machine learning systems, and business tools.",
  url: "https://azka.dev",
  introName: "AZKA.",
  email: "azkahafeez7@gmail.com",
  github: "https://github.com/AzkaHafeez",
  linkedin: "https://www.linkedin.com/in/azka-hafeez-7b5971328/",
  availability: "Available for freelance projects & internships",
  location: "Pakistan",
  role: "Product Builder · AI Engineer · Full-Stack Developer",
  focus: "AI products, full-stack systems, and editorial interfaces",
  stack: ["React", "Next.js", "Python", "Django", "TensorFlow", "Firebase"],
  tagline: "I build AI-powered products that people actually use.",
  sublines: [
    "AI Engineer.",
    "Full-Stack Developer.",
    "Building products from concept to deployment.",
  ],
  quote:
    "Software is the learned game, correct and magnificent, of forms assembled in the light.",
  handle: "@AzkaHafeez",
  stats: {
    projects: 4,
    experience: 3,
    writing: 0,
  },
  portrait: null as string | null,
} as const;

/** Magazine-style corner annotations for the cinematic intro */
export const introAnnotations = {
  topLeft: "Exploring ideas.",
  topRight: "Building products.",
  bottomLeft: "Full stack developer · AI engineer",
  bottomRight: "Product builder",
} as const;

export const profileTabs = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
] as const;

export type ProfileTabId = (typeof profileTabs)[number]["id"];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf", external: true },
] as const;

export const aboutContent = {
  story: `I'm a Full-Stack Developer and AI Engineer focused on transforming ideas into production-ready web applications, machine learning systems, and business tools. From AI-assisted education platforms to offline classroom tools and internal business software, I enjoy building products from concept to deployment.`,
  secondary: `I like turning ideas into useful software — data-driven prototypes, exploratory AI models, and web apps that feel responsive and clear. Recent work spans interactive web experiences, adaptive learning systems, and secure-by-design interfaces.`,
  quickFacts: [
    { label: "Current role", value: "Product Builder & CS Student" },
    { label: "Focus", value: "AI products & full-stack systems" },
    { label: "Location", value: "Pakistan" },
    { label: "Availability", value: "Open for projects" },
  ],
  interests: [
    "Model evaluation & practical ML pipelines",
    "Editorial interfaces & motion design",
    "Secure-by-design web applications",
    "Offline-first & peer-to-peer systems",
  ],
  learning: [
    "Production AI deployment patterns",
    "System design for scale",
    "Advanced computer vision workflows",
  ],
  values: [
    "Clarity over complexity",
    "Ship real software, not demos",
    "Every animation should have purpose",
    "Products that solve real problems",
  ],
  journey: [
    { year: "2024", event: "Founded CaptainMDCAT — AI-powered MDCAT prep platform" },
    { year: "2025", event: "Built EventHub & Edunet — university & classroom platforms" },
    { year: "2026", event: "Shipped AURA Pro — editorial product showcase experience" },
  ],
} as const;
