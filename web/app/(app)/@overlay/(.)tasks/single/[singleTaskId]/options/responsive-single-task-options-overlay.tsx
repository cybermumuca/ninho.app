"use client";

import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { mockTasksList } from "@/data/tasks";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AlarmClockIcon, CheckIcon, CircleDashedIcon, ClockIcon, MessageSquareMoreIcon, PencilIcon, PlayIcon, TargetIcon, TimerIcon, Trash2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ResponsiveSingleTaskOptionsOverlayProps {
  singleTaskId: string;
}

export function ResponsiveSingleTaskOptionsOverlay({ singleTaskId }: ResponsiveSingleTaskOptionsOverlayProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const task = mockTasksList.find(t => t.id === singleTaskId);

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

  function formatDuration(duration?: string) {
    if (!duration) return null;

    const [hours, minutes] = duration.split(':');

    if (hours === '00') return `${minutes}min`;

    return `${hours}h ${minutes}min`;
  }

  function getStatusColor() {
    switch (task?.status) {
      case "PENDING": return "text-gray-500";
      case "IN_PROGRESS": return "text-orange-600 dark:text-orange-500";
      case "COMPLETED": return "text-green-600 dark:text-green-500";
      default: return "text-gray-500";
    }
  }

  function handleMarkAsPending() {
    setPendingNavigation(`/tasks/single/${singleTaskId}/pending`);
    setOpen(false);
  }

  function handleMarkAsCompleted() {
    setPendingNavigation(`/tasks/single/${singleTaskId}/complete`);
    setOpen(false);
  }

  function handleAddDescriptionModal() {
    throw new Error("Function not implemented.");
  }

  function handleOpenEditPage() {
    setPendingNavigation(`/tasks/single/${singleTaskId}/edit`);
    setOpen(false);
  }

  function handleOpenDeleteModal() {
    throw new Error("Function not implemented.");
  }

  function handleOpenTaskInTimer() {
    throw new Error("Function not implemented.");
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between">
          <div className="flex flex-col gap-0.5 items-start">
            <DrawerTitle className="text-wrap text-start truncate">{task?.title}</DrawerTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ClockIcon className="size-3" />
                <span>{formatDuration(task?.estimatedDuration || "00:00:00")}</span>
              </div>
              <div className="flex items-center gap-1">
                {task?.status === "PENDING" && <CircleDashedIcon className={`size-3 ${getStatusColor()}`} />}
                {task?.status === "IN_PROGRESS" && <PlayIcon className={`size-3 ${getStatusColor()}`} />}
                {task?.status === "COMPLETED" && <CheckIcon className={`size-3 ${getStatusColor()}`} />}
                <span className={`text-xs ${getStatusColor()}`}>
                  {task?.status === "PENDING" && "Pendente"}
                  {task?.status === "IN_PROGRESS" && "Em andamento"}
                  {task?.status === "COMPLETED" && "Concluída"}
                </span>
              </div>
            </div>
          </div>
          <IconWrapper color={task?.category.color || "purple"} className="border-1 rounded-full flex-shrink-0">
            <Icon icon={task?.category.icon || "brain"} className="size-4" />
          </IconWrapper>
        </DrawerHeader>
        {task?.status !== "IN_PROGRESS" && (
          <div className="grid grid-cols-2 px-4">
            <div className={cn("p-3.5 gap-2 flex flex-col items-center justify-center border-y-1 border-s-1 rounded-s-lg", task?.status === "PENDING" && "bg-muted/20")} onClick={handleMarkAsPending}>
              <div className={cn("rounded-full flex items-center justify-center p-2", task?.status === "PENDING" ? "bg-yellow-800/30" : "bg-muted/70")}>
                <AlarmClockIcon className={cn("size-4", task?.status === "PENDING" ? "text-yellow-500" : "text-muted-foreground/70")} />
              </div>
              <p className={cn("text-xs font-medium", task?.status === "PENDING" ? "text-foreground" : "text-muted-foreground/70")}>Pendente</p>
            </div>
            <div className={cn("p-3.5 gap-2 flex flex-col items-center justify-center border-y-1 border-x-1 rounded-e-lg", task?.status === "COMPLETED" && "bg-muted/20")} onClick={handleMarkAsCompleted}>
              <div className={cn("rounded-full flex items-center justify-center p-2", task?.status === "COMPLETED" ? "bg-emerald-800/30" : "bg-muted/70")}>
                <CheckIcon className={cn("size-4", task?.status === "COMPLETED" ? "text-emerald-400" : "text-muted-foreground/70")} />
              </div>
              <p className={cn("text-xs font-medium", task?.status === "COMPLETED" ? "text-foreground" : "text-muted-foreground/70")}>Concluída</p>
            </div>
          </div>
        )}
        {task?.status === "IN_PROGRESS" && (
          <div className="grid grid-cols-1 px-4">
            <div className="p-3.5 gap-2 flex items-center border-1 rounded-lg">
              <TimerIcon className="size-6" />
              <p className={cn("text-lg font-semibold")}>00:52:24</p>
            </div>
          </div>
        )}
        <div className="p-4 space-y-3">
          {task?.status === "PENDING" && (
            <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleOpenTaskInTimer}>
              <TimerIcon className="size-5 text-muted-foreground" />
              Abrir no Timer
            </Button>
          )}
          <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleAddDescriptionModal}>
            <MessageSquareMoreIcon className="size-5 text-muted-foreground" />
            Adicionar notas
          </Button>
          <Button className="w-full justify-start items-center" variant="outline" size="lg" onClick={handleOpenEditPage}>
            <PencilIcon className="size-5 text-muted-foreground" />
            Editar
          </Button>
          <Button className="w-full justify-start items-center text-red-400" variant="outline" size="lg" onClick={handleOpenDeleteModal}>
            <Trash2Icon className="size-5" />
            Excluir
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}