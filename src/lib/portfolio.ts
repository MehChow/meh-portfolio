export const navItems = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

export const contactProfile = {
  name: "Placeholder Developer",
  intro: "Open to frontend and mobile work with a calm, practical product focus.",
  github: {
    label: "GitHub",
    value: "github.com/placeholder-dev",
    href: "https://github.com/placeholder-dev",
  },
  email: {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
} as const

export const apps = [
  {
    name: "Quick Panel Background Cropper",
    eyebrow: "Expo utility app",
    summary:
      "A mobile customization utility focused on quick-panel background preparation, precise cropping, and export-ready flows.",
    tone: "Utility, customization, Android workflow",
    stack: ["Expo", "React Native", "TypeScript", "Reanimated", "MMKV"],
    notes: [
      "Built around a focused mobile editing flow.",
      "Designed for small-screen gestures and fast export feedback.",
      "Uses local persistence for lightweight app state.",
    ],
    links: [
      { label: "Case study", href: "#" },
      { label: "Store link", href: "#" },
    ],
  },
  {
    name: "Let You Cook",
    eyebrow: "Recipe flow app",
    summary:
      "A friendly cooking companion concept for saving recipes, planning meals, and moving through kitchen steps without visual clutter.",
    tone: "Consumer UI, recipes, calm task flow",
    stack: ["React Native", "Expo", "TypeScript", "Design Systems", "Local Data"],
    notes: [
      "Structured around readable cooking steps.",
      "Balances browse, save, and active-cooking modes.",
      "Uses warm UI patterns for a low-friction kitchen workflow.",
    ],
    links: [
      { label: "Case study", href: "#" },
      { label: "Prototype", href: "#" },
    ],
  },
] as const

export const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Astro", "TypeScript", "Tailwind", "shadcn/ui"],
  },
  {
    title: "Mobile",
    items: ["Expo", "React Native", "Reanimated", "Android release flow"],
  },
  {
    title: "Product polish",
    items: ["Responsive UI", "Accessibility", "Design systems", "Performance"],
  },
] as const

export const timelineItems = [
  {
    period: "3+ years",
    title: "Frontend and mobile development",
    description:
      "Building React interfaces and Expo React Native apps with attention to real user flows.",
  },
  {
    period: "Recently",
    title: "Mobile tooling and release workflows",
    description:
      "Improving app export paths, Android builds, and practical tester release loops.",
  },
  {
    period: "Ongoing",
    title: "Interface craft",
    description:
      "Refining accessible, responsive UI systems with calm motion and durable component patterns.",
  },
] as const

export const workingStyleItems = [
  "I keep the first version practical, then polish what users actually touch.",
  "I prefer small components, clear state boundaries, and boring code that survives maintenance.",
  "I care about mobile ergonomics, keyboard access, and details that make interfaces feel finished.",
] as const
