"use client"

import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { Plus, Calendar, CheckSquare, ShoppingCart, Home as HomeIcon, Tag } from "lucide-react"

interface FABAction {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

export function useFABAction(): FABAction | null {
  const pathname = usePathname()
  const router = useRouter()

  return useMemo(() => {
    if (pathname.startsWith("/habits")) {
      return {
        icon: CheckSquare,
        href: "/habits/add",
        label: "Criar hábito"
      }
    }

    if (pathname.startsWith("/grocery-lists")) {
      return {
        icon: ShoppingCart,
        href: "/grocery-lists/add",
        label: "Criar lista"
      }
    }

    if (pathname.startsWith("/tasks")) {
      return {
        icon: Calendar,
        href: "/tasks/add",
        label: "Criar tarefa"
      }
    }

    if (pathname.startsWith("/rooms")) {
      return {
        icon: HomeIcon,
        href: "/rooms/add",
        label: "Criar cômodo"
      }
    }

    if (pathname.startsWith("/categories")) {
      return {
        icon: Plus,
        href: "/categories/add",
        label: "Criar categoria"
      }
    }

    if (pathname.startsWith("/tags")) {
      return {
        icon: Tag,
        href: "/tags/add",
        label: "Criar tag"
      }
    }

    if (pathname.startsWith("/agenda")) {
      return {
        icon: Calendar,
        href: "/agenda/options",
        label: "Opções da agenda"
      }
    }

    // Padrão: null (não mostra FAB)
    return null
  }, [pathname])
}