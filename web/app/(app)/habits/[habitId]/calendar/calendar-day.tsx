"use client";

import { HabitWeekProgressStatus } from "@/lib/types/habit";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CalendarDayProps {
  taskId: string;
  habitId: string;
  date: string;
  startDate: string;
  endDate: string | null;
  status: HabitWeekProgressStatus;
  isInFrequencyRange: boolean;
  isCurrentMonth: boolean;
}

export function CalendarDay({ habitId, taskId, date, isCurrentMonth, status, startDate, endDate, isInFrequencyRange }: CalendarDayProps) {
  const router = useRouter();

  function handleOpenOptions(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${habitId}/tasks/${taskId}/options`);
  }

  function getDayStyle() {
    if (!isCurrentMonth) {
      return "text-muted-foreground/50 cursor-default";
    }

    switch (status) {
      case "SUCCESS": {
        return "ring-2 ring-emerald-500 bg-emerald-800/30";
      }
      case "FAILURE": {
        return "ring-2 ring-red-500 bg-red-800/30";
      }
      case "SKIPPED": {
        return "ring-2 ring-blue-500 bg-blue-800/30";
      }
      case "PENDING": {
        return "ring-2 ring-yellow-500 bg-yellow-800/30";
      }
      case "NONE": {
        if (new Date(date) < new Date(startDate) || (endDate && new Date(date) >= new Date(endDate))) {
          return "text-foreground";
        }

        return "text-foreground";
      }
    }
  }

  return (
    <button
      className={cn("flex items-center justify-center px-1 py-2 rounded-lg transition-all duration-250 cursor-pointer", getDayStyle())}
      onClick={handleOpenOptions}
      disabled={isInFrequencyRange === false}
    >
      <span className="text-sm font-semibold select-none">{parseInt(date.split("-")[2], 10)}</span>
    </button>
  )
}