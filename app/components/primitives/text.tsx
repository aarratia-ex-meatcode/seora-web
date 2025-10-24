import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div";
  children: ReactNode;
};

function Text({ as = "p", className, children, ...remainingProps }: TextProps) {
  const Component = as;
  const mergedClassName = cn(className);

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

export { Text, type TextProps };
