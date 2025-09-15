import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitType, HabitFrequency } from "@/lib/types/habit";
import { getCategoryColorClasses, getFrequencyDescription } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { HabitCardIcon } from "../habit-icon";
import { CalendarIcon, ChartNoAxesColumnDecreasingIcon, CircleCheckIcon, FlameIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArchivedHabitCardProps {
  id: string;
  title: string;
  type: HabitType;
  frequency: HabitFrequency;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  streak: number;
  successRate: number;
}

export function ArchivedHabitCard({ id, title, type, frequency, category, streak, successRate }: ArchivedHabitCardProps) {
  const router = useRouter();

  function handleOpenCalendar(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${id}/calendar`);
  }

  function handleOpenStatistics(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${id}/statistics`);
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/habits/${id}/edit`);
  }

  function handleOpenOptions() {
    router.push(`/habits/${id}/options`);
  }

  return (
    <Card className="p-0 flex flex-col gap-0 cursor-pointer" onClick={handleOpenOptions}>
      <CardHeader className="p-4 flex items-center justify-between rounded-xl">
        <div className="flex flex-col gap-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription
            className={`text-xs px-2 py-1 ${Object.values(getCategoryColorClasses(category.color)).join(" ")} max-w-min text-nowrap rounded-md font-semibold`}
          >
            {getFrequencyDescription(frequency)}
          </CardDescription>
        </div>
        <div className={`rounded-lg ${Object.values(getCategoryColorClasses(category.color)).join(" ")} flex items-center justify-center p-2 border-2`}>
          <HabitCardIcon icon={category.icon} />
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t px-4 py-2 [.border-t]:py-2">
        <div className="flex gap-4 items-center flex-1">
          <div className="flex gap-1 items-center">
            <FlameIcon className={`size-5 ${getCategoryColorClasses(category.color).text} translate-y-[-1px]`} />
            <p className="text-base font-semibold">{streak}</p>
          </div>
          <div className="flex gap-1 items-center">
            <CircleCheckIcon className={`size-5 ${getCategoryColorClasses(category.color).text}`} />
            <p className="text-base font-semibold">{Math.round(successRate * 100) + "%"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground cursor-pointer"
            size="icon"
            onClick={handleOpenCalendar}
            aria-label="Abrir calendário do hábito"
          >
            <CalendarIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground cursor-pointer"
            size="icon"
            onClick={handleOpenStatistics}
            aria-label="Abrir estatísticas do hábito"
          >
            <ChartNoAxesColumnDecreasingIcon className="size-5" strokeWidth={3} />
          </Button>
          <Button
            variant="ghost"
            className="size-0 p-4 text-muted-foreground cursor-pointer"
            size="icon"
            onClick={handleEdit}
            aria-label="Editar hábito"
          >
            <PencilIcon className="size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}