import { cn } from "@/lib/utils";
import { type FormHTMLAttributes, type ReactNode } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

function Form({ className, children, ...remainingProps }: FormProps) {
  const mergedClassName = cn(className);

  return (
    <form
      {...(mergedClassName && { className: mergedClassName })}
      {...remainingProps}
    >
      {children}
    </form>
  );
}

Form.displayName = "Form";

export { Form, type FormProps };
