import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const progressBarVariants = cva({
  variants: {
    variant: {
      default: "h-full w-full flex-1 transition-all bg-secondary",
      green: "h-full w-full flex-1 transition-all bg-green-500",
      blue: "h-full w-full flex-1 transition-all bg-blue-500",
      red: "h-full w-full flex-1 transition-allbg-red-500",
      yellow: "h-full w-full flex-1 transition-all bg-amber-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ProgressProps = {
  value: number;
  className?: string;
  indicatorVariant?: keyof typeof progressBarVariants;
} & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>;

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorVariant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-primary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn({ indicatorVariant })}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressBarVariants };
