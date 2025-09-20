"use client";

import { Icon } from "@/components/icon";
import { IconWrapper } from "@/components/icon-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getActivityTypeLabel, getCategoryColorClasses } from "@/lib/utils";
import { Clock, ClockIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActivityProps {
  id: string;
  title: string;
  color: string;
  icon: string;
  activityType: "TASK" | "EVENT" | "HOUSEHOLD_TASK" | "HABIT" | "ANNIVERSARY";
  startDateTime?: string;
  endDateTime?: string;
}

export function ActivityCard({ id, title, activityType, color, icon, startDateTime, endDateTime }: ActivityProps) {
  const router = useRouter();

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
        <Button
          className="rounded-md p-2 -m-2 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={e => {
            e.stopPropagation();
            router.push(`/agenda/${id}/options`);
          }}
          tabIndex={0}
        >
          <MenuIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col px-0">
        <div className="flex items-center gap-2">
          {startDateTime && (
            <Badge variant="outline" className="px-3 py-1 gap-1 ">
              <ClockIcon className="size-3.5 text-amber-400" />
              {startDateTime} {endDateTime && `- ${endDateTime}`}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}