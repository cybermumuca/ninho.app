"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryColorClasses, getFrequencyDescription } from "@/lib/utils";
import { CalendarIcon, ChartNoAxesColumnDecreasingIcon, CircleCheckIcon, FlameIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { HabitWeekProgressItem } from "./habit-week-progress-item";
import { HabitFrequency, HabitType, HabitWeekProgress } from "@/lib/types/habit";
import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";

interface HabitCardProps {
  id: string;
  title: string;
  type: HabitType;
  frequency: HabitFrequency;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  streak: number;
  successRate: number;
  startDate: string;
  endDate: string | null;
  weekProgress: HabitWeekProgress[];
}

export function HabitCard({ id, title, type, frequency, category, weekProgress, streak, successRate, startDate, endDate }: HabitCardProps) {
  const router = useRouter();

  function handleOpenCalendar(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${id}/calendar`);
  }

  function handleOpenStatistics(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${id}/statistics`);
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${id}/edit`);
  }

  function handleOpenOptions() {
    router.push(`/habits/${id}/options`);
  }

  return (
    <Card className="p-0 flex flex-col gap-0 cursor-pointer" onClick={handleOpenOptions}>
      <CardHeader className="p-4 flex items-center justify-between rounded-xl">
        <div className="flex flex-col gap-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription
            className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(category.color)).join(" ")} max-w-min text-nowrap rounded-md font-semibold`}
          >
            {getFrequencyDescription(frequency)}
          </CardDescription>
        </div>
        <IconWrapper color={category.color}>
          <Icon icon={category.icon} />
        </IconWrapper>
      </CardHeader>
      <CardContent className="px-4 max-h-min pb-6">
        <div className="grid grid-cols-7 gap-3">
          {weekProgress.map((progress, index) => (
            <HabitWeekProgressItem
              key={progress.day + progress.status + index}
              day={progress.day}
              status={progress.status}
              taskId={progress.taskId}
              habitId={id}
              startDate={startDate}
              endDate={endDate}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t px-4 py-2 [.border-t]:py-2">
        <div className="flex gap-4 items-center flex-1">
          <div className="flex gap-1 items-center">
            <FlameIcon className={`size-5 ${getCategoryColorClasses(category.color).text} translate-y-[-1px]`} />
            <p className="text-base font-semibold">{streak}</p>
          </div>
          <div className="flex gap-1 items-center">
            <CircleCheckIcon className={`size-5 ${getCategoryColorClasses(category.color).text}`} />
            <p className="text-base font-semibold">{Math.round(successRate * 100) + "%"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground cursor-pointer"
            size="icon"
            onClick={handleOpenCalendar}
            aria-label="Abrir calendário do hábito"
          >
            <CalendarIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground cursor-pointer"
            size="icon"
            onClick={handleOpenStatistics}
            aria-label="Abrir estatísticas do hábito"
          >
            <ChartNoAxesColumnDecreasingIcon className="size-5" strokeWidth={3} />
          </Button>
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground cursor-pointer"
            size="icon"
            onClick={handleEdit}
            aria-label="Editar hábito"
          >
            <PencilIcon className="size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
