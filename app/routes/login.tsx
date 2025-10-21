import type { Route } from "./+types/home";
import { LoginForm } from "../features/login/components/login-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - AEO" },
    { name: "description", content: "Login" },
  ];
}

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted p-6">
      <LoginForm />
    </div>
  );
}
