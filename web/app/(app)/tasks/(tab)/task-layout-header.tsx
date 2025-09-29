"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArchiveIcon, ListChecksIcon, ListFilterIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function TasksLayoutHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isSingle = pathname.startsWith("/tasks/single");
  const isRecurrent = pathname.startsWith("/tasks/recurrent");
  const rootPath = isSingle ? "/tasks/single" : isRecurrent ? "/tasks/recurrent" : "/tasks/single";
  const isInListOptionsPage = pathname.endsWith("/menu");
  const isInArchivedTasksPage = pathname.endsWith("/archived");
  const isInCompletedTasksPage = pathname.endsWith("/completed");

  function handleOpenListOptions() {
    router.push(`${rootPath}/menu`);
  }

  function handleOpenCompletedTasks() {
    router.push(`${rootPath}/completed`);
  }

  function handleOpenArchivedTasks() {
    router.push(`${rootPath}/archived`);
  }

  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold text-foreground">Tarefas</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className={cn("rounded-md p-2 -m-2 cursor-pointer", isInListOptionsPage && "cursor-not-allowed text-primary hover:bg-transparent hover:text-primary dark:hover:bg-transparent")}
          variant="ghost"
          size="icon"
          onClick={handleOpenListOptions}
        >
          <ListFilterIcon className="size-5.5" />
        </Button>
        <Button
          className={cn("rounded-md p-2 -m-2 cursor-pointer", isInCompletedTasksPage && "cursor-not-allowed pointer-events-none text-primary hover:bg-transparent hover:text-primary dark:hover:bg-transparent")}
          variant="ghost"
          size="icon"
          onClick={handleOpenCompletedTasks}
        >
          <ListChecksIcon className="size-5.5" />
        </Button>
        <Button
          className={cn("rounded-md p-2 -m-2 cursor-pointer", isInArchivedTasksPage && "cursor-not-allowed pointer-events-none text-primary hover:bg-transparent hover:text-primary dark:hover:bg-transparent")}
          variant="ghost"
          size="icon"
          onClick={handleOpenArchivedTasks}
        >
          <ArchiveIcon className="size-5.5" />
        </Button>
      </div>
    </>
  )
}