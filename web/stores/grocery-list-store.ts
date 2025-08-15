import { create } from 'zustand';
import { GroceryItem } from '@/data/groceries';

export type SortOption = 'categoria' | 'alfabeto';

interface GroceryListState {
  showPrices: boolean;
  sortBy: SortOption;
  collapsedCategories: Set<string>;
  showCheckedItems: boolean;

  setShowPrices: (show: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  toggleCategory: (category: string) => void;
  setShowCheckedItems: (show: boolean) => void;
  resetCollapsedCategories: () => void;

  markAllItems: (groceryListId: string) => void;
  unmarkAllItems: (groceryListId: string) => void;
}

export const useGroceryListStore = create<GroceryListState>((set, get) => ({
  showPrices: false,
  sortBy: 'categoria',
  collapsedCategories: new Set(),
  showCheckedItems: true,

  setShowPrices: (show) => set({ showPrices: show }),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleCategory: (category) => set((state) => {
    const newCollapsed = new Set(state.collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    return { collapsedCategories: newCollapsed };
  }),

  setShowCheckedItems: (show) => set({ showCheckedItems: show }),

  resetCollapsedCategories: () => set({ collapsedCategories: new Set() }),

  markAllItems: (groceryListId) => {
    console.log(`Marcar todos os itens da lista ${groceryListId}`);
  },

  unmarkAllItems: (groceryListId) => {
    console.log(`Desmarcar todos os itens da lista ${groceryListId}`);
  },
}));

export function groupItemsByCategory(items: GroceryItem[]) {
  const grouped = items.reduce((acc, item) => {
    const category = item.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
};

export function groupItemsAlphabetically(items: GroceryItem[]) {
  const grouped = items.reduce((acc, item) => {
    const firstLetter = item.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, items]) => [
      letter,
      items.sort((a, b) => a.name.localeCompare(b.name))
    ] as [string, GroceryItem[]]);
};
