"use client";

import { HabitWeekProgressStatus } from "@/lib/types/habit";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface HabitWeekProgressProps {
  day: string;
  status: HabitWeekProgressStatus;
  taskId: string;
  habitId: string;
  startDate: string;
  endDate: string | null;
}

export function HabitWeekProgressItem({ day, status, startDate, endDate, taskId, habitId }: HabitWeekProgressProps) {
  const router = useRouter();

  function getDayStyle() {
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
        if (new Date(day) < new Date(startDate) || (endDate && new Date(day) >= new Date(endDate))) {
          return "bg-muted ring-2 ring-muted opacity-50 cursor-not-allowed";
        }
        return "bg-muted/70 ring-2 ring-muted/70";
      }
      default: {
        return "";
      }
    }
  }

  function handleOpenOptions(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${habitId}/tasks/${taskId}/options`);
  }

  return (
    <div className="flex flex-col gap-2" onClick={handleOpenOptions}>
      <p className="text-sm text-muted-foreground self-center select-none">
        {new Date(day + "T00:00:00").toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "").replace(/^\w/, c => c.toUpperCase())}
      </p>
      <div
        className={
          cn("flex items-center justify-center px-1 py-2 rounded-lg transition-all duration-250 cursor-pointer", getDayStyle())
        }
      >
        <span className="text-xs font-semibold select-none">{parseInt(day.split("-")[2], 10)}</span>
      </div>
    </div>
  )
}