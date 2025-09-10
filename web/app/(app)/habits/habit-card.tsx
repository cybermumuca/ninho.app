"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getCategoryColorClasses, getFrequencyDescription } from "@/lib/utils";
import { CalendarIcon, ChartNoAxesColumnDecreasingIcon, CircleCheckIcon, DumbbellIcon, FlameIcon, MusicIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type DAILY_FREQUENCY = {
  type: "DAILY";
}

type PERIOD_COUNT_FREQUENCY = {
  type: "PERIOD_COUNT";
  count: number;
  period: "WEEK" | "MONTH" | "YEAR";
}

interface HabitCardProps {
  id: string;
  title: string;
  type: "SUCCESS_FAILURE" | "TIMED";
  frequency: DAILY_FREQUENCY | PERIOD_COUNT_FREQUENCY;
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
  weekProgress: {
    day: string;
    status: "SUCCESS" | "FAILURE" | "SKIPPED" | "PENDING";
    goal?: string;
    achieved?: string;
  }[];
}

const colorMap = {
  "purple": {
    border: "border-purple-900",
    text: "text-purple-400",
    bg: "bg-purple-700/30",
  },
  "red": {
    border: "border-red-900",
    text: "text-red-400",
    bg: "bg-red-700/30",
  },
  "blue": {
    border: "border-blue-900",
    text: "text-blue-400",
    bg: "bg-blue-700/30",
  },
  "green": {
    border: "border-green-900",
    text: "text-green-400",
    bg: "bg-green-700/30",
  },
  "yellow": {
    border: "border-yellow-900",
    text: "text-yellow-400",
    bg: "bg-yellow-700/30",
  },
  "pink": {
    border: "border-pink-900",
    text: "text-pink-400",
    bg: "bg-pink-700/30",
  },
  "orange": {
    border: "border-orange-900",
    text: "text-orange-400",
    bg: "bg-orange-700/30",
  },
  "teal": {
    border: "border-teal-900",
    text: "text-teal-400",
    bg: "bg-teal-700/30",
  },
  "cyan": {
    border: "border-cyan-900",
    text: "text-cyan-400",
    bg: "bg-cyan-700/30",
  },
  "amber": {
    border: "border-amber-900",
    text: "text-amber-400",
    bg: "bg-amber-700/30",
  },
  "emerald": {
    border: "border-emerald-900",
    text: "text-emerald-400",
    bg: "bg-emerald-700/30",
  },
  "fuchsia": {
    border: "border-fuchsia-900",
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-700/30",
  },
  "lime": {
    border: "border-lime-900",
    text: "text-lime-400",
    bg: "bg-lime-700/30",
  },
  "indigo": {
    border: "border-indigo-900",
    text: "text-indigo-400",
    bg: "bg-indigo-700/30",
  },
  "gray": {
    border: "border-gray-900",
    text: "text-gray-400",
    bg: "bg-gray-700/30",
  },
}

export function HabitCard({ id, title, frequency, category, weekProgress, streak, successRate }: HabitCardProps) {
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

  return (
    <Card className="p-0 flex flex-col gap-0" onClick={() => router.push(`/habits/${id}/options`)}>
      <CardHeader className="p-4 flex items-center justify-between rounded-xl">
        <div className="flex flex-col gap-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription
            className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(category.color)).join(" ")} max-w-min text-nowrap rounded-md font-semibold`}
          >
            {getFrequencyDescription(frequency)}
          </CardDescription>
        </div>
        <div className={`rounded-lg ${Object.values(getCategoryColorClasses(category.color)).join(" ")} flex items-center justify-center p-2 border-2`}>
          <HabitCardIcon icon={category.icon} />
        </div>
      </CardHeader>
      <CardContent className="px-4 max-h-min pb-6">
        <div className="grid grid-cols-7 gap-3">
          {weekProgress.map((progress, index) => (
            <div className="flex flex-col gap-2" key={progress.day + progress.status + index}>
              <p className="text-sm text-muted-foreground self-center">
                {new Date(progress.day + "T00:00:00").toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "").replace(/^\w/, c => c.toUpperCase())}
              </p>
              <div
                className={
                  cn("flex items-center justify-center px-1 py-2 rounded-lg transition-all duration-250 cursor-pointer ring-2 ring-muted",
                    progress.status === "PENDING" && "ring-2 ring-yellow-400 bg-yellow-700/30"
                    || progress.status === "SUCCESS" && "ring-2 ring-emerald-400 bg-emerald-700/30"
                    || progress.status === "FAILURE" && "ring-2 ring-red-400 bg-red-700/30"
                    || progress.status === "SKIPPED" && "ring-2 ring-blue-400 bg-blue-700/30"
                  )
                }
              >
                <span className="text-xs font-semibold">{parseInt(progress.day.split("-")[2], 10)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t px-4 py-2 [.border-t]:py-2">
        <div className="flex gap-4 items-center flex-1">
          <div className="flex gap-1 items-center">
            <FlameIcon className={`size-5 ${colorMap[category.color as keyof typeof colorMap].text} translate-y-[-1px]`} />
            <p className="text-base font-semibold">{streak}</p>
          </div>
          <div className="flex gap-1 items-center">
            <CircleCheckIcon className={`size-5 ${colorMap[category.color as keyof typeof colorMap].text}`} />
            <p className="text-base font-semibold">{Math.round(successRate * 100) + "%"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground"
            size="icon"
            onClick={handleOpenCalendar}
            aria-label="Abrir calendário do hábito"
          >
            <CalendarIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground"
            size="icon"
            onClick={handleOpenStatistics}
            aria-label="Abrir estatísticas do hábito"
          >
            <ChartNoAxesColumnDecreasingIcon className="size-5" strokeWidth={3} />
          </Button>
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground"
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


function HabitCardIcon({ icon }: { icon: string }) {
  switch (icon.toLowerCase()) {
    case "music":
      return <MusicIcon className="size-4.5" />;
    case "dumbbell":
      return <DumbbellIcon className="size-4.5" />;
    default:
      return null;
  }
}