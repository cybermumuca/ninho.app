"use client";

import { useMemo, useRef, useEffect } from "react";
import {
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isToday as isTodayFn,
  isSameDay
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useAgendaStore } from "@/stores/agenda-store";

export function MiniCalendar() {
  const today = new Date();
  const { selectedDate, setSelectedDate } = useAgendaStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLButtonElement>(null);

  const dates = useMemo(() => {
    const startDate = startOfMonth(addMonths(today, -3));
    const endDate = endOfMonth(addMonths(today, 3));

    return eachDayOfInterval({
      start: startDate,
      end: endDate
    }).map(date => ({
      date,
      dateISO: date.toISOString(),
      day: format(date, 'd'),
      month: format(date, 'MMM', { locale: ptBR }),
      dayOfWeek: format(date, 'eeeeee', { locale: ptBR }),
      isToday: isTodayFn(date)
    }));
  }, []);

  useEffect(() => {
    if (todayRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const todayElement = todayRef.current;

      const containerWidth = container.offsetWidth;
      const todayOffsetLeft = todayElement.offsetLeft;
      const todayWidth = todayElement.offsetWidth;

      const scrollPosition = todayOffsetLeft - (containerWidth / 2) + (todayWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="flex items-center overflow-x-auto gap-3 px-4 pb-2 pt-1 scrollbar-hide"
    >
      {dates.map((dateInfo) => {
        const isSelected = isSameDay(selectedDate, dateInfo.date);
        const isToday = dateInfo.isToday;

        return (
          <button
            key={dateInfo.date.toISOString()}
            ref={isToday ? todayRef : null}
            onClick={() => setSelectedDate(dateInfo.date)}
            className={cn(
              "flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-xl px-3 py-3 transition-all duration-200",
              "hover:scale-105 hover:shadow-md active:scale-95",
              "border border-transparent",
              isSelected && "ring-2 ring-primary bg-primary/10 shadow-lg scale-105 border-primary/20",
              isToday && !isSelected && "bg-gradient-to-b from-accent to-accent/80 border-primary/30 shadow-sm",
              !isSelected && !isToday && "bg-muted/50 hover:bg-muted"
            )}
          >
            <span className={cn(
              "text-[0.6em] font-medium uppercase mb-1",
              isSelected ? "text-primary" : "text-muted-foreground"
            )}>
              {dateInfo.month}
            </span>
            <div className={cn(
              "text-lg font-bold leading-none mb-1",
              isSelected ? "text-primary" : "text-foreground",
              isToday && !isSelected && "text-primary font-extrabold"
            )}>
              {dateInfo.day}
            </div>
            <span className={cn(
              "text-[10px] font-medium uppercase tracking-wider",
              isSelected ? "text-primary" : "text-muted-foreground"
            )}>
              {dateInfo.dayOfWeek}
            </span>
            {isToday && (
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mt-1",
                isSelected ? "bg-primary-foreground" : "bg-primary"
              )} />
            )}
          </button>
        );
      })}
    </div>
  );
}