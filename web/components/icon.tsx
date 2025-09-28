"use client";

import { cn } from "@/lib/utils";
import { BookIcon, BrainIcon, BriefcaseBusinessIcon, BriefcaseIcon, BrushCleaningIcon, CakeIcon, DollarSignIcon, DumbbellIcon, GiftIcon, HeartPulseIcon, MusicIcon, StethoscopeIcon } from "lucide-react";

interface IconProps {
  icon: string;
  className?: string;
}

export function Icon({ icon, className }: IconProps) {
  switch (icon.toLowerCase()) {
    case "music":
      return <MusicIcon className={cn("size-4.5", className)} />;
    case "dumbbell":
      return <DumbbellIcon className={cn("size-4.5", className)} />;
    case "book":
      return <BookIcon className={cn("size-4.5", className)} />;
    case "brush-cleaning":
      return <BrushCleaningIcon className={cn("size-4.5", className)} />;
    case "briefcase-1":
      return <BriefcaseIcon className={cn("size-4.5", className)} />;
    case "briefcase-2":
      return <BriefcaseBusinessIcon className={cn("size-4.5", className)} />;
    case "cake":
      return <CakeIcon className={cn("size-4.5", className)} />;
    case "stethoscope":
      return <StethoscopeIcon className={cn("size-4.5", className)} />;
    case "gift":
      return <GiftIcon className={cn("size-4.5", className)} />;
    case "heart-pulse":
      return <HeartPulseIcon className={cn("size-4.5", className)} />;
    case "dollar-sign":
      return <DollarSignIcon className={cn("size-4.5", className)} />;
    case "brain":
      return <BrainIcon className={cn("size-4.5", className)} />;
    default:
      return null;
  }
}