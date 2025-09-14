"use client";

import { Button } from "@/components/ui/button";
import { mockHabitsList } from "@/data/habits";
import { ChevronLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { HabitCardIcon } from "../habit-icon";
import { cn, getCategoryColorClasses } from "@/lib/utils";

export function HabitHeader() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.habitId as string;
  const habit = mockHabitsList.find((habit) => habit.id === habitId);

  return (
    <div className="flex justify-between items-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="-m-2 p-2"
        >
          <ChevronLeftIcon className="size-6" />
        </Button>
        <h1 className="text-xl font-bold">{habit?.title}</h1>
      </div>
      <div className={cn(getCategoryColorClasses(habit?.category.color || "gray").text, "rounded-lg bg-muted/30 p-2")}>
        <HabitCardIcon icon={habit?.category.icon || ""} />
      </div>
    </div>
  )
}