"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResponsiveRoomListItemOptionsOverlayProps {
  roomId: string;
}

export function ResponsiveRoomListItemOptionsOverlay({ roomId }: ResponsiveRoomListItemOptionsOverlayProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const content = (
    <div className="p-4 space-y-3">
      <Button className="w-full justify-start items-center" variant="outline" size="lg">
        <PencilIcon size={24} />
        Editar
      </Button>
      <Button className="w-full justify-start items-center text-destructive" variant="outline" size="lg">
        <Trash2Icon className="text-destructive" size={24} />
        Excluir
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={true} onOpenChange={() => router.back()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Gerenciar Cômodo</DrawerTitle>
            <DrawerDescription>Gerencie as opções deste cômodo</DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={true} onOpenChange={() => router.back()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Gerenciar Cômodo</SheetTitle>
          <SheetDescription>Gerencie as opções deste cômodo</SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
}
