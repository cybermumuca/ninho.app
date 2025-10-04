"use client";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

export function ResponsiveAddTaskOptionsOverlay() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const content = (
    <div></div>
  )

  if (isMobile) {
    return (
      <Drawer open={true} onOpenChange={() => router.back()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar Tarefa</DrawerTitle>
            <DrawerDescription>Selecione as opções para adicionar uma nova tarefa</DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }
}