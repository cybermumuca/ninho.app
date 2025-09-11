import { Button } from "@/components/ui/button";
import { mockHabitsList } from "@/data/habits";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { HabitCard } from "./habit-card";

export default function HabitsPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-foreground">Hábitos</h1>
          </div>
          <Button
            className="rounded-md p-2 -m-2 cursor-pointer"
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/habits/add">
              <CirclePlusIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pb-4">
        <div className="space-y-6">
          {/* Hábitos Ativos */}
          {mockHabitsList.length > 0 && (
            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockHabitsList.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    id={habit.id}
                    title={habit.title}
                    type={habit.type}
                    category={habit.category}
                    frequency={habit.frequency}
                    streak={habit.streak}
                    successRate={habit.successRate}
                    startDate={habit.startDate}
                    endDate={habit.endDate}
                    weekProgress={habit.weekProgress}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Estado vazio */}
          {mockHabitsList.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Você ainda não tem nenhum hábito cadastrado.
              </p>
              <Button asChild>
                <Link href="/habits/add">
                  <CirclePlusIcon className="size-4 mr-2" />
                  Criar primeiro hábito
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
