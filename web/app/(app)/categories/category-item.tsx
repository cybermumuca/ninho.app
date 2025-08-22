"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Heart,
  Briefcase,
  User,
  Book,
  Sun,
  Plane,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    associations: number;
  };
}

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
  blue: "bg-blue-700/30 text-blue-400 border-blue-900",
  green: "bg-green-700/30 text-green-400 border-green-900",
  red: "bg-red-700/30 text-red-400 border-red-900",
  purple: "bg-purple-700/30 text-purple-400 border-purple-900",
  yellow: "bg-yellow-700/30 text-yellow-400 border-yellow-900",
  orange: "bg-orange-700/30 text-orange-400 border-orange-900",
  pink: "bg-pink-700/30 text-pink-400 border-pink-900",
  indigo: "bg-indigo-700/30 text-indigo-400 border-indigo-900",
};

export function CategoryItem({ category }: CategoryItemProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || MoreHorizontal;
  const colorClass = colorMap[category.color as keyof typeof colorMap] || colorMap.blue;
  const router = useRouter();

  return (
    <div 
      className="flex flex-col items-center p-2 hover:bg-muted rounded-xl"
      onClick={() => router.push(`/categories/${category.id}/options`)}
      tabIndex={0}
    >
      <div className={`rounded-lg ${colorClass} flex items-center justify-center p-3 border-2`}>
        <IconComponent className="size-8" />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-medium mt-1">{category.name}</h3>
        <p className="text-muted-foreground text-xs text-nowrap">{category.associations} {category.associations === 1 ? 'associação' : 'associações'}</p>
      </div>
    </div>
  );
}
