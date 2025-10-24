import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      muted: "text-muted-foreground",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
    align: "left",
  },
});

type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div";
    children: ReactNode;
  };

function Text({
  as = "p",
  variant,
  size,
  weight,
  align,
  className,
  children,
  ...remainingProps
}: TextProps) {
  const Component = as;
  const mergedClassName = cn(
    textVariants({ variant, size, weight, align, className }),
  );

  return (
    <Component
      {...(mergedClassName && { className: mergedClassName })}
      {...remainingProps}
    >
      {children}
    </Component>
  );
}

Text.displayName = "Text";

export { Text, textVariants, type TextProps };
