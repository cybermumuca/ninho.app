"use client";

import { Button } from "@/components/ui/button";
import { mockHabitsList } from "@/data/habits";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArchivedHabitCard } from "./archived-habit-card";

export default function ArchivedHabitsPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center gap-3 p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="-m-2 p-2"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <h1 className="text-xl font-bold">Hábitos arquivados</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 pb-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockHabitsList.filter((habit) => !habit.isActive).map((habit) => (
            <ArchivedHabitCard
              key={habit.id}
              id={habit.id}
              title={habit.title}
              type={habit.type}
              category={habit.category}
              frequency={habit.frequency}
              streak={habit.streak}
              successRate={habit.successRate}
            />
          ))}
        </div>
      </main>
    </div>
  );
}