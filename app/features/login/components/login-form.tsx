import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/login/hooks/use-login";
import messages from "@features/login/config/messages.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: messages.login.validation.passwordMinLength }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;
  const loginMutation = useLogin();

  const onSubmit = async (data: any) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-[#0e1111]">
            {messages.login.title}
          </CardTitle>
          <CardDescription className="text-[#414a4c]">
            {messages.login.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">{messages.login.form.email.label}</FieldLabel>
                  <Input
                    shadow="none"
                    dimensions="xl"
                    id="email"
                    type="email"
                    {...form.register("email")}
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">{messages.login.form.password.label}</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      {messages.login.form.password.forgot}
                    </a>
                  </div>
                  <Input
                    shadow="none"
                    dimensions="xl"
                    id="password"
                    type="password"
                    {...form.register("password")}
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    variant="soft"
                    size="xl"
                    className="w-full font-medium"
                    disabled={formState.isSubmitting || loginMutation.isPending}
                  >
                    {loginMutation.isPending 
                      ? messages.login.form.submit.loggingIn 
                      : messages.login.form.submit.login}
                  </Button>
                  <FieldDescription className="text-center">
                    {messages.login.form.signup.text}{" "}
                    <a href="#">{messages.login.form.signup.link}</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
