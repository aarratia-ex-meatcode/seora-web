import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
        xl: "h-12",
      },
      shadow: {
        default: "shadow-xs",
        none: "shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "none",
    },
  },
);

function Input({
  type,
  variant,
  size,
  shadow,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, shadow, className }))}
      {...props}
    />
  );
}

export { Input };
