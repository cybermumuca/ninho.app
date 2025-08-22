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

interface CategoryPreviewProps {
  name: string;
  icon: string;
  color: string;
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
  amber: "bg-amber-700/30 text-amber-400 border-amber-900",
  gray: "bg-gray-700/30 text-gray-400 border-gray-900",
};

export function CategoryPreview({ name, icon, color }: CategoryPreviewProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || MoreHorizontal;
  const colorClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className="flex flex-col items-center p-4">
      <div className={`rounded-lg ${colorClass} flex items-center justify-center p-4 border-2 mb-2`}>
        <IconComponent className="size-8" />
      </div>
      <h3 className="font-medium text-center">{name}</h3>
    </div>
  );
}
