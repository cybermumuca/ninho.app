"use client";

import { Button } from "@/components/ui/button";
import { mockGroceriesList } from "@/data/groceries";
import { ChevronLeft, CirclePlus, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function GroceryList({ params }: { params: Promise<{ id: string }> }) {
  const { id: groceryId } = use(params);
  const router = useRouter();

  const grocery = mockGroceriesList.find((list) => list.id === groceryId);

  return (
    <div className="min-h-dvh">
      <header className="flex justify-between items-center container mx-auto px-4 py-4">
        <div className="flex items-center justify-start gap-3">
          <Button className="-m-2 -p-2" variant="ghost" size="icon">
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">{grocery?.name}</h1>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="rounded-md p-2 -m-2 cursor-pointer"
            variant="ghost"
            size="icon"
          >
            <CirclePlus className="size-5" />
          </Button>
          <Button
            className="rounded-md p-2 -m-2 cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/grocery-lists/${groceryId}/menu`)}
          >
            <Menu className="size-5.5" />
          </Button>
        </div>
      </header>
    </div>
  );
}