"use client";

import { Button } from "@/components/ui/button";
import { useTask } from "../../use-task";
import { mockTasksList } from "@/data/tasks";
import { useSimpleTaskListStore } from "../simple-task-list-store";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Task } from "@/lib/types/task";
import { TaskItem } from "../task-item";

export default function CompletedSingleTasksPage() {
  const { groupAndSortTasks } = useTask();
  const { groupBy, sortBy, toggleGroup, collapsedGroups } = useSimpleTaskListStore();

  const completedTasks = mockTasksList.filter(task =>
    task.status === "COMPLETED" && task.completedAt !== null
  );

  if (completedTasks.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-full container mx-auto">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">Nenhuma tarefa concluída</p>
          <p className="text-sm text-muted-foreground">
            As tarefas concluídas aparecerão aqui
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-full container mx-auto">
      {groupAndSortTasks(completedTasks, groupBy, sortBy).map(([group, tasks]) => {
        const isCollapsed = collapsedGroups.has(group);

        return (
          <section key={group}>
            <Button
              variant="ghost"
              onClick={() => toggleGroup(group)}
              className="flex items-center justify-between w-full py-3 rounded-none bg-muted/50 hover:bg-muted h-auto"
            >
              <div className="flex items-center gap-3">
                <h2 className="font-medium text-base ms-2">{group}</h2>
                <span className="text-sm text-muted-foreground">
                  {tasks.length} {tasks.length === 1 ? 'tarefa concluída' : 'tarefas concluídas'}
                </span>
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
  );
}