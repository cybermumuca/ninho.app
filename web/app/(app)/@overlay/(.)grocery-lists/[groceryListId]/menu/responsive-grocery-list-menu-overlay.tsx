"use client";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowDownAZIcon, ListChecksIcon, ListRestartIcon, ArrowDown01Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGroceryListStore } from "@/stores/grocery-list-store";

interface ResponsiveGroceryListMenuOverlayProps {
  groceryListId: string;
}

export function ResponsiveGroceryListMenuOverlay({ groceryListId }: ResponsiveGroceryListMenuOverlayProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const {
    showPrices,
    sortBy,
    setShowPrices,
    setSortBy,
    markAllItems,
    unmarkAllItems,
    resetCollapsedCategories
  } = useGroceryListStore();

  function handleMarkAll() {
    markAllItems(groceryListId);
  }

  function handleUnmarkAll() {
    unmarkAllItems(groceryListId);
  }

  function handleSortChange(newSort: typeof sortBy) {
    setSortBy(newSort);
    resetCollapsedCategories();
  }

  const content = (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Ações</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="justify-start"
            onClick={handleMarkAll}
            size="lg"
          >
            <ListChecksIcon className="size-5" />
            Marcar todos os itens
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={handleUnmarkAll}
            size="lg"
          >
            <ListRestartIcon className="size-5" />
            Desmarcar todos os itens
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Exibição</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-prices" className="text-sm font-normal">
            Mostrar preços
          </Label>
          <Switch
            id="show-prices"
            checked={showPrices}
            onCheckedChange={setShowPrices}
          />
        </div>
      </div>

      {/* Ordenação */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Ordenar por</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={sortBy === "categoria" ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleSortChange("categoria")}
            size="lg"
          >
            <ArrowDown01Icon className="size-5" />
            Categoria
          </Button>
          <Button
            variant={sortBy === "alfabeto" ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleSortChange("alfabeto")}
            size="lg"
          >
            <ArrowDownAZIcon className="size-5" />
            Alfabeto
          </Button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return <Drawer open={true} onOpenChange={() => router.back()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Gerenciar Lista de Compras</DrawerTitle>
          <DrawerDescription>Gerencie as opções desta lista de compras</DrawerDescription>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>;
  }

  return (
    <Sheet open={true} onOpenChange={() => router.back()}>
      <SheetContent className="min-w-md">
        <SheetHeader>
          <SheetTitle>Gerenciar Lista de Compras</SheetTitle>
          <SheetDescription>Gerencie as opções desta lista de compras</SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  )
}