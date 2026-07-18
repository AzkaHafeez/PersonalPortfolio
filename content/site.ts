export const siteConfig = {
  name: "AZKA.",
  fullName: "Azka Hafeez",
  title: "AI Engineer & Full-Stack Developer",
  description:
    "Computer Science student at NUST. Building intelligent products, designing thoughtful experiences, and engineering ideas into reality.",
  url: "https://azka.dev",
  introName: "AZKA.",
  email: "azkahafeez7@gmail.com",
  github: "https://github.com/AzkaHafeez",
  linkedin: "https://www.linkedin.com/in/azka-hafeez-7b5971328/",
  availability: "Available for freelance projects & internships",
  location: "Islamabad, Pakistan",
  role: "Product Builder · AI Engineer · Full-Stack Developer",
  focus: "AI products, full-stack systems, and editorial interfaces",
  stack: ["React", "Next.js", "Python", "Django", "TensorFlow", "Firebase"],
  tagline: "Building intelligent products.",
  sublines: [
    "Building intelligent products.",
    "Designing thoughtful experiences.",
    "Engineering ideas into reality.",
  ],
  roles: [
    "Computer Science Student",
    "Frontend Developer",
    "AI/ML Engineer",
    "Creative Technologist",
  ],
  quote:
    "Software is the learned game, correct and magnificent, of forms assembled in the light.",
  handle: "@AzkaHafeez",
  stats: {
    projects: 5,
    experience: 4,
    writing: 0,
  },
  portrait: null as string | null,
} as const;

/** Magazine-style corner annotations for the cinematic intro */
export const introAnnotations = {
  bottomLeft: "Full stack developer · AI engineer",
  bottomRight: "Product builder",
} as const;

export const profileTabs = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
] as const;

export type ProfileTabId = (typeof profileTabs)[number]["id"];

/** Legacy nav - retained for secondary pages if needed */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf", external: true },
] as const;

/** Floating exhibition navigation */
export const exhibitionNavLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const aboutContent = {
  headline: "Who I Am",
  lead: "Computer Science student at NUST.",
  story: `Passionate about artificial intelligence, frontend engineering, machine learning, and design - building digital products that feel considered from the first pixel to the last line of code.`,
  secondary: `I move between research labs, product teams, and creative direction. Whether I'm training models, crafting interfaces, or designing systems, the through-line is the same: clarity, craft, and software people actually want to use.`,
  focusAreas: [
    { label: "AI", detail: "Models, evaluation, applied ML" },
    { label: "Frontend", detail: "Editorial interfaces & motion" },
    { label: "Machine Learning", detail: "Pipelines that ship" },
    { label: "Design", detail: "Systems, storytelling, detail" },
    { label: "Products", detail: "Concept to deployment" },
  ],
  annotations: [
    { id: "nust", text: "NUST · CS" },
    { id: "craft", text: "Craft over novelty" },
    { id: "build", text: "Build → ship → refine" },
  ],
  quickFacts: [
    { label: "Studies", value: "CS @ NUST" },
    { label: "Focus", value: "AI · Frontend · Design" },
    { label: "Location", value: "Pakistan" },
    { label: "Availability", value: "Open for projects" },
  ],
  interests: [
    "Model evaluation & practical ML pipelines",
    "Editorial interfaces & motion design",
    "Secure-by-design web applications",
  ],
  values: [
    "Clarity over complexity",
    "Ship real software, not demos",
    "Every animation should have purpose",
  ],
  journey: [
    { year: "2025", event: "Full Stack Developer at Captain MDCAT Platform" },
    { year: "2026", event: "AI/ML Research Intern at NCAI & Software Engineer Intern at AIHive" },
  ],
} as const;
