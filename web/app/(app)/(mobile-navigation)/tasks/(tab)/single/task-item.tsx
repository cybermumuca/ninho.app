"use client";

import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";
import { cn } from "@/lib/utils";
import { CheckIcon, CircleDashedIcon, ClockIcon, PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { isToday, parseISO } from "date-fns";

interface TaskItemProps {
  id: string;
  title: string;
  category: {
    color: string;
    icon: string;
  }
  estimatedDuration: string | null; // hh:mm:ss
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  completedAt: string | null;
  dueDate: string | null;
  isArchived?: boolean;
}

export function TaskItem({
  id,
  title,
  category: { color, icon },
  estimatedDuration,
  status,
  dueDate,
  isArchived = false,
}: TaskItemProps) {
  const router = useRouter();

  function handleOpenOptions() {
    router.push(`/tasks/single/${id}/options`);
  }

  function formatDuration(duration?: string) {
    if (!duration) return null;

    const [hours, minutes] = duration.split(':');

    if (hours === '00') return `${minutes}min`;

    return `${hours}h ${minutes}min`;
  }

  function getStatusColor() {
    switch (status) {
      case "PENDING": { 
        if (isDueDateToday()) {
          return "text-red-600 dark:text-red-500";
        }

        return "text-gray-500";
      };
      case "IN_PROGRESS": return "text-orange-600 dark:text-orange-500";
      case "COMPLETED": return "text-green-600 dark:text-green-500";
      default: return "text-gray-500";
    }
  }

  function isDueDateToday() {
    if (!dueDate || status === 'COMPLETED') return false;
    return isToday(parseISO(dueDate));
  }

  return (
    <div
      className={cn("flex items-center gap-3 p-4 cursor-pointer", {
        "border-l-2 border-green-500 bg-green-100/50 dark:bg-green-950/20": status === "COMPLETED",
        "border-l-2 border-red-500 bg-red-100/50 dark:bg-red-950/20": isArchived,
        "border-l-2 border-red-500 bg-red-100/50 dark:bg-red-950/20 animate-pulse": isDueDateToday()
      })}
      onClick={handleOpenOptions}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <IconWrapper color={color} className="border-1 rounded-full flex-shrink-0">
          <Icon icon={icon} className="size-4" />
        </IconWrapper>

        <div className="min-w-0 flex-1">
          <h3 className="font-medium truncate text-sm">{title}</h3>

          <div className="flex items-center gap-2 mt-1">
            {estimatedDuration && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ClockIcon className="size-3" />
                <span>{formatDuration(estimatedDuration)}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              {status === "PENDING" && <CircleDashedIcon className={`size-3 ${getStatusColor()}`} />}
              {status === "IN_PROGRESS" && <PlayIcon className={`size-3 ${getStatusColor()}`} />}
              {status === "COMPLETED" && <CheckIcon className={`size-3 ${getStatusColor()}`} />}
              <span className={`text-xs ${getStatusColor()}`}>
                {status === "PENDING" ? isDueDateToday() ? "Pendente (vence hoje)" : "Pendente" : null}
                {status === "IN_PROGRESS" && "Em andamento"}
                {status === "COMPLETED" && "Concluída"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}