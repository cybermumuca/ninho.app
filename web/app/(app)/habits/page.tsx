import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";

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
    </div>
  );
}
