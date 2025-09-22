import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { ActivityCard } from "./activity-card";
import { mockActivitiesList } from "@/data/activities";
import { MiniCalendar } from "./mini-calendar";

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
        <MiniCalendar />
      </header>
      <main className="flex-1 container mx-auto px-4 pb-4 mt-2 mb-20 space-y-2">
        {mockActivitiesList.map((activity) => {
          return <ActivityCard key={activity.id} {...activity} />;
        })}
      </main>
    </div>
  );
}