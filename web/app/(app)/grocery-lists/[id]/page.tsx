"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroceryListItem } from "@/app/(app)/grocery-lists/[id]/grocery-list-item";
import { mockGroceriesList } from "@/data/groceries";
import { ChevronLeftIcon, CirclePlusIcon, MenuIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { formatCurrency } from "@/lib/utils";
import { useGroceryListStore, groupItemsByCategory, groupItemsAlphabetically } from "@/stores/grocery-list-store";

export default function GroceryList({ params }: { params: Promise<{ id: string }> }) {
  const { id: groceryListId } = use(params);
  const router = useRouter();

  const {
    showPrices,
    sortBy,
    collapsedCategories,
    toggleCategory,
  } = useGroceryListStore();

  const groceryList = mockGroceriesList.find((list) => list.id === groceryListId);

  if (!groceryList) {
    return notFound();
  }

  const checkedItems = groceryList.items.filter(item => item.isChecked);
  const uncheckedItems = groceryList.items.filter(item => !item.isChecked);

  const totalCheckedPrice = checkedItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalUncheckedPrice = uncheckedItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalPrice = totalCheckedPrice + totalUncheckedPrice;

  const groupItems = sortBy === 'categoria' ? groupItemsByCategory : groupItemsAlphabetically;

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="flex flex-col container mx-auto bg-amber-700 p-4 gap-12 rounded-b-lg">
        <div className="flex justify-between items-center w-full mt-0.5">
          <Button
            className="-m-2 p-2"
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="size-6" />
          </Button>
          <div className="flex items-center gap-5">
            <Button
              className="rounded-md p-2 -m-2 cursor-pointer"
              variant="ghost"
              size="icon"
            >
              <CirclePlusIcon className="size-5" />
            </Button>
            <Button
              className="rounded-md p-2 -m-2 cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/grocery-lists/${groceryListId}/menu`)}
            >
              <MenuIcon className="size-5.5" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center flex-1 gap-2">
          <h1 className="text-2xl font-semibold">{groceryList.name}</h1>
          <div className="flex items-center gap-2">
            {groceryList.collaborators.map((collaborator) => (
              <div key={collaborator.id} className="relative">
                <Avatar className="size-8 border-2 border-white/20">
                  {collaborator.avatar ? (
                    <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  ) : (
                    <AvatarFallback className="bg-white/10 text-white text-xs font-medium">
                      {collaborator.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                {collaborator.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
            ))}
            <span className="text-sm text-foreground ml-2">
              {groceryList.collaborators.filter(c => c.isOnline).length} online
            </span>
          </div>
        </div>
      </header>
      <main className="flex flex-col container mx-auto flex-1">
        {groupItems(groceryList.items).map(([group, items]) => {
          const isCollapsed = collapsedCategories.has(group);

          return (
            <div key={group}>
              <Button
                variant="ghost"
                onClick={() => toggleCategory(group)}
                className="flex items-center justify-between w-full py-3 rounded-none bg-muted/50 hover:bg-muted h-auto"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-base ms-2">{group}</span>
                  <span className="text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>
                {isCollapsed ? (
                  <ChevronRightIcon className="size-4 text-muted-foreground me-2" />
                ) : (
                  <ChevronDownIcon className="size-4 text-muted-foreground me-2" />
                )}
              </Button>

              {!isCollapsed && (
                <div className="bg-background">
                  {items.map((item) => (
                    <div key={item.id}>
                      <GroceryListItem
                        id={item.id}
                        name={item.name}
                        isChecked={item.isChecked}
                        groceryListId={groceryListId}
                        quantity={item.quantity}
                        price={item.price}
                        onToggleCheck={() => { }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {showPrices && (
          <footer className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Total não marcado:</span>
              <span className="font-medium">{formatCurrency(totalUncheckedPrice)}</span>
            </div>
            {checkedItems.length > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Total marcado:</span>
                <span className="font-medium text-muted-foreground">{formatCurrency(totalCheckedPrice)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-semibold">Total geral:</span>
              <span className="font-semibold text-lg">{formatCurrency(totalPrice)}</span>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}