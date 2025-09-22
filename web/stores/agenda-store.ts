import { create } from 'zustand';

interface AgendaState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useAgendaStore = create<AgendaState>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

// Seletor útil para performance
export const useSelectedDate = () => useAgendaStore((state) => state.selectedDate);
