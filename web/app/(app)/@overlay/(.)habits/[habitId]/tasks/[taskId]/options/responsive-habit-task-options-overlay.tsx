"use client";

import { HabitCardIcon } from "@/app/(app)/habits/habit-icon";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockHabitsList } from "@/data/habits";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getCategoryColorClasses, getFrequencyDescription } from "@/lib/utils";
import { AlarmClockIcon, CheckIcon, XIcon, MessageSquareMoreIcon, CircleMinusIcon, TargetIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ResponsiveHabitTaskOptionsOverlayProps {
  habitId: string;
  taskId: string;
}

export function ResponsiveHabitTaskOptionsOverlay({ habitId, taskId }: ResponsiveHabitTaskOptionsOverlayProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const habit = mockHabitsList.find(h => h.id === habitId);
  const task = habit?.weekProgress.find(t => t.taskId === taskId);

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

  function handleMarkAsPending() {
    setPendingNavigation(`/habits/${habitId}/tasks/${taskId}/pending`);
    setOpen(false);
  }

  function handleMarkAsSuccess() {
    setPendingNavigation(`/habits/${habitId}/tasks/${taskId}/success`);
    setOpen(false);
  }

  function handleMarkAsFailure() {
    setPendingNavigation(`/habits/${habitId}/tasks/${taskId}/failure`);
    setOpen(false);
  }

  function handleMarkAsSkipped() {
    setPendingNavigation(`/habits/${habitId}/tasks/${taskId}/skipped`);
    setOpen(false);
  }

  function handleAddDescription() {}

  const content = (
    <>
      {habit?.type === "SUCCESS_FAILURE" && (
        <div className="grid grid-cols-3 px-4">
          <div className={cn("p-3.5 gap-2 flex flex-col items-center justify-center border-y-1 border-s-1 rounded-s-lg", task?.status === "PENDING" && "bg-muted/20")} onClick={handleMarkAsPending}>
            <div className={cn("rounded-full flex items-center justify-center p-2", task?.status === "PENDING" ? "bg-yellow-800/30" : "bg-muted/70")}>
              <AlarmClockIcon className={cn("size-4", task?.status === "PENDING" ? "text-yellow-500" : "text-muted-foreground/70")} />
            </div>
            <p className={cn("text-xs font-medium", task?.status === "PENDING" ? "text-foreground" : "text-muted-foreground/70")}>Pendente</p>
          </div>
          <div className={cn("p-3.5 gap-2 flex flex-col items-center justify-center border-1", task?.status === "SUCCESS" && "bg-muted/20")} onClick={handleMarkAsSuccess}>
            <div className={cn("rounded-full flex items-center justify-center p-2", task?.status === "SUCCESS" ? "bg-emerald-800/30" : "bg-muted/70")}>
              <CheckIcon className={cn("size-4", task?.status === "SUCCESS" ? "text-emerald-400" : "text-muted-foreground/70")} />
            </div>
            <p className={cn("text-xs font-medium", task?.status === "SUCCESS" ? "text-foreground" : "text-muted-foreground/70")}>Sucesso</p>
          </div>
          <div className={cn("p-3.5 gap-2 flex flex-col items-center justify-center border-y-1 border-e-1 rounded-e-lg", task?.status === "FAILURE" && "bg-muted/20")} onClick={handleMarkAsFailure}>
            <div className={cn("rounded-full flex items-center justify-center p-2", task?.status === "FAILURE" ? "bg-red-800/30" : "bg-muted/70")}>
              <XIcon className={cn("size-4", task?.status === "FAILURE" ? "text-red-400" : "text-muted-foreground/70")} />
            </div>
            <p className={cn("text-xs font-medium", task?.status === "FAILURE" ? "text-foreground" : "text-muted-foreground/70")}>Falha</p>
          </div>
        </div>
      )}
      {habit?.type === "TIMED" && (
        <div className="grid grid-cols-1 px-4">
          <div className="p-3.5 gap-2 flex items-center border-1 rounded-lg">
            <TargetIcon className="size-6" />
            <div className="flex flex-col">
              <p className={cn("text-lg font-semibold", task?.status === "SUCCESS" && "text-emerald-500", task?.status === "FAILURE" && "text-red-400", task?.status === "SKIPPED" && "text-blue-500")}>{task?.achieved}</p>
              <span className="text-xs text-muted-foreground/60">Objetivo: {task?.goal}</span>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 space-y-3">
        <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleAddDescription}>
          <MessageSquareMoreIcon className="size-5 text-muted-foreground" />
          Adicionar descrição
        </Button>
        {task?.status !== "SKIPPED" && (
          <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleMarkAsSkipped}>
            <CircleMinusIcon className="size-5 text-muted-foreground" />
            Pular
          </Button>
        )}
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <DrawerHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-0.5 items-start">
              <DrawerTitle>{habit?.title}</DrawerTitle>
              <div className="flex items-center gap-1">
                <DrawerDescription className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(habit?.category.color || "gray")).join(" ")} text-nowrap rounded-md font-semibold`}>
                  {task?.day
                    ? new Date(task.day + "T00:00:00").toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    : ""}
                </DrawerDescription>
                {task?.status === "SKIPPED" && (
                  <span className={`inline-flex gap-1 items-center text-xs px-2 py-1 ${Object.values(getCategoryColorClasses("blue")).join(" ")} text-nowrap rounded-md font-semibold`}>
                    <CircleMinusIcon className="size-3" /> Pulado
                  </span>
                )}
              </div>
            </div>
            <div className={`rounded-lg ${Object.values(getCategoryColorClasses(habit?.category.color || "gray")).join(" ")} flex items-center justify-center p-2 border-2`}>
              <HabitCardIcon icon={habit?.category.icon || "icon"} />
            </div>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between pe-8">
          <div className="flex flex-col gap-0.5 items-start">
            <SheetTitle>{habit?.title}</SheetTitle>
            <div className="flex items-center gap-1">
              <SheetDescription className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(habit?.category.color || "gray")).join(" ")} text-nowrap rounded-md font-semibold text-start`}>
                {task?.day
                  ? new Date(task.day + "T00:00:00").toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : ""}
              </SheetDescription>
              {task?.status === "SKIPPED" && (
                <span className={`inline-flex gap-1 items-center text-xs px-2 py-1 ${Object.values(getCategoryColorClasses("blue")).join(" ")} text-nowrap rounded-md font-semibold`}>
                  <CircleMinusIcon className="size-3" /> Pulado
                </span>
              )}
            </div>
          </div>
          <div className={`rounded-lg ${Object.values(getCategoryColorClasses(habit?.category.color || "gray")).join(" ")} flex items-center justify-center p-2 border-2`}>
            <HabitCardIcon icon={habit?.category.icon || "icon"} />
          </div>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
}