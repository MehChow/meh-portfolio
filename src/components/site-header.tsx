import { useEffect, useState } from "react"
import { Menu, Moon, Sun } from "lucide-react"

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

const THEME_COOKIE = "theme"
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const DARK_THEME_COLOR = "#241f1b"
const LIGHT_THEME_COLOR = "#f4ede2"

function isActive(href: string, currentPath: string) {
  if (href === "/") return currentPath === "/"
  return currentPath.startsWith(href)
}

export default function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const nextTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setTheme(nextTheme)
  }, [])

  function applyTheme(nextTheme: "dark" | "light") {
    const root = document.documentElement
    const themeColor = document.querySelector('meta[name="theme-color"]')
    const isDark = nextTheme === "dark"

    root.classList.toggle("dark", isDark)
    root.style.colorScheme = nextTheme
    themeColor?.setAttribute("content", isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR)
    document.cookie = `${THEME_COOKIE}=${nextTheme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`
    setTheme(nextTheme)
  }

  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark")
  }

  const nextThemeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  const ThemeIcon = theme === "dark" ? Sun : Moon

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:px-6">
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
                <a href={item.href} aria-current={active ? "page" : undefined}>{item.label}</a>
              </Button>
            )
          })}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={nextThemeLabel}
            title={nextThemeLabel}
            onClick={toggleTheme}
          >
            <ThemeIcon aria-hidden="true" />
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={nextThemeLabel}
            title={nextThemeLabel}
            onClick={toggleTheme}
          >
            <ThemeIcon aria-hidden="true" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu aria-hidden="true" />
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
