"use client";

import { Button } from "@/components/ui/button";
import { useTask } from "../../use-task";
import { mockTasksList } from "@/data/tasks";
import { useSimpleTaskListStore } from "../simple-task-list-store";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Task } from "@/lib/types/task";
import { TaskItem } from "../task-item";
import { isTaskOverdue } from "../../task-utils";

export default function ArchivedSingleTasksPage() {
  const { groupAndSortTasks } = useTask();
  const { groupBy, sortBy, toggleGroup, collapsedGroups, showTaskCount } = useSimpleTaskListStore();

  const archivedTasks = mockTasksList.filter(task => isTaskOverdue(task));

  if (archivedTasks.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center min-h-full container mx-auto">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">Nenhuma tarefa simples arquivada</p>
          <p className="text-sm text-muted-foreground">
            As tarefas simples vencidas aparecem aqui automaticamente
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-full container mx-auto">
      {groupAndSortTasks(archivedTasks, groupBy, sortBy).map(([group, tasks]) => {
        const isCollapsed = collapsedGroups.has(group);

        return (
          <section key={group}>
            <Button
              variant="ghost"
              onClick={() => toggleGroup(group)}
              className="flex items-center justify-between w-full py-3 rounded-none bg-muted/50 hover:bg-muted h-auto"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <h2 className="font-medium text-base ms-2 truncate">{group}</h2>
                {showTaskCount && (
                  <span className="text-sm text-muted-foreground flex-shrink-0">
                    {tasks.length} {tasks.length === 1 ? 'tarefa vencida' : 'tarefas vencidas'}
                  </span>
                )}
              </div>

              {isCollapsed ? (
                <ChevronRightIcon className="size-4 text-muted-foreground me-2 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="size-4 text-muted-foreground me-2 flex-shrink-0" />
              )}
            </Button>

            {!isCollapsed && (
              <>
                {tasks.map((task: Task) => (
                  <TaskItem key={task.id} {...task} isArchived={true} />
                ))}
              </>
            )}
          </section>
        )
      })}
    </main>
  );
}