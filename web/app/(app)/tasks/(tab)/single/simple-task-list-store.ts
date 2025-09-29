import { create } from "zustand/react";

export type GroupOption = "date" | "alphabet" | "none";
export type SortOption = "alphabet" | "estimatedDuration";
export type DateRangeOption = "DAY" | "WEEK" | "MONTH" | "ALL";

interface SimpleTaskListStore {
  showTaskCount: boolean;
  groupBy: GroupOption;
  sortBy: SortOption;
  dateRange: DateRangeOption;
  collapsedGroups: Set<string>;

  setShowTaskCount: (show: boolean) => void;
  setGroupBy: (group: GroupOption) => void;
  setSortBy: (sort: SortOption) => void;
  setDateRange: (range: DateRangeOption) => void;
  toggleGroup: (group: string) => void;
  resetCollapsedGroups: () => void;
}

export const useSimpleTaskListStore = create<SimpleTaskListStore>((set) => ({
  showTaskCount: true,
  groupBy: "date",
  sortBy: "estimatedDuration",
  dateRange: "WEEK",
  collapsedGroups: new Set(),

  setShowTaskCount: (show) => set({ showTaskCount: show }),

  setGroupBy: (group) => set({ groupBy: group }),

  setSortBy: (sort) => set({ sortBy: sort }),

  setDateRange: (range) => set({ dateRange: range }),

  toggleGroup: (group) => set((state) => {
    const collapsedGroups = new Set(state.collapsedGroups);

    if (collapsedGroups.has(group)) {
      collapsedGroups.delete(group);
    } else {
      collapsedGroups.add(group);
    }

    return { collapsedGroups };
  }),

  resetCollapsedGroups: () => set({ collapsedGroups: new Set() }),
}));

