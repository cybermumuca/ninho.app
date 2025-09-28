import { Task } from "@/lib/types/task";
import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SortOption } from "./single/simple-task-list-store";

function formatDate(dateString: string): string {
  const date = parseISO(dateString);

  if (isYesterday(date)) {
    return "Ontem";
  }

  if (isToday(date)) {
    return "Hoje";
  }

  if (isTomorrow(date)) {
    const day = format(date, 'd', { locale: ptBR });
    const month = format(date, 'MMMM', { locale: ptBR });
    return `Amanhã, dia ${day} de ${month}`;
  }

  const dayOfWeek = format(date, 'EEEE', { locale: ptBR });
  const day = format(date, 'd', { locale: ptBR });
  const month = format(date, 'MMMM', { locale: ptBR });

  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return `${capitalizedDayOfWeek}, dia ${day} de ${month}`;
}

export function groupItemsByDate(items: Task[]) {
  const grouped = items.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, Task[]>);

  return Object.entries(grouped)
    .map(([date, items]) => [formatDate(date), items] as [string, Task[]]);
}

export function groupItemsAlphabetically(items: Task[]) {
  const grouped = items.reduce((acc, item) => {
    const firstLetter = item.title.charAt(0).toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    acc[firstLetter].push(item);

    return acc;
  }, {} as Record<string, Task[]>);

  return Object.entries(grouped)
    .map(([letter, items]) => [letter, items] as [string, Task[]]);
}

export function sortTasks(tasks: Task[], sortBy: SortOption): Task[] {
  const sortedTasks = [...tasks];

  switch (sortBy) {
    case "alphabet":
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    case "estimatedDuration":
      return sortedTasks.sort((a, b) => (a.estimatedDuration || 0).toString().localeCompare((b.estimatedDuration || 0).toString()));
    default:
      return sortedTasks;
  }
}