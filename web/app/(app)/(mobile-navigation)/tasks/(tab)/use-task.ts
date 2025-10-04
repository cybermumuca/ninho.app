import { Task } from "@/lib/types/task";
import { GroupOption, SortOption } from "./single/simple-task-list-store";
import { groupItemsAlphabetically, groupItemsByDate, sortTasks } from "./task-utils";

export function useTask() {
  function groupTasks(tasks: Task[], groupBy: GroupOption): [string, Task[]][] {
    switch (groupBy) {
      case "date":
        return groupItemsByDate(tasks);
      case "alphabet":
        return groupItemsAlphabetically(tasks);
      default:
        return [["Todas as tarefas", tasks]];
    }
  }

  function groupAndSortTasks(tasks: Task[], groupBy: GroupOption, sortBy: SortOption): [string, Task[]][] {
    const grouped = groupTasks(tasks, groupBy);

    return grouped.map(([groupName, groupTasks]) => [
      groupName,
      sortTasks(groupTasks, sortBy)
    ] as [string, Task[]]);
  }

  return {
    groupAndSortTasks
  };
}