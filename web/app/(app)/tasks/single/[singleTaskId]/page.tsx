"use client";

import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import { mockTasksList } from "@/data/tasks";
import { cn, getCategoryColorClasses } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { AtomIcon, Calendar1Icon, CalendarMinus2Icon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MessageSquareMoreIcon, PencilIcon, ShapesIcon, TimerIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";

export default function SingleTaskPage() {
  const { singleTaskId } = useParams<{ singleTaskId: string }>();
  const task = mockTasksList.find(t => t.id === singleTaskId);
  const router = useRouter();

  if (!task) {
    return notFound();
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center gap-3 p-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="-m-2 p-2 flex-shrink-0"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <h1 className="text-xl font-bold truncate min-w-0">{task.title}</h1>
          </div>
          <div className={cn(getCategoryColorClasses(task.category.color || "gray").text, "rounded-full bg-muted/30 p-2 flex-shrink-0")}>
            <Icon icon={task.category.icon || ""} />
          </div>
        </div>
      </header>
      <main className="flex flex-col min-h-full">
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <PencilIcon className="size-5 text-primary" />
            <h2>Título</h2>
          </div>
          <p className="text-muted-foreground text-sm truncate">{task.title}</p>
        </div>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShapesIcon className="size-5 text-primary" />
            <h2>Categoria</h2>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <p className={getCategoryColorClasses(task.category.color || "gray").text}>{task.category.name}</p>
            <IconWrapper color={task.category.color || "gray"} className="border-1 rounded-full">
              <Icon icon={task.category.icon || ""} className="size-4" />
            </IconWrapper>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <MessageSquareMoreIcon className="size-5 text-primary" />
            <h2>Notas</h2>
          </div>
          <p className="text-muted-foreground truncate text-sm">{task.notes || "Nenhuma nota"}</p>
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <Calendar1Icon className="size-5 text-primary" />
            <h2>Data de início</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            {format(parseISO(task.date), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <CalendarMinus2Icon className="size-5 text-primary" />
            <h2>Data de vencimento</h2>
          </div>
          {task.dueDate ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="-my-2 py-2"
              >
                <Trash2Icon className="size-4 text-muted-foreground" />
              </Button>
              <p className="text-muted-foreground text-sm">
                {format(parseISO(task.dueDate), "dd/MM/yyyy")}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">---</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <ClockIcon className="size-5 text-primary" />
            <h2>Duração estimada</h2>
          </div>
          {task.estimatedDuration ? (
            <p className="text-muted-foreground text-sm">
              {task.estimatedDuration}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">---</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <TimerIcon className="size-5 text-primary" />
            <h2>Tempo de execução</h2>
          </div>
          <p className="text-muted-foreground text-sm">---</p>
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <CheckIcon className="size-5 text-primary" />
            <h2>Concluída em</h2>
          </div>
          {task.completedAt ? (
            <p className="text-muted-foreground text-sm">
              {format(parseISO(task?.completedAt), "dd/MM/yyyy HH:mm")}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">---</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <AtomIcon className="size-5 text-primary" />
            <h2>Status</h2>
          </div>
          <p className="text-muted-foreground text-sm">{task.status === "PENDING" ? "Pendente" : task.status === "IN_PROGRESS" ? "Em andamento" : "Concluída"}</p>
        </div>
        <div className="flex items-center justify-between gap-6 px-4 py-5 border-b">
          <div className="flex items-center gap-2">
            <TrashIcon className="size-5 text-primary" />
            <h2>Deletar</h2>
          </div>
          <ChevronRightIcon className="size-5 text-muted-foreground" />
        </div>
      </main>
    </div>
  )
}