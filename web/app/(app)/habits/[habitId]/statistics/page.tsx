"use client";

import { mockHabitsList } from "@/data/habits";
import { notFound, useParams } from "next/navigation";

export default function HabitStatisticsPage() {
  const { habitId } = useParams<{ habitId: string }>();
  const habit = mockHabitsList.find(h => h.id === habitId);

  if (!habit) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-full">
      <h1 className="text-2xl font-bold">{habit.title} Estatísticas</h1>
    </div>
  )
}