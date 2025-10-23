import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

type BlockProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

function Block({ children, className, ...remainingProps }: BlockProps) {
  const mergedClassName = cn(className);

  return (
    <div
      {...(mergedClassName && { className: mergedClassName })}
      {...remainingProps}
    >
      {children}
    </div>
  );
}

Block.displayName = "Block";

export { Block, type BlockProps };
