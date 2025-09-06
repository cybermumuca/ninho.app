"use client"

import { useHabitWizardStore } from "@/stores/habit-wizard-store"
import { mockCategoryList } from "@/data/categories"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Heart, Briefcase, User, Book, Sun, Plane, MoreHorizontal, CirclePlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function CategoryStep() {
  const { formData, updateFormData } = useHabitWizardStore()
  const activeCategories = mockCategoryList.filter(cat => !cat.archivedAt)
  const router = useRouter();

  function handleCategorySelect(categoryId: string) {
    updateFormData({ categoryId })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Escolher Categoria</h2>
        <p className="text-muted-foreground">
          Escolha uma categoria para organizar seu hábito. Isso ajudará você a agrupar recursos similares.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
        {activeCategories.map((category) => (
          <Card key={category.id} className={cn("p-0 rounded-lg border-2 transition-all duration-250", formData.categoryId === category.id && "border-primary bg-primary/20")} onClick={() => handleCategorySelect(category.id)}>
            <CardContent className="p-2 px-2.5 flex items-center justify-between">
              <p className="text-sm font-medium">{category.name}</p>
              <CategoryIcon icon={category.icon} color={category.color} />
            </CardContent>
          </Card>
        ))}

        <Card className="p-0 rounded-lg border-2" onClick={() => { router.push("/categories/add") }}>
          <CardContent className="p-2 px-2.5 flex items-center justify-between">
            <p className="text-sm font-semibold">Criar categoria</p>
            <div className="rounded-lg flex items-center justify-center p-2 border-2">
              <CirclePlus className="size-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
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

function CategoryIcon({ icon, color }: { icon: string, color: string }) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || MoreHorizontal;
  const colorClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className={`rounded-lg ${colorClass} flex items-center justify-center p-2 border-2`}>
      <IconComponent className="size-4" />
    </div>
  );
}
