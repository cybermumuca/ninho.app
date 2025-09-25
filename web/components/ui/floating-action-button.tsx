import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Plus } from "lucide-react"

const fabVariants = cva(
  "fixed z-50 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "size-14",
        sm: "size-12",
        lg: "size-16",
      },
      position: {
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "bottom-right",
    },
  }
)

function FloatingActionButton({
  className,
  variant,
  size,
  position,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof fabVariants> & {
    asChild?: boolean
  }) {
  return (
    <Button
      className={cn(fabVariants({ variant, size, position }), className)}
      size="icon"
      {...props}
    >
      {children || <Plus className="size-6" />}
    </Button>
  )
}

export { FloatingActionButton, fabVariants }