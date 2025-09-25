"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlameIcon,
  MessageSquareMoreIcon
} from "lucide-react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getDate,
  isSameMonth,
  format
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarDay } from "./calendar-day";
import { mockHabitsList } from "@/data/habits";
import { notFound, useParams } from "next/navigation";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function HabitCalendarPage() {
  const { habitId } = useParams<{ habitId: string }>();
  const habit = mockHabitsList.find(h => h.id === habitId);
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!habit) {
    return notFound();
  }

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Domingo
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    // 6 semanas (42 dias)
    const weeksToShow = Math.ceil(eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd
    }).length / 7);

    const finalCalendarEnd = weeksToShow < 6
      ? new Date(calendarEnd.getTime() + (6 - weeksToShow) * 7 * 24 * 60 * 60 * 1000)
      : calendarEnd;

    return eachDayOfInterval({
      start: calendarStart,
      end: finalCalendarEnd
    }).slice(0, 42).map(date => {
      const dateString = date.toISOString().split('T')[0];
      const progressData = habit?.weekProgress.find(p => p.day === dateString);

      return {
        day: getDate(date),
        status: progressData?.status,
        isCurrentMonth: isSameMonth(date, currentDate),
        date: dateString,
        taskId: progressData?.taskId || "",
        isInFrequencyRange: progressData?.isInFrequencyRange || false,
        fullDate: date
      };
    });
  }, [currentDate, habit?.weekProgress]);

  function goToPreviousMonth() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex items-center justify-between px-4">
        <Button
          variant="ghost"
          onClick={goToPreviousMonth}
          className="-m-1"
        >
          <ChevronLeftIcon className="size-6 text-primary" />
        </Button>

        <div className="flex flex-col items-center py-2">
          <h1 className="text-base font-bold text-foreground">
            {format(currentDate, 'MMMM', { locale: ptBR }).replace(/^./, c => c.toUpperCase())}
          </h1>
          <p className="text-sm text-muted-foreground">{format(currentDate, 'yyyy')}</p>
        </div>

        <Button
          variant="ghost"
          onClick={goToNextMonth}
          className="-m-1"
        >
          <ChevronRightIcon className="size-6 text-primary" />
        </Button>
      </header>

      <div className="grid grid-cols-7 gap-1 my-4 px-4">
        {weekDays.map((day, index) => (
          <div key={day} className="text-center">
            <span className={cn(
              "text-sm font-medium",
              index === 0 || index === 6 ? "text-primary" : "text-muted-foreground"
            )}>
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 mb-8 px-5">
        {calendarDays.map((dayData, index) => (
          <CalendarDay
            key={index}
            date={dayData.date}
            startDate={habit.startDate}
            endDate={habit.endDate}
            habitId={habit.id}
            taskId={dayData.taskId}
            status={dayData.status || "NONE"}
            isCurrentMonth={dayData.isCurrentMonth}
            isInFrequencyRange={dayData.isInFrequencyRange}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 mb-3 border-t-4 p-4">
        <div className="flex items-center gap-2">
          <FlameIcon className="size-5 text-primary" />
          <h2 className="text-lg font-medium text-muted-foreground">Série</h2>
        </div>
        <p className="text-2xl text-center self-center font-bold text-primary uppercase">{habit.streak} dias</p>
      </div>

      <div className="flex flex-col gap-7 mb-9 border-t-4 p-4">
        <div className="flex items-center gap-2">
          <MessageSquareMoreIcon className="size-5 text-primary" />
          <h2 className="text-lg font-medium text-muted-foreground">Anotações</h2>
        </div>
        <p className="text-xs text-center text-muted-foreground/60">Sem anotações para esse mês</p>
      </div>
    </div>
  );
}
