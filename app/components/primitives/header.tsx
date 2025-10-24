import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

function Header({ className, children, ...remainingProps }: HeaderProps) {
  const mergedClassName = cn(className);

  return (
    <header
      {...(mergedClassName && { className: mergedClassName })}
      {...remainingProps}
    >
      {children}
    </header>
  );
}

Header.displayName = "Header";

export { Header, type HeaderProps };
