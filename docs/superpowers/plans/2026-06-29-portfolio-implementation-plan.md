# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Astro/Tailwind v4/shadcn multi-page coffee-toned portfolio.

**Architecture:** Astro pages stay mostly static. Shared portfolio content lives in one small TypeScript data file. The only hydrated React island is the mobile shadcn `Sheet` header.

**Tech Stack:** Astro 7, Tailwind v4, shadcn `radix-nova`, React island for `Sheet`, lucide icons.

---

## File Structure

- Modify `src/layouts/Layout.astro`: global shell, page title/description, skip link, header/footer.
- Create `src/components/site-header.tsx`: desktop nav plus mobile shadcn `Sheet`.
- Create `src/lib/portfolio.ts`: shared app/project/nav/skill/timeline placeholder data.
- Modify `src/pages/index.astro`: home page.
- Create `src/pages/apps.astro`: two-app showcase.
- Create `src/pages/about.astro`: profile/timeline/stack page.
- Modify `src/styles/global.css`: global accessibility and polish only.
- Add shadcn components: `card`, `badge`, `separator`, `sheet`.

---

## Task 1: Add shadcn Components

**Files:**

- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/sheet.tsx`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Read component docs**

Run:

```bash
pnpm exec shadcn docs card badge separator sheet button
```

Expected: component docs URLs or local CLI guidance are printed. If network fails, continue with installed CLI/generated component APIs and verify generated files manually.

- [ ] **Step 2: Add components**

Run:

```bash
pnpm exec shadcn add card badge separator sheet
```

Expected: component files are added under `src/components/ui`.

- [ ] **Step 3: Verify generated files**

Run:

```bash
ls src/components/ui
```

Expected: `badge.tsx`, `button.tsx`, `card.tsx`, `separator.tsx`, and `sheet.tsx` are present.

- [ ] **Step 4: Review generated files**

Read each new UI component and check for:

- imports using `@/lib/utils` or the configured aliases from `components.json`
- no hardcoded registry path mismatches
- `Sheet` includes accessible title primitives
- no local changes to `button.tsx` unless the CLI intentionally updates it

- [ ] **Step 5: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/components/ui package.json pnpm-lock.yaml
git commit -m "feat: add portfolio ui components"
```

---

## Task 2: Shared Portfolio Data

**Files:**

- Create: `src/lib/portfolio.ts`

- [ ] **Step 1: Create shared data module**

Create `src/lib/portfolio.ts`:

```ts
export const navItems = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:hello@example.com" },
] as const

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
```

- [ ] **Step 2: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/lib/portfolio.ts
git commit -m "feat: add portfolio content data"
```

---

## Task 3: Layout and Header

**Files:**

- Modify: `src/layouts/Layout.astro`
- Create: `src/components/site-header.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update layout shell**

Replace `src/layouts/Layout.astro` with:

```astro
---
import SiteHeader from "@/components/site-header";
import "../styles/global.css";

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Placeholder Developer | React and Expo Portfolio",
  description = "Portfolio for a React frontend and Expo React Native developer.",
} = Astro.props;

const currentPath = Astro.url.pathname;
---

<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#241f1b" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader client:load currentPath={currentPath} />
    <main id="main-content">
      <slot />
    </main>
    <footer class="border-t border-border px-6 py-8 text-sm text-muted-foreground">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>Placeholder Developer</p>
        <p>React, Expo, and frontend craft.</p>
      </div>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Create responsive header**

Create `src/components/site-header.tsx`:

```tsx
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  currentPath: string
}

function isActive(href: string, currentPath: string) {
  if (href === "/") return currentPath === "/"
  return currentPath.startsWith(href)
}

export default function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 border-b border-border bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <a
          href="/"
          className="rounded-md text-sm font-semibold tracking-wide outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          translate="no"
        >
          meh.dev
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(item.href, currentPath)

            return (
              <Button key={item.href} asChild variant={active ? "secondary" : "ghost"}>
                <a href={item.href} aria-current={active ? "page" : undefined}>
                  {active ? <span aria-hidden="true">•</span> : null}
                  {item.label}
                </a>
              </Button>
            )
          })}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 max-w-[calc(100vw-2rem)]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile primary">
                {navItems.map((item) => {
                  const active = isActive(item.href, currentPath)

                  return (
                    <SheetClose key={item.href} asChild>
                      <a
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                          active
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span>{item.label}</span>
                        {active ? <span aria-hidden="true">Current</span> : null}
                      </a>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Remove page-level global CSS import**

Remove this line from `src/pages/index.astro`:

```astro
import "../styles/global.css";
```

- [ ] **Step 4: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/layouts/Layout.astro src/components/site-header.tsx src/pages/index.astro
git commit -m "feat: add responsive site shell"
```

---

## Task 4: Global CSS Polish

**Files:**

- Modify: `src/styles/global.css`

- [ ] **Step 1: Add global polish**

Append or merge into the existing `@layer base` block in `src/styles/global.css`:

```css
@layer base {
  html {
    @apply font-sans;
    color-scheme: dark;
    scroll-behavior: smooth;
    touch-action: manipulation;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-background text-foreground;
    min-width: 320px;
  }

  * {
    @apply border-border outline-ring/50;
  }

  *::selection {
    @apply bg-primary text-primary-foreground;
  }

  :is(h1, h2, h3, h4, h5, h6) {
    scroll-margin-top: 6rem;
    text-wrap: balance;
  }

  p,
  li {
    text-wrap: pretty;
  }

  a,
  button {
    -webkit-tap-highlight-color: color-mix(in oklch, var(--primary), transparent 72%);
  }
}

@layer components {
  .skip-link {
    @apply fixed left-4 top-4 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground opacity-0 outline-none transition-opacity duration-150 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Keep one final `@layer base` definition if the file already has one; do not duplicate conflicting `html` or `body` rules.

- [ ] **Step 2: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/styles/global.css
git commit -m "style: add portfolio global polish"
```

---

## Task 5: Home Page

**Files:**

- Modify: `src/pages/index.astro`
- Delete: `src/components/Welcome.astro` if no imports remain

- [ ] **Step 1: Replace home page**

Replace `src/pages/index.astro` with:

```astro
---
import { ArrowRight, Coffee, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/layouts/Layout.astro";
import { apps, skillGroups } from "@/lib/portfolio";
---

<Layout
  title="Placeholder Developer | React and Expo Portfolio"
  description="Portfolio for a React frontend and Expo React Native developer."
>
  <section class="px-6 py-16 sm:py-24">
    <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="flex flex-col gap-6">
        <Badge className="w-fit" variant="secondary">
          <Coffee />
          Coffee-fueled frontend and mobile work
        </Badge>
        <div class="flex flex-col gap-4">
          <h1 class="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            React interfaces and Expo apps with a calm, shipped-product feel.
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
            Placeholder Developer builds web and mobile experiences across React, Astro, and Expo React Native, with 3+ years focused on practical frontend craft.
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="/apps">
              View apps
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="mailto:hello@example.com">Contact</a>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Current focus</CardTitle>
          <CardDescription>
            Mobile ergonomics, responsive systems, and small interactions that make products feel finished.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-3">
            {["Expo React Native", "Accessible shadcn UI", "Android release workflow"].map((item) => (
              <div class="flex min-w-0 items-center gap-3 rounded-lg bg-muted p-3">
                <Smartphone aria-hidden="true" />
                <span class="min-w-0 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </section>

  <section class="px-6 py-10">
    <div class="mx-auto flex max-w-6xl flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="text-sm font-medium text-muted-foreground">Featured apps</p>
        <h2 class="text-3xl font-semibold">Built app shelf</h2>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        {apps.map((app) => (
          <Card>
            <CardHeader>
              <CardDescription>{app.eyebrow}</CardDescription>
              <CardTitle>{app.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div class="aspect-[4/3] rounded-xl border border-border bg-muted p-4">
                <div class="mx-auto h-full max-w-40 rounded-2xl border border-border bg-card p-3 shadow-sm">
                  <div class="h-full rounded-xl bg-background" aria-label={`${app.name} placeholder screenshot`}></div>
                </div>
              </div>
              <p class="text-sm leading-6 text-muted-foreground">{app.summary}</p>
              <div class="flex flex-wrap gap-2">
                {app.stack.slice(0, 4).map((item) => (
                  <Badge variant="secondary">{item}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>

  <section class="px-6 py-16">
    <div class="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
      {skillGroups.map((group) => (
        <Card>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge variant="outline">{item}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Delete unused starter component**

Run:

```bash
rg "Welcome" src
```

Expected: no references after the home page replacement.

Then delete `src/components/Welcome.astro`.

- [ ] **Step 3: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/pages/index.astro src/components/Welcome.astro
git commit -m "feat: build portfolio home page"
```

---

## Task 6: Apps Page

**Files:**

- Create: `src/pages/apps.astro`

- [ ] **Step 1: Create app showcase page**

Create `src/pages/apps.astro`:

```astro
---
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/layouts/Layout.astro";
import { apps } from "@/lib/portfolio";
---

<Layout
  title="Apps | Placeholder Developer"
  description="App showcase for Quick Panel Background Cropper and Let You Cook."
>
  <section class="px-6 py-16 sm:py-24">
    <div class="mx-auto flex max-w-6xl flex-col gap-4">
      <p class="text-sm font-medium text-muted-foreground">App shelf</p>
      <h1 class="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
        Two mobile products, shown like case notes on a coffee desk.
      </h1>
      <p class="max-w-2xl text-lg leading-8 text-muted-foreground">
        Placeholder descriptions for real app slots. Replace screenshots, store links, and deeper case studies when ready.
      </p>
    </div>
  </section>

  <section class="px-6 pb-20">
    <div class="mx-auto flex max-w-6xl flex-col gap-8">
      {apps.map((app, index) => (
        <Card className="overflow-hidden">
          <div class={`grid gap-0 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div class="bg-muted p-6 sm:p-10">
              <div class="mx-auto aspect-[9/16] max-w-64 rounded-[2rem] border border-border bg-card p-4 shadow-sm">
                <div class="flex h-full flex-col gap-3 rounded-[1.5rem] bg-background p-4">
                  <div class="h-5 rounded-full bg-muted"></div>
                  <div class="grid flex-1 gap-3">
                    <div class="rounded-xl bg-muted"></div>
                    <div class="rounded-xl bg-card"></div>
                    <div class="rounded-xl bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CardHeader>
                <CardDescription>{app.eyebrow}</CardDescription>
                <CardTitle className="text-3xl">{app.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <p class="text-base leading-7 text-muted-foreground">{app.summary}</p>
                <div class="flex flex-wrap gap-2">
                  {app.stack.map((item) => (
                    <Badge variant="secondary">{item}</Badge>
                  ))}
                </div>
                <Separator />
                <ul class="grid gap-3">
                  {app.notes.map((note) => (
                    <li class="rounded-lg bg-muted p-3 text-sm leading-6 text-muted-foreground">
                      {note}
                    </li>
                  ))}
                </ul>
                <div class="flex flex-wrap gap-3">
                  {app.links.map((link) => (
                    <Button asChild variant="outline">
                      <a href={link.href}>
                        {link.label}
                        <ExternalLink data-icon="inline-end" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/pages/apps.astro
git commit -m "feat: add app showcase page"
```

---

## Task 7: About Page

**Files:**

- Create: `src/pages/about.astro`

- [ ] **Step 1: Create about page**

Create `src/pages/about.astro`:

```astro
---
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/layouts/Layout.astro";
import { skillGroups, timelineItems, workingStyleItems } from "@/lib/portfolio";
---

<Layout
  title="About | Placeholder Developer"
  description="About a React frontend and Expo React Native developer."
>
  <section class="px-6 py-16 sm:py-24">
    <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div class="flex flex-col gap-4">
        <p class="text-sm font-medium text-muted-foreground">About</p>
        <h1 class="text-4xl font-semibold leading-tight sm:text-6xl">
          Frontend developer, mobile-app builder, practical UI finisher.
        </h1>
      </div>
      <div class="flex flex-col gap-5 text-lg leading-8 text-muted-foreground">
        <p>
          Placeholder Developer has 3+ years of experience building React interfaces and Expo React Native mobile apps, with a focus on responsive layouts, accessible controls, and polished product details.
        </p>
        <p>
          The work tends to sit where UI craft meets shipping reality: simple state, readable components, and flows that survive real devices.
        </p>
        <Button asChild className="w-fit" size="lg">
          <a href="mailto:hello@example.com">
            Start a conversation
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </div>
  </section>

  <section class="px-6 pb-20">
    <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Experience notes</CardTitle>
          <CardDescription>A compact timeline for the portfolio placeholder copy.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol class="flex flex-col gap-4">
            {timelineItems.map((item) => (
              <li class="rounded-lg bg-muted p-4">
                <p class="text-sm font-medium text-muted-foreground">{item.period}</p>
                <h2 class="mt-1 text-xl font-semibold">{item.title}</h2>
                <p class="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tool stack</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {skillGroups.map((group) => (
              <div class="flex flex-col gap-2">
                <h2 class="text-sm font-medium">{group.title}</h2>
                <div class="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge variant="outline">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Working style</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="flex flex-col gap-3">
              {workingStyleItems.map((item) => (
                <li class="text-sm leading-6 text-muted-foreground">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/pages/about.astro
git commit -m "feat: add about page"
```

---

## Task 8: Verification

**Files:**

- No planned file edits.

- [ ] **Step 1: Final build**

Run:

```bash
pnpm build
```

Expected: build passes.

- [ ] **Step 2: Start dev server**

Run:

```bash
pnpm astro dev --background
```

Expected: Astro starts in background mode and prints a local URL.

- [ ] **Step 3: Check pages**

Open:

- `/`
- `/apps`
- `/about`

Check:

- page titles match current context
- desktop header links work
- mobile `Sheet` opens from the side with dimmed background
- mobile `Sheet` closes and focus returns to the trigger
- no unwanted horizontal scroll
- placeholder phone frames keep stable dimensions
- keyboard tab order reaches nav, CTAs, and links

- [ ] **Step 4: Stop dev server**

Run:

```bash
pnpm astro dev stop
```

Expected: background dev server stops.

---

## Self-Review

- Spec coverage: covers multi-page structure, coffee-toned direction, shadcn components, mobile `Sheet`, placeholder content, two app names, accessibility, and verification.
- Placeholder scan: placeholder content is intentional portfolio copy, not missing implementation detail.
- Scope: excludes real screenshots, blog/CMS, contact backend, analytics, and theme toggle.
