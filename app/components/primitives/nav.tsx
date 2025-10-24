import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

type NavProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

function Nav({ className, children, ...remainingProps }: NavProps) {
  const mergedClassName = cn(className);

  return (
    <nav
      {...(mergedClassName && { className: mergedClassName })}
      {...remainingProps}
    >
      {children}
    </nav>
  );
}

Nav.displayName = "Nav";

export { Nav, type NavProps };
