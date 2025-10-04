"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { CirclePlusIcon } from "lucide-react"

interface FABAction {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}

export function useFABAction(): FABAction | null {
  const pathname = usePathname()

  return useMemo(() => {
    if (pathname.startsWith("/tasks")) {
      return {
        icon: CirclePlusIcon,
        href: "/tasks/add/options",
        label: "Criar tarefa"
      }
    }

    return null
  }, [pathname])
}