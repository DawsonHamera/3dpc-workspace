import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    name: z.string().min(1, "Please enter your name."),
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignupData = z.infer<typeof signupSchema>;

type SignupFormProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> & {
  onSubmit: (data: SignupData) => void | Promise<void>;
  onSignIn?: () => void;
  loading?: boolean;
  error?: string | null;
};

export function SignupForm({
  className,
  onSubmit,
  onSignIn,
  loading = false,
  error,
  ...props
}: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
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
      onSubmit={handleSubmit(onSubmit)}
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

        {error && (
          <FieldDescription className="text-center text-destructive">
            {error}
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
              onClick={onSignIn}
              className="underline underline-offset-4 hover:no-underline"
            >
              Sign in
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
