"use client";

import { HabitCardIcon } from "@/app/(app)/habits/habit-icon";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockHabitsList } from "@/data/habits";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCategoryColorClasses, getFrequencyDescription } from "@/lib/utils";
import { ArchiveIcon, ArchiveRestoreIcon, CalendarIcon, ChartNoAxesColumnDecreasingIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ResponsiveHabitOptionsOverlay({ habitId }: { habitId: string }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const habit = mockHabitsList.find(h => h.id === habitId);
  const isArchived = !habit?.isActive || false;

  useEffect(() => {
    if (!open && pendingNavigation) {
      router.replace(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [open, pendingNavigation, router]);

  function handleOpenCalendar() {
    setPendingNavigation(`/habits/${habitId}/calendar`);
    setOpen(false);
  }

  function handleOpenStatistics() {
    setPendingNavigation(`/habits/${habitId}/statistics`);
    setOpen(false);
  }

  function handleEdit() {
    setPendingNavigation(`/habits/${habitId}/edit`);
    setOpen(false);
  }

  function handleArchive() {
    setPendingNavigation(`/habits/${habitId}/archive`);
    setOpen(false);
  }

  function handleRestore() {
    setPendingNavigation(`/habits/${habitId}/restore`);
    setOpen(false);
  }

  function handleDelete() {
    setPendingNavigation(`/habits/${habitId}/delete`);
    setOpen(false);
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen && !pendingNavigation) {
      router.back();
    } else {
      setOpen(newOpen);
    }
  }

  const content = (
    <div className="p-4 space-y-3">
      <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleOpenCalendar}>
        <CalendarIcon className="size-5" />
        Ver calendário
      </Button>
      <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleOpenStatistics}>
        <ChartNoAxesColumnDecreasingIcon className="size-5" strokeWidth={3} />
        Ver estatísticas
      </Button>
      {!isArchived && (
        <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleEdit}>
          <PencilIcon size={24} />
          Editar
        </Button>
      )}
      {!isArchived ? (
        <Button className="w-full justify-start items-center text-emerald-500" variant="outline" size="lg" onClick={handleArchive}>
          <ArchiveIcon size={24} />
          Arquivar
        </Button>
      ) : (
        <Button className="w-full justify-start items-center text-emerald-500" variant="outline" size="lg" onClick={handleRestore}>
          <ArchiveRestoreIcon size={24} />
          Restaurar
        </Button>
      )}
      {isArchived && (
        <Button className="w-full justify-start items-center text-destructive" variant="outline" size="lg" onClick={handleDelete}>
          <Trash2Icon className="text-destructive" size={24} />
          Deletar
        </Button>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <DrawerHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-0.5 items-start">
              <DrawerTitle>{habit?.title || "Hábito"}</DrawerTitle>
              <DrawerDescription className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(habit?.category.color || "gray")).join(" ")} text-nowrap rounded-md font-semibold`}>
                {getFrequencyDescription(habit?.frequency || { type: "DAILY" })}
              </DrawerDescription>
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
        <SheetHeader className="flex-row items-center justify-between pe-8">
          <div className="flex flex-col gap-0.5 items-start">
            <SheetTitle>{habit?.title || "Hábito"}</SheetTitle>
            <SheetDescription className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(habit?.category.color || "gray")).join(" ")} text-nowrap rounded-md font-semibold text-start`}>
              {getFrequencyDescription(habit?.frequency || { type: "DAILY" })}
            </SheetDescription>
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