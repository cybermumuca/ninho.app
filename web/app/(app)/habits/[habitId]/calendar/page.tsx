"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, FlameIcon, MessageSquareMoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarDay } from "./calendar-day";
import { mockHabitsList } from "@/data/habits";
import { notFound, useParams } from "next/navigation";

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function HabitCalendarPage() {
  const { habitId } = useParams<{ habitId: string }>();
  const habit = mockHabitsList.find(h => h.id === habitId);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 12));

  if (!habit) {
    return notFound();
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = new Date(year, month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const calendarDays = [];

  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString().split('T')[0];
    calendarDays.push({
      day,
      status: habit?.weekProgress.find(p => p.day === dateString)?.status,
      isCurrentMonth: false,
      date: dateString,
      taskId: habit?.weekProgress.find(p => p.day === dateString)?.taskId || "",
      isInFrequencyRange: habit?.weekProgress.find(p => p.day === dateString)?.isInFrequencyRange || false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    calendarDays.push({
      day,
      status: habit?.weekProgress.find(p => p.day === dateString)?.status,
      isCurrentMonth: true,
      date: dateString,
      taskId: habit?.weekProgress.find(p => p.day === dateString)?.taskId || "",
      isInFrequencyRange: habit?.weekProgress.find(p => p.day === dateString)?.isInFrequencyRange || false,
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    const dateString = date.toISOString().split('T')[0];
    calendarDays.push({
      day,
      status: habit?.weekProgress.find(p => p.day === dateString)?.status,
      isCurrentMonth: false,
      date: dateString,
      taskId: habit?.weekProgress.find(p => p.day === dateString)?.taskId || "",
      isInFrequencyRange: habit?.weekProgress.find(p => p.day === dateString)?.isInFrequencyRange || false,
    });
  }

  function goToPreviousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
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
            {monthNames[month]}
          </h1>
          <p className="text-sm text-muted-foreground">{year}</p>
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
