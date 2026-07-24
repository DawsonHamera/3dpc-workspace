import * as React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { RegisterData } from "../hooks/useRegister";

type SignupFormProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> & {
  onSubmit: (
    data: RegisterData,
    setError: ReturnType<typeof useForm<RegisterData>>["setError"]
  ) => void | Promise<void>;
  loading?: boolean;
  onSwitchToSignIn?: () => void;
};

export function SignupForm({
  className,
  onSubmit,
  loading = false,
  onSwitchToSignIn,
  ...props
}: SignupFormProps) {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit((data) => onSubmit(data, setError))}
      noValidate
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {errors.root && (
          <FieldDescription className="text-center text-destructive">
            {errors.root.message}
          </FieldDescription>
        )}

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>

          <Input
            id="name"
            placeholder="John Doe"
            className="bg-background"
            {...register("name")}
          />

          {errors.name && (
            <FieldDescription className="text-destructive">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-background"
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
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Input
            id="password"
            type="password"
            className="bg-background"
            autoComplete="new-password"
            {...register("password")}
          />

          {errors.password ? (
            <FieldDescription className="text-destructive">
              {errors.password.message}
            </FieldDescription>
          ) : (
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">
            Confirm Password
          </FieldLabel>

          <Input
            id="confirmPassword"
            type="password"
            className="bg-background"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword ? (
            <FieldDescription className="text-destructive">
              {errors.confirmPassword.message}
            </FieldDescription>
          ) : (
            <FieldDescription>
              Please confirm your password.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="underline underline-offset-4 hover:no-underline"
              onClick={onSwitchToSignIn}
            >
              Sign in
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
