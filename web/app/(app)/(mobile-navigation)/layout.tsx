"use client"

import { MobileNavigation } from "@/components/mobile-navigation"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { useFABAction } from "@/hooks/use-fab-action"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function MobileNavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMobile = useIsMobile()
  const fabAction = useFABAction()

  return (
    <>
      {children}
      {isMobile && fabAction && (
        <FloatingActionButton
          position="bottom-right"
          className="mb-20 rounded-lg"
          asChild
        >
          <Link href={fabAction.href} aria-label={fabAction.label}>
            <fabAction.icon className="size-6" />
          </Link>
        </FloatingActionButton>
      )}
      <MobileNavigation />
    </>
  )
}
