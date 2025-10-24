import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type BlockProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "span";
  children?: ReactNode;
};

function Block({
  as = "div",
  className,
  children,
  ...remainingProps
}: BlockProps) {
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

Block.displayName = "Block";

export { Block, type BlockProps };

