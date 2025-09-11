"use client";

import { DumbbellIcon, MusicIcon } from "lucide-react";

export function HabitCardIcon({ icon }: { icon: string }) {
  switch (icon.toLowerCase()) {
    case "music":
      return <MusicIcon className="size-4.5" />;
    case "dumbbell":
      return <DumbbellIcon className="size-4.5" />;
    default:
      return null;
  }
}