"use client";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockGroceriesList } from "@/data/groceries";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { Hamburger, Minus, Plus, Trash2Icon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface GroceryListItemOptions {
  groceryListId: string;
  itemId: string;
}

export function GroceryListItemOptionsOverlay({ groceryListId, itemId }: GroceryListItemOptions) {
  const groceryList = mockGroceriesList.find(list => list.id === groceryListId);
  const item = groceryList?.items.find(item => item.id === itemId);

  const router = useRouter();
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setQuantity(value);
  };


  if (isMobile) {
    return (
      <Drawer open={true} onOpenChange={() => router.back()}>
        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle>Gerenciar Item da Lista de Compras</DrawerTitle>
            <DrawerDescription>Gerencie as opções deste item da lista de compras</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="relative">
              <Input
                className="ps-4 h-12 font-semibold text-lg"
                value={item?.name}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-0 h-full px-3 py-2"
              >
                <Hamburger className="size-5.5" />
              </Button>
            </div>
            <div className="flex gap-2.5">
              <div className="group relative">
                <label
                  htmlFor={"quantity"}
                  className="absolute text-xs text-muted-foreground top-1.5 left-4 pointer-events-none transition-all duration-200"
                >
                  Quantidade
                </label>
                <Input
                  id={"quantity"}
                  className="h-12 w-44 font-semibold pt-6 pb-2 px-4 pe-20 text-sm"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex h-full items-center justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-11 w-10 p-0"
                    onClick={handleDecrement}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-11 w-10 p-0"
                    onClick={handleIncrement}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Input
                className="ps-4 h-12 font-semibold text-lg placeholder:font-medium"
                placeholder="Unidade"
                value={"kg"}
              />
            </div>
            <Button variant={"destructive"} className="w-full">
              <Trash2Icon className="h-4 w-4 me-2" />
              Remover
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={true} onOpenChange={() => router.back()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Gerenciar Item da Lista de Compras</SheetTitle>
          <SheetDescription>Gerencie as opções deste item da lista de compras</SheetDescription>
        </SheetHeader>
        <div className="mt-6 px-4 space-y-4">
          <div className="relative">
            <Input
              className="ps-4 h-12 font-semibold text-lg"
              value={item?.name}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-0 h-full px-3 py-2"
            >
              <Hamburger className="size-5.5" />
            </Button>
          </div>
          <div className="flex gap-2.5">
            <div className="group relative flex-1">
              <label
                htmlFor={"quantity-desktop"}
                className="absolute text-xs text-muted-foreground top-2 left-4 pointer-events-none transition-all duration-200"
              >
                Quantidade
              </label>
              <Input
                id={"quantity-desktop"}
                className="h-12 font-semibold pt-6 pb-2 px-4 pr-20 text-lg input"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder=""

              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-10 w-8 p-0"
                  onClick={handleDecrement}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-10 w-8 p-0"
                  onClick={handleIncrement}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Input
              className="ps-4 h-12 font-semibold text-lg w-20"
              value={"kg"}
            />
          </div>
          <Button variant={"destructive"} className="w-full">
            <Trash2Icon className="h-4 w-4 me-2" />
            Remover
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}