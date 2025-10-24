import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const titleVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      muted: "text-muted-foreground",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "medium",
  },
});

type TitleProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants> & {
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: ReactNode;
  };

function Title({
  level = "h1",
  variant,
  size,
  weight,
  className,
  children,
  ...remainingProps
}: TitleProps) {
  const Component = level;
  const mergedClassName = cn(
    titleVariants({ variant, size, weight, className }),
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

Title.displayName = "Title";

export { Title, titleVariants, type TitleProps };
