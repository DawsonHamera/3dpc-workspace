import * as React from "react";
import { useForm, type UseFormSetError } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LoginData } from "../hooks/useLogin";


type LoginFormProps = Omit<
  React.ComponentProps<"div">,
  "onSubmit"
> & {
  onSubmit: (
    data: LoginData,
    setError: UseFormSetError<LoginData>
  ) => void | Promise<void>;
  loading?: boolean;
  onSwitchToSignUp?: () => void;
};

export function LoginForm({
  className,
  onSubmit,
  onSwitchToSignUp,
  loading = false,
  ...props
}: LoginFormProps) {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data, setError))}
            noValidate
          >
            <FieldGroup>

              {errors.root && (
                <FieldDescription className="text-destructive text-center">
                  {errors.root.message}
                </FieldDescription>
              )}

              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  {...register("email")}
                />

                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <button
                    type="button"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>

                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                />

                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4 hover:no-underline"
                    onClick={onSwitchToSignUp}
                  >
                    Sign up
                  </button>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}