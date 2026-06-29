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
