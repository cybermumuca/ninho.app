"use client";

import { RoomSummary } from "@/data/rooms";
import {
  Bed,
  Sofa,
  UtensilsCrossed,
  Bath,
  Home,
  Menu,
  CalendarIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  TriangleAlertIcon,
  CircleCheckBigIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface RoomListCardProps {
  room: RoomSummary;
}

const iconMap = {
  BED: Bed,
  SOFA: Sofa,
  UTENSILS: UtensilsCrossed,
  BATH: Bath,
};

const colorMap = {
  blue: "bg-blue-700",
  green: "bg-green-700",
  red: "bg-red-700",
  purple: "bg-purple-700",
  yellow: "bg-yellow-700",
  orange: "bg-orange-700",
};

export function RoomListCard({ room }: RoomListCardProps) {
  const IconComponent = iconMap[room.icon as keyof typeof iconMap] || Home;
  const colorClass = colorMap[room.color as keyof typeof colorMap] || colorMap.blue;
  const router = useRouter();

  return (
    <Card
      className="py-5 gap-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={() => router.push(`/rooms/${room.id}`)}
      tabIndex={0}
      role="button"
    >
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className={`size-9 ${colorClass}`}>
            <AvatarFallback className={`${colorClass} text-white`}>
              <IconComponent className="size-4.5" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-semibold">{room.name}</CardTitle>
        </div>
        <Button
          className="rounded-md p-2 -m-2 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={e => {
            e.stopPropagation();
            router.push(`/rooms/${room.id}/options`);
          }}
          tabIndex={0}
        >
          <Menu className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {room.noTasks && (
            <Badge variant="outline" className="px-3 py-1 inline-flex items-center gap-2 bg-amber-800/10">
              <TriangleAlertIcon className="size-3.5 text-amber-500" />
              <span className="text-xs text-amber-200 font-semibold">
                Nenhuma tarefa cadastrada
              </span>
            </Badge>
          )}
          {room.allDone && (
            <Badge variant="outline" className="px-3 py-1 inline-flex items-center gap-2 bg-green-800/10">
              <CircleCheckBigIcon className="size-3.5 text-green-500" />
              <span className="text-xs text-green-200 font-semibold">Todas as tarefas concluídas</span>
            </Badge>
          )}
          {!room.noTasks && !room.allDone && (
            <>
              <Badge variant="outline" className="px-3 py-1 gap-1">
                <CalendarIcon className="size-3.5" />
                {room.tasksToday}
              </Badge>
              <Badge variant="outline" className="px-3 py-1 gap-1 bg-emerald-800/20">
                <CalendarCheckIcon className="size-3.5 text-emerald-400" />
                {room.tasksCompletedToday}
              </Badge>
              <Badge variant="outline" className="px-3 py-1 gap-1 bg-amber-800/20">
                <CalendarClockIcon className="size-3.5 text-amber-400" />
                {room.tasksOverdue}
              </Badge>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}