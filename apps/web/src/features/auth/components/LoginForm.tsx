import * as React from "react";
import {
  useForm,
  type UseFormSetError,
} from "react-hook-form";

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
import { useRequestMagicLink } from "../hooks/useRequestMagicLink";

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
  const [passwordMode, setPasswordMode] =
    React.useState(false);

  const [magicLinkSent, setMagicLinkSent] =
    React.useState(false);

  const requestMagicLink =
    useRequestMagicLink();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleMagicLink = async () => {
    const email = getValues("email").trim();

    if (!email) {
      setError("email", {
        type: "manual",
        message: "Please enter your email address.",
      });

      return;
    }

    try {
      await requestMagicLink.mutateAsync(email);
      setMagicLinkSent(true);
    } catch {
      setError("root", {
        type: "manual",
        message:
          "Unable to send login link. Please try again.",
      });
    }
  };

  if (magicLinkSent) {
    return (
      <div
        className={cn(
          "flex flex-col gap-6",
          className
        )}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>

            <CardDescription>
              We've sent a login link to the email
              address you entered.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup>
              <Field>
                <FieldDescription className="text-center">
                  The link will expire shortly and can
                  only be used once.
                </FieldDescription>
              </Field>

              <Field>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMagicLinkSent(false);
                  }}
                >
                  Use a different email
                </Button>

                <FieldDescription className="text-center">
                  Want to use a password instead?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4 hover:no-underline"
                    onClick={() => {
                      setMagicLinkSent(false);
                      setPasswordMode(true);
                    }}
                  >
                    Login with password
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Login to your account
          </CardTitle>

          <CardDescription>
            {passwordMode
              ? "Enter your email and password to login."
              : "Enter your email to receive a secure login link."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={
              passwordMode
                ? handleSubmit((data) =>
                    onSubmit(data, setError)
                  )
                : (event) => {
                    event.preventDefault();
                    void handleMagicLink();
                  }
            }
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
                  disabled={
                    loading ||
                    requestMagicLink.isPending
                  }
                  {...register("email")}
                />

                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              {passwordMode && (
                <Field>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    disabled={loading}
                    {...register("password")}
                  />

                  {errors.password && (
                    <FieldDescription className="text-destructive">
                      {errors.password.message}
                    </FieldDescription>
                  )}
                </Field>
              )}

              <Field>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={
                    loading ||
                    requestMagicLink.isPending
                  }
                >
                  {passwordMode
                    ? loading
                      ? "Signing in..."
                      : "Login"
                    : requestMagicLink.isPending
                      ? "Sending login link..."
                      : "Continue with email"}
                </Button>

                {!passwordMode && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      setPasswordMode(true)
                    }
                    disabled={
                      loading ||
                      requestMagicLink.isPending
                    }
                  >
                    Login with password
                  </Button>
                )}

                {passwordMode && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() =>
                      setPasswordMode(false)
                    }
                    disabled={loading}
                  >
                    Login with email
                  </Button>
                )}

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
