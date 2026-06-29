# Personal Portfolio Design

Date: 2026-06-29
Project: `meh-portfolio`

## Goal

Build a responsive multi-page Astro portfolio for a React/frontend developer with 3+ years of web and Expo React Native experience. The site should feel chill, lo-fi, and coffee-toned while still showing enough product depth to avoid a thin one-page resume.

Real app names:

- Quick Panel Background Cropper
- Let You Cook

All other identity, links, descriptions, stats, and screenshots may use polished placeholder content.

## Direction

Use the "Coffee Desk Portfolio" direction:

- Warm brown shadcn token system from `src/styles/global.css`
- Calm workbench layout with app case cards, phone screenshot frames, concise notes, and stack badges
- Multi-page structure with a persistent top nav
- No heavy animation, no decorative blobs, no generic SaaS gradient hero

The signature element is a coffee-desk case card: a phone-like screenshot frame paired with short shipping notes, tech badges, and a compact description.

## Pages

### Home (`/`)

Purpose: quickly explain who the developer is and route visitors to apps or contact.

Content:

- Hero intro with placeholder name, role, and short positioning around React, frontend, and Expo mobile development
- Primary CTA to `/apps`
- Secondary placeholder contact link
- Featured apps preview for both apps
- Skill clusters for frontend, mobile, and product polish
- Small "currently focused on" section with placeholder text

### Apps (`/apps`)

Purpose: showcase two shipped app projects with enough detail to feel credible.

Content for each app:

- App name
- Placeholder screenshot frame
- Placeholder description
- Tech badges
- Three concise feature/build notes
- Placeholder links for case study, source, or store

The two apps should not be identical cards. Quick Panel Background Cropper should lean mobile utility and customization. Let You Cook should lean recipe/cooking flow and friendly consumer UI.

### About (`/about`)

Purpose: provide developer background without turning into a full resume.

Content:

- Placeholder profile paragraph
- Experience timeline using broad milestones
- Tool stack grouped by frontend, mobile, styling, and workflow
- Working style notes
- Contact CTA

## Navigation

Desktop:

- Top header with brand/name on the left and links to Home, Apps, About, and Contact on the right
- Place a theme toggle icon immediately after the Contact link
- Use real anchors for navigation, not click handlers
- Active page should be visually indicated and not rely only on color

Mobile:

- Use shadcn `Sheet` for the menu
- Keep the theme toggle visible beside the hamburger trigger, outside the Sheet
- Trigger is an icon button with an accessible label
- Sheet slides from the side with a dimmed background overlay
- Include a visible title for screen readers and focus management
- Menu links remain normal `<a>` elements
- Focus returns to the trigger after closing

## Components

Use shadcn components where they remove real work:

- Existing `Button`
- Add `Card` for project and content sections
- Add `Badge` for stacks/status tags
- Add `Separator` for quiet structural breaks
- Add `Sheet` for mobile navigation

Avoid adding dropdowns, command palettes, carousels, charts, or form components. They do not serve the current portfolio.

## Styling System

Keep the current Tailwind v4 and shadcn setup:

- `radix-nova`
- lucide icons
- `src/styles/global.css` as the theme source
- Oxanium as the existing typeface

Use semantic tokens such as `bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, and `text-primary-foreground`.

Theme behavior:

- Dark mode remains the current default visual treatment
- Light mode should shift to a warm creme / light-coffee palette rather than plain white
- Theme tokens stay in `src/styles/global.css`
- Light mode becomes the base token set, while `.dark` preserves the current darker token set
- `html` should update both the `dark` class and `color-scheme`
- Theme choice persists in a `theme=dark|light` cookie
- A tiny inline script in the document head should apply the stored theme before paint to avoid a flash of the wrong theme
- The toggle lives inside the existing hydrated header component rather than creating another island

Global polish:

- Add `scroll-behavior`, heading `scroll-margin-top`, root `touch-action: manipulation`, and visible `:focus-visible` styles
- Add a skip-to-content link
- Set `<title>` per page
- Use explicit image/frame dimensions to avoid layout shift
- Respect `prefers-reduced-motion`

## Responsive Behavior

Breakpoints:

- Mobile: stacked sections, sheet navigation, full-width cards
- Tablet/laptop: two-column app previews where space allows
- Desktop/ultra-wide: constrained content width so text does not sprawl

All text containers must handle long placeholder or future real content with wrapping, `min-w-0`, and sensible max widths.

## Data Shape

Keep shared app/project content in one small data module because both Home and Apps need the same two app summaries. Keep page-only text local to each Astro page.

## Accessibility

- Use semantic landmarks: header, nav, main, section, footer
- One `h1` per page, hierarchical headings after that
- All icon-only buttons need `aria-label`
- Theme toggle label should switch between "Switch to light mode" and "Switch to dark mode"
- Visible focus rings on links and buttons
- Mobile Sheet must preserve keyboard navigation and focus behavior
- Links must be usable with Cmd/Ctrl/middle-click
- Do not disable browser zoom

## Verification

Minimum checks before completion:

- `pnpm build`
- Visual check at mobile and desktop widths
- Confirm mobile Sheet opens, dims background, closes, and returns focus
- Confirm the theme toggle appears after Contact on desktop and beside the hamburger on mobile
- Confirm theme selection persists across reloads and page navigation
- Confirm initial paint uses the stored theme without a visible flash
- Confirm no obvious overflow, clipped text, or unwanted horizontal scroll

## Out of Scope

- Real screenshots
- Real personal name, biography, social links, and app URLs
- Blog/CMS
- Contact form backend
- Analytics
