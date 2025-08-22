"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArchiveRestoreIcon,
  TrashIcon,
  DollarSign,
  Heart,
  Briefcase,
  User,
  Book,
  Sun,
  Plane,
  MoreHorizontal,
  MenuIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const iconMap = {
  "dollar-sign": DollarSign,
  heart: Heart,
  briefcase: Briefcase,
  user: User,
  book: Book,
  sun: Sun,
  airplane: Plane,
  "more-horizontal": MoreHorizontal,
};

const colorMap = {
  blue: "bg-blue-700/20 text-blue-400 border-blue-800/50",
  green: "bg-green-700/20 text-green-400 border-green-800/50",
  red: "bg-red-700/20 text-red-400 border-red-800/50",
  purple: "bg-purple-700/20 text-purple-400 border-purple-800/50",
  yellow: "bg-yellow-700/20 text-yellow-400 border-yellow-800/50",
  orange: "bg-orange-700/20 text-orange-400 border-orange-800/50",
  pink: "bg-pink-700/20 text-pink-400 border-pink-800/50",
  indigo: "bg-indigo-700/20 text-indigo-400 border-indigo-800/50",
  amber: "bg-amber-700/20 text-amber-400 border-amber-800/50",
  gray: "bg-gray-700/20 text-gray-400 border-gray-800/50",
};

interface ArchivedCategoryItemProps {
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    associations: number;
    archivedAt: string;
  };
}

export function ArchivedCategoryItem({ category }: ArchivedCategoryItemProps) {
  const router = useRouter();
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || MoreHorizontal;
  const colorClass = colorMap[category.color as keyof typeof colorMap] || colorMap.gray;

  const archivedDate = new Date(category.archivedAt);
  const formattedDate = archivedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Restaurar categoria:", category.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Excluir permanentemente categoria:", category.id);
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center justify-between p-0">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg ${colorClass} flex items-center justify-center p-3 border-2 shrink-0`}>
            <IconComponent className="size-6" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <CardTitle className="font-medium">{category.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Arquivada em {formattedDate}
            </CardDescription>
          </div>
        </div>
        <Button
          className="rounded-md cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={e => {
            e.stopPropagation();
            router.push(`/categories/${category.id}/options`, { scroll: false });
          }}
          tabIndex={0}
        >
          <MenuIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={handleRestore}
          className="text-emerald-500"
          title="Restaurar categoria"
        >
          <ArchiveRestoreIcon className="size-4" />
          Restaurar
        </Button>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="text-destructive border-destructive hover:bg-destructive/10"
          title="Excluir permanentemente"
        >
          <TrashIcon className="size-4" />
          Excluir
        </Button>
      </CardContent>
    </Card>
  );
}
