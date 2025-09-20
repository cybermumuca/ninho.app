import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { ActivityCard } from "./activity-card";

export default function AgendaPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-foreground">Agenda</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="rounded-md p-2 -m-2 cursor-pointer"
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href="/agenda/calendar">
                <CalendarDaysIcon className="size-5" />
              </Link>
            </Button>
            <Button
              className="rounded-md p-2 -m-2 cursor-pointer"
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href="/agenda/add">
                <CirclePlusIcon className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 pb-4 space-y-2">
        <ActivityCard id={"1"} title={"Praticar no Teclado"} activityType={"HABIT"} color="blue" icon="music" />
        <ActivityCard id={"2"} title={"Jogar o lixo"} activityType={"HOUSEHOLD_TASK"} color="green" icon="brush-cleaning" />
        <ActivityCard id={"3"} title={"Trabalho"} activityType={"EVENT"} color="yellow" icon="briefcase-2" startDateTime="08:00" endDateTime="16:00" />
      </main>
    </div>
  );
}