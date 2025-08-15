"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useGroceryListStore } from "@/stores/grocery-list-store";
import { CheckIcon, CircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GroceryListItemProps {
  id: string;
  name: string;
  isChecked: boolean;
  groceryListId: string;
  quantity?: number;
  price?: number;
  onToggleCheck?: (itemId: string, isChecked: boolean) => void;
}

export function GroceryListItem({
  id,
  name,
  isChecked,
  groceryListId,
  quantity,
  price,
  onToggleCheck
}: GroceryListItemProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(isChecked);

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onToggleCheck?.(id, newCheckedState);
  };

  function openOptions() {
    router.push(`/grocery-lists/${groceryListId}/item/${id}/options`);
  }

  const { showPrices } = useGroceryListStore();

  return (
    <div className={`flex items-center justify-between p-4 ${checked ? 'opacity-60' : ''}`} onClick={openOptions}>
      <div className="flex items-center gap-3 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-transparent"
          onClick={handleToggle}
        >
          {checked ? (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
              <CheckIcon className="size-4.5 text-white" />
            </div>
          ) : (
            <CircleIcon className="size-5 text-blue-500 stroke-2" />
          )}
        </Button>
        <div className="flex flex-col -space-y-0.5">
          <span className="text-base text-foreground">
            {name}
          </span>
          {checked && (
            <span className="text-xs text-muted-foreground">
              Marcado por <span className="font-bold">Samuel</span> - <span>5 min atrás</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {quantity && quantity > 1 && (
          <span className="text-sm text-muted-foreground font-medium">
            {quantity}
          </span>
        )}
        {showPrices && (
          <span className={`text-sm font-medium text-muted-foreground`}>
            {formatCurrency(price || 0)}
          </span>
        )}
      </div>
    </div>
  );
}
