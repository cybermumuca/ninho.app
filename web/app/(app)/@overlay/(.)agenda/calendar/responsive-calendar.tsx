"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAgendaStore } from "@/stores/agenda-store";
import { cn } from "@/lib/utils";

export function ResponsiveCalendar() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { selectedDate, setSelectedDate } = useAgendaStore();

  useEffect(() => {
    if (!open && pendingNavigation) {
      router.replace(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [open, pendingNavigation, router]);

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen && !pendingNavigation) {
      router.back();
    } else {
      setOpen(newOpen);
    }
  }

  function goToPreviousMonth() {
    setCurrentDate(prev => subMonths(prev, 1));
  }

  function goToNextMonth() {
    setCurrentDate(prev => addMonths(prev, 1));
  }

  function goToToday() {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }

  function handleDateClick(date: Date) {
    setSelectedDate(date);
    setCurrentDate(date);
  }

  function generateCalendarDays() {
    const monthStart = startOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Domingo

    const days = [];
    let day = calendarStart;

    for (let i = 0; i < 42; i++) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }

  const calendarDays = generateCalendarDays();
  const monthName = format(currentDate, 'MMMM', { locale: ptBR });
  const year = format(currentDate, 'yyyy');
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between">
          <Button
            variant="ghost"
            onClick={goToPreviousMonth}
            className="-m-1"
          >
            <ChevronLeftIcon className="size-6 text-primary" />
          </Button>
          <div className="flex flex-col items-center">
            <DrawerTitle>{capitalizedMonth}</DrawerTitle>
            <DrawerDescription>{year}</DrawerDescription>
          </div>
          <Button
            variant="ghost"
            onClick={goToNextMonth}
            className="-m-1"
          >
            <ChevronRightIcon className="size-6 text-primary" />
          </Button>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <div className="grid grid-cols-7 gap-3 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={cn(
                  "h-8 flex items-center justify-center text-sm font-medium",
                  index === 0 || index === 6 ? "text-primary" : "text-muted-foreground"
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 place-items-center gap-3">
            {calendarDays.map((day, index) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              const isTodayDate = isToday(day);

              return (
                <Button
                  key={`${day.getTime()}-${index}`}
                  variant="ghost"
                  onClick={() => handleDateClick(day)}
                  className={cn(
                    "p-2 font-normal bg-muted/40 w-[40px]",
                    !isCurrentMonth && "text-muted-foreground/40",
                    isSelected && "bg-primary/20 ring-2 ring-primary",
                    isTodayDate && "text-primary font-semibold",
                  )}
                >
                  {format(day, 'd')}
                </Button>
              );
            })}
          </div>
        </div>

        <DrawerFooter className="flex-row">
          <DrawerClose asChild>
            <Button className="flex-1" variant="outline">Fechar</Button>
          </DrawerClose>
          <Button className="flex-1" variant="outline" onClick={goToToday}>Hoje</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}