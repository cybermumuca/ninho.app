"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockCategoryList } from "@/data/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  PencilIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
  DollarSign,
  Heart,
  Briefcase,
  User,
  Book,
  Sun,
  Plane,
  MoreHorizontal
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ResponsiveCategoryOptionsOverlayProps {
  categoryId: string;
}

const iconMap = {
  "dollar-sign": DollarSign,
  heart: Heart,
  briefcase: Briefcase,
  user: User,
  book: Book,
  sun: Sun,
  airplane: Plane,
  "more-horizontal": MoreHorizontal,
};

const colorMap = {
  blue: "bg-blue-700/30 text-blue-400 border-blue-900",
  green: "bg-green-700/30 text-green-400 border-green-900",
  red: "bg-red-700/30 text-red-400 border-red-900",
  purple: "bg-purple-700/30 text-purple-400 border-purple-900",
  yellow: "bg-yellow-700/30 text-yellow-400 border-yellow-900",
  orange: "bg-orange-700/30 text-orange-400 border-orange-900",
  pink: "bg-pink-700/30 text-pink-400 border-pink-900",
  indigo: "bg-indigo-700/30 text-indigo-400 border-indigo-900",
  amber: "bg-amber-700/30 text-amber-400 border-amber-900",
  gray: "bg-gray-700/30 text-gray-400 border-gray-900",
};

interface ResponsiveCategoryOptionsOverlayProps {
  categoryId: string;
}

export function ResponsiveCategoryOptionsOverlay({ categoryId }: ResponsiveCategoryOptionsOverlayProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const category = mockCategoryList.find((category) => category.id === categoryId);

  // Verifica se a categoria está arquivada baseado no campo archivedAt
  const isArchived = category ? category.archivedAt !== null : false;

  useEffect(() => {
    if (!open && pendingNavigation) {
      router.replace(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [open, pendingNavigation, router]);

  function handleViewDetails() {
    setPendingNavigation(`/categories/${categoryId}`);
    setOpen(false);
  }

  function handleEdit() {
    setPendingNavigation(`/categories/${categoryId}/edit`);
    setOpen(false);
  }

  function handleArchive() {
    setPendingNavigation(`/categories/${categoryId}/archive`);
    setOpen(false);
  }

  function handleRestore() {
    setPendingNavigation(`/categories/${categoryId}/restore`);
    setOpen(false);
  }

  function handleDelete() {
    setPendingNavigation(`/categories/${categoryId}/delete`);
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
      {!isArchived && (
        <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleEdit}>
          <PencilIcon size={24} />
          Editar
        </Button>
      )}

      {!isArchived ? (
        <Button className="w-full justify-start items-center text-emerald-500" variant="outline" size="lg" onClick={handleArchive}>
          <ArchiveIcon size={24} />
          Arquivar
        </Button>
      ) : (
        <Button className="w-full justify-start items-center text-emerald-500" variant="outline" size="lg" onClick={handleRestore}>
          <ArchiveRestoreIcon size={24} />
          Restaurar
        </Button>
      )}

      {isArchived && (
        <Button className="w-full justify-start items-center text-destructive" variant="outline" size="lg" onClick={handleDelete}>
          <Trash2Icon className="text-destructive" size={24} />
          Deletar
        </Button>
      )}
    </div>
  );

  const categoryIcon = category?.icon;
  const categoryColor = category?.color;
  const categoryName = category?.name;

  const IconComponent = iconMap[categoryIcon as keyof typeof iconMap] || MoreHorizontal;
  const colorClass = colorMap[categoryColor as keyof typeof colorMap] || colorMap.blue;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Gerenciar Categoria</DrawerTitle>
            <DrawerDescription>
              {isArchived ? "Esta categoria está arquivada" : "Gerencie as opções desta categoria"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex place-content-center py-4">
            <div className="flex flex-col items-center">
              <div className={`rounded-lg ${colorClass} flex items-center justify-center p-3 border-2`}>
                <IconComponent className="size-8" />
              </div>
              <span className="font-medium mt-2">{categoryName || "Categoria"}</span>
            </div>
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
          <SheetTitle>Gerenciar Categoria</SheetTitle>
          <SheetDescription>
            {isArchived ? "Esta categoria está arquivada" : "Gerencie as opções desta categoria"}
          </SheetDescription>
        </SheetHeader>
        <div className="flex place-content-center py-4">
          <div className="flex flex-col items-center">
            <div className={`rounded-lg ${colorClass} flex items-center justify-center p-3 border-2`}>
              <IconComponent className="size-8" />
            </div>
            <span className="font-medium mt-2">{categoryName || "Categoria"}</span>
          </div>
        </div>
        {content}
      </SheetContent>
    </Sheet>
  );
}
