"use client";

import { Tag } from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockListTags } from "@/data/tags";
import { useIsMobile } from "@/hooks/use-mobile";
import { PencilIcon, SquareArrowOutUpRightIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ResponsiveTagOptionsOverlayProps {
  tagId: string;
}

export function ResponsiveTagOptionsOverlay({ tagId }: ResponsiveTagOptionsOverlayProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const tag = mockListTags.find((tag) => tag.id === tagId);

  useEffect(() => {
    if (!open && pendingNavigation) {
      router.replace(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [open, pendingNavigation, router]);

  function handleViewDetails() {
    setPendingNavigation(`/tags/${tagId}`);
    setOpen(false);
  }

  function handleEdit() {
    setPendingNavigation(`/tags/${tagId}/edit`);
    setOpen(false);
  }

  function handleDelete() {
    setPendingNavigation(`/tags/${tagId}/delete`);
    setOpen(false);
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen && !pendingNavigation) {
      router.back();
    } else {
      setOpen(newOpen);
    }
  }

  const content = (
    <div className="p-4 space-y-3">
      <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleViewDetails}>
        <SquareArrowOutUpRightIcon size={24} />
        Visualizar Detalhes
      </Button>
      <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleEdit}>
        <PencilIcon size={24} />
        Editar
      </Button>
      <Button className="w-full justify-start items-center text-destructive" variant="outline" size="lg" onClick={handleDelete}>
        <Trash2Icon className="text-destructive" size={24} />
        Excluir
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Gerenciar Tag</DrawerTitle>
            <DrawerDescription>Gerencie as opções desta tag</DrawerDescription>
          </DrawerHeader>
          <div className="flex place-content-center py-2">
            <Tag color={tag?.color || "blue"} name={tag?.name || "tag"} />
          </div>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Gerenciar Tag</SheetTitle>
          <SheetDescription>Gerencie as opções desta tag</SheetDescription>
        </SheetHeader>
        <div className="flex place-content-center py-2">
          <Tag color={tag?.color || "blue"} name={tag?.name || "tag"} />
        </div>
        {content}
      </SheetContent>
    </Sheet>
  );
}
