import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type TitleProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: ReactNode;
};

function Title({
  level = "h1",
  className,
  children,
  ...remainingProps
}: TitleProps) {
  const Component = level;
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

Title.displayName = "Title";

export { Title, type TitleProps };
