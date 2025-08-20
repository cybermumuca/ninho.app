import { cn } from "@/lib/utils";
import { mockListTags } from "@/data/tags";

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

export function TagItem({ tag }: { tag: typeof mockListTags[0] }) {
  return (
    <div className={cn("inline-flex items-center rounded-md border-[0.5px]", colorMap[tag.color as keyof typeof colorMap])}>
      <p className="px-2 py-1">
        #{tag.name}
      </p>
      <p className="text-xs px-2.5 py-2 border-s-[0.5px] border-current/20">
        {tag.associated}
      </p>
    </div>
  );
}