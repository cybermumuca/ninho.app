"use client";

import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getActivityTypeLabel, getCategoryColorClasses } from "@/lib/utils";
import { AlarmClockIcon, CheckIcon, CircleMinusIcon, ClockIcon, MenuIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActivityProps {
  id: string;
  title: string;
  category: {
    color: string;
    icon: string;
  }
  activityType: "TASK" | "EVENT" | "HOUSEHOLD_TASK" | "HABIT" | "ANNIVERSARY";
  modality: "SUCCESS_FAILURE" | "TIMED";
  status: "ATTENDED" | "MISSED" | "SUCCESS" | "FAILURE" | "SKIPPED" | "PENDING" | "NONE";
  startDateTime?: string;
  endDateTime?: string;
}

export function ActivityCard({
  id,
  title,
  activityType,
  category: { color, icon },
  startDateTime,
  endDateTime,
  status,
  modality
}: ActivityProps) {
  const router = useRouter();

  function handleStatusChange(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <Card
      className="px-4 py-2 gap-2 rounded-lg cursor-pointer transition-shadow group-hover:shadow-lg"
      onClick={() => router.push(`/agenda/${id}`)}
      tabIndex={0}
      role="button"
    >
      <CardHeader className="flex items-center justify-between p-0">
        <div className="flex items-center gap-2">
          <IconWrapper color={color} className="border-1">
            <Icon icon={icon} className="size-5.5" />
          </IconWrapper>
          <div className="flex flex-col items-start">
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription
              className={cn(`text-[0.7em] px-2 py-0.5 text-nowrap rounded-md font-semibold`, Object.values(getCategoryColorClasses(color)))}
            >
              {getActivityTypeLabel(activityType)}
            </CardDescription>
          </div>
        </div>
        <button
          className={cn(
            "rounded-full flex items-center justify-center p-2",
            (status === "SUCCESS" || status === "ATTENDED") && "bg-emerald-800/30",
            (status === "FAILURE" || status === "MISSED") && "bg-red-800/30",
            status === "PENDING" && "bg-yellow-800/30",
            status === "SKIPPED" && "bg-blue-800/30",
            status === "NONE" && "bg-muted/70"
          )}
          onClick={handleStatusChange}
        >
          {status === "SUCCESS" && <CheckIcon className="size-4 text-emerald-400" />}
          {status === "FAILURE" && <XIcon className="size-4 text-red-400" />}
          {status === "PENDING" && <AlarmClockIcon className="size-4 text-yellow-500" />}
          {status === "SKIPPED" && <CircleMinusIcon className="size-4 text-blue-500" />}
          {status === "NONE" && <div className="size-4 text-muted-foreground" />}
        </button>
      </CardHeader>
      <CardContent className="flex flex-col px-0">
        <div className="flex items-center gap-2">
          {startDateTime && (
            <Badge variant="outline" className="px-3 py-1 gap-1">
              <ClockIcon className="size-3.5 text-amber-400" />
              {startDateTime} {endDateTime && `- ${endDateTime}`}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}