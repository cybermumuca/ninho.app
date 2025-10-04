"use client";

import { Button } from "@/components/ui/button";
import { useTask } from "../use-task";
import { mockTasksList } from "@/data/tasks";
import { useSimpleTaskListStore } from "./simple-task-list-store";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Task } from "@/lib/types/task";
import { TaskItem } from "./task-item";
import { isTaskOverdue } from "../task-utils";

export default function SingleTasksPage() {
  const { groupAndSortTasks } = useTask();
  const { groupBy, sortBy, toggleGroup, collapsedGroups, showTaskCount } = useSimpleTaskListStore();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-full container mx-auto mb-20">
      {groupAndSortTasks(mockTasksList.filter(task => task.completedAt === null && !isTaskOverdue(task)), groupBy, sortBy).map(([group, tasks]) => {
        const isCollapsed = collapsedGroups.has(group);

        return (
          <section key={group}>
            <Button
              variant="ghost"
              onClick={() => toggleGroup(group)}
              className="flex items-center justify-between w-full py-3 rounded-none bg-muted/50 hover:bg-muted h-auto cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <h2 className="font-medium text-base ms-2">{group}</h2>
                {showTaskCount && (
                  <span className="text-sm text-muted-foreground">
                    {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
                  </span>
                )}
              </div>

              {isCollapsed ? (
                <ChevronRightIcon className="size-4 text-muted-foreground me-2" />
              ) : (
                <ChevronDownIcon className="size-4 text-muted-foreground me-2" />
              )}
            </Button>

            {!isCollapsed && (
              <>
                {tasks.map((task: Task) => (
                  <TaskItem key={task.id} {...task} />
                ))}
              </>
            )}
          </section>
        )
      })}
    </main>
  )
}