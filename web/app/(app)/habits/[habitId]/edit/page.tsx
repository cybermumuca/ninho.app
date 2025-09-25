"use client";

import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import { mockHabitsList } from "@/data/habits";
import { getCategoryColorClasses, getFrequencyDescription } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { ArchiveIcon, ArchiveRestoreIcon, ArchiveXIcon, Calendar1Icon, CalendarMinus2Icon, CalendarSyncIcon, CalendarXIcon, ChevronLeft, ChevronLeftIcon, ChevronRightIcon, InfoIcon, PencilIcon, RefreshCcwIcon, ShapesIcon, TargetIcon, Trash2Icon } from "lucide-react";
import { useParams, notFound } from "next/navigation";

export default function HabitEditPage() {
  const { habitId } = useParams<{ habitId: string }>();
  const habit = mockHabitsList.find(h => h.id === habitId);

  if (!habit) {
    return notFound();
  }

  return (
    <main className="flex flex-col min-h-full">
      <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <PencilIcon className="size-5 text-primary" />
          <h2>Título</h2>
        </div>
        <p className="text-muted-foreground text-sm truncate">{habit.title}</p>
      </div>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <ShapesIcon className="size-5 text-primary" />
          <h2>Categoria</h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <p className={getCategoryColorClasses(habit.category.color).text}>{habit.category.name}</p>
          <IconWrapper color={habit.category.color}>
            <Icon icon={habit.category.icon} className="size-4" />
          </IconWrapper>
        </div>
      </div>
      <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <InfoIcon className="size-5 text-primary" />
          <h2>Descrição</h2>
        </div>
        <p className="text-muted-foreground truncate text-sm">{habit.description || "Nenhuma descrição"}</p>
      </div>
      <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <CalendarSyncIcon className="size-5 text-primary" />
          <h2>Frequência</h2>
        </div>
        <p className="text-muted-foreground text-sm truncate">{getFrequencyDescription(habit.frequency)}</p>
      </div>
      <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <Calendar1Icon className="size-5 text-primary" />
          <h2>Data de início</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          {format(parseISO(habit.startDate), "dd/MM/yyyy")}
        </p>
      </div>
      <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <CalendarMinus2Icon className="size-5 text-primary" />
          <h2>Data alvo</h2>
        </div>
        {habit.endDate ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="-my-2 py-2"
            >
              <Trash2Icon className="size-4 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm">
              {format(parseISO(habit.endDate), "dd/MM/yyyy")}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">---</p>
        )}
      </div>
      {habit.type === "TIMED" && (
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <TargetIcon className="size-5 text-primary" />
            <h2>Objetivo Diário</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            {habit.weekProgress[0]?.goal}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
        <div className="flex items-center gap-2">
          <RefreshCcwIcon className="size-5 text-primary" />
          <h2>Reiniciar progresso</h2>
        </div>
        <ChevronRightIcon className="size-5 text-muted-foreground" />
      </div>
      {habit.isActive && (
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <ArchiveIcon className="size-5 text-primary" />
            <h2>Arquivar</h2>
          </div>
          <ChevronRightIcon className="size-5 text-muted-foreground" />
        </div>
      )}
      {!habit.isActive && (
        <>
          <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
            <div className="flex items-center gap-2">
              <ArchiveRestoreIcon className="size-5 text-primary" />
              <h2>Restaurar</h2>
            </div>
            <ChevronRightIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
            <div className="flex items-center gap-2">
              <ArchiveXIcon className="size-5 text-primary" />
              <h2>Deletar</h2>
            </div>
            <ChevronRightIcon className="size-5 text-muted-foreground" />
          </div>
        </>
      )}
    </main>
  )
} 