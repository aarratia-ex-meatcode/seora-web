import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type MainProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

function Main({ className, children, ...remainingProps }: MainProps) {
  const mergedClassName = cn(className);

  return (
    <main
      {...(mergedClassName && { className: mergedClassName })}
      {...remainingProps}
    >
      {children}
    </main>
  );
}

Main.displayName = "Main";

export { Main, type MainProps };

