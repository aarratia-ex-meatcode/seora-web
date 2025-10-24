import { Block } from "@/components/primitives/block";
import { Form as FormWrapper } from "@/components/primitives/form";
import { Text } from "@/components/primitives/text";
import { Title } from "@/components/primitives/title";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { messages } from "@/features/login/config/messages";
import { useLogin } from "@/features/login/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const { content, labels, actions, states, signup, validation } = messages;

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: validation.passwordMinLength }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = form.formState;
  const { mutate, isPending } = useLogin();

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    mutate({ email, password });
  };

  return (
    <Block className="border-primary rounded-xl border bg-white p-6 md:p-8">
      <Block className="flex flex-col gap-y-8">
        <Block className="space-y-1">
          <Title size="xl" weight="medium">
            {content.title}
          </Title>
          <Text variant="muted" size="sm">
            {content.description}
          </Text>
        </Block>
        <Form {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{labels.email}</FieldLabel>
                <Input
                  dimensions="xl"
                  shadow="none"
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...form.register("email")}
                />
              </Field>
              <Field>
                <Block className="flex flex-row items-center">
                  <FieldLabel htmlFor="password">{labels.password}</FieldLabel>
                  <Link to="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    {actions.forgotPassword}
                  </Link>
                </Block>
                <Input
                  dimensions="xl"
                  shadow="none"
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...form.register("password")}
                />
              </Field>
              <Field className="gap-y-4">
                <Button
                  size="xl"
                  variant="soft"
                  type="submit"
                  className="w-full font-medium" disabled={isPending}
                >
                  {isPending ? states.loggingIn : actions.login}
                </Button>
                <FieldDescription className="text-center">
                  {signup.text} <Link to="#">{signup.link}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FormWrapper>
        </Form>
      </Block>
    </Block>
  );
}
