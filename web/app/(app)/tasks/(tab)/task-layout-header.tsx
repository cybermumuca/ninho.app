"use client";

import { Button } from "@/components/ui/button";
import { ArchiveIcon, ListChecksIcon, ListFilterIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function TasksLayoutHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isSingle = pathname === "/tasks/single";
  const isRecurrent = pathname === "/tasks/recurrent";
  const rootPath = isSingle ? "/tasks/single" : isRecurrent ? "/tasks/recurrent" : "/tasks/single";

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
          className="rounded-md p-2 -m-2 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={handleOpenListOptions}
        >
          <ListFilterIcon className="size-5.5" />
        </Button>
        <Button
          className="rounded-md p-2 -m-2 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={handleOpenCompletedTasks}
        >
          <ListChecksIcon className="size-5.5" />
        </Button>
        <Button
          className="rounded-md p-2 -m-2 cursor-pointer"
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