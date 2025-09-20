"use client";

import { cn, getCategoryColorClasses } from "@/lib/utils";

interface IconWrapperProps {
  children: React.ReactNode;
  color: string;
  className?: string;
}

export function IconWrapper({ children, color, className }: IconWrapperProps) {
  return (
    <div className={cn(`
      rounded-lg ${Object.values(getCategoryColorClasses(color)).join(" ")} flex items-center justify-center p-2 border-2`,
      className
    )}>
      {children}
    </div>
  );
}