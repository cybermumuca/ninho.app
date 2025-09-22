"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, ShoppingCart, Timer, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { memo, useMemo } from "react"

const navigationItems = [
  {
    label: "Agenda",
    href: "/agenda",
    icon: Calendar,
  },
  {
    label: "Hábitos",
    href: "/habits",
    icon: CheckSquare,
  },
  {
    label: "Listas",
    href: "/grocery-lists",
    icon: ShoppingCart,
  },
  {
    label: "Timer",
    href: "/timer",
    icon: Timer,
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
  },
] as const

const NavigationItem = memo(({
  item,
  isActive
}: {
  item: typeof navigationItems[number]
  isActive: boolean
}) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      prefetch={true}
      className={cn(
        "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors",
        "min-w-0 flex-1",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      <Icon className="size-5" />
      <span className="text-xs font-medium truncate">{item.label}</span>
    </Link>
  )
})

NavigationItem.displayName = "NavigationItem"

export const MobileNavigation = memo(() => {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const navigationElements = useMemo(() => {
    return navigationItems.map((item) => {
      const isActive = pathname.startsWith(item.href)

      return (
        <NavigationItem
          key={item.href}
          item={item}
          isActive={isActive}
        />
      )
    })
  }, [pathname])

  if (!isMobile) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex gap-1 items-center justify-around px-2 py-2">
        {navigationElements}
      </div>
    </nav>
  )
})

MobileNavigation.displayName = "MobileNavigation"