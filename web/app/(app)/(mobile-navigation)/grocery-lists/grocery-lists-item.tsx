"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface GroceryListItemProps {
  id: string;
  name: string;
  markedItems: number;
  totalItems: number;
  createdAt: Date;
  createdBy: {
    name: string;
    avatarUrl: string;
    initials: string;
  };
}

export function GroceryListsItem({
  id,
  name,
  markedItems,
  totalItems,
  createdAt,
  createdBy,
}: GroceryListItemProps) {
  const timeAgo = getRelativeTime(createdAt);
  const router = useRouter();

  return (
    <Card 
      className="py-5 gap-2 rounded-lg cursor-pointer transition-shadow group-hover:shadow-lg"
      onClick={() => router.push(`/grocery-lists/${id}`)}
      tabIndex={0}
      role="button"
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">{name}</CardTitle>
        <Button
          className="rounded-md p-2 -m-2 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={e => {
            e.stopPropagation();
            router.push(`/grocery-lists/${id}/options`);
          }}
          tabIndex={0}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Progress value={(markedItems / totalItems) * 100} />
          </div>
          <span className="text-muted-foreground text-sm text-end">
            {markedItems}/{totalItems}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={createdBy.avatarUrl} alt={createdBy.name} />
            <AvatarFallback className="text-xs font-bold">{createdBy.initials}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            Criado por <span className="font-bold">{createdBy.name}</span> {timeAgo}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `há ${diff} segundos atrás`;
  if (diff < 3600) return `há ${Math.floor(diff / 60)} minutos atrás`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} horas atrás`;
  return `em ${date.toLocaleDateString()}`;
}