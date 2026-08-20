import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { useVerifyMagicLink } from "@/features/auth/hooks/useVerifyMagicLink";


export default function MagicLinkPage() {
  const [searchParams] = useSearchParams();

  const verifyMagicLink =
    useVerifyMagicLink();

  const hasVerified = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token || hasVerified.current) {
      return;
    }

    hasVerified.current = true;

    verifyMagicLink.mutate(token);
  }, []);

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid login link</CardTitle>

            <CardDescription>
              This login link is missing its authentication
              token.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldDescription className="text-center">
              Please return to the login page and request
              a new link.
            </FieldDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verifyMagicLink.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login link expired</CardTitle>

            <CardDescription>
              This login link is invalid or has expired.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldDescription className="text-center">
              Please return to the login page and request
              a new link.
            </FieldDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            Signing you in...
          </CardTitle>

          <CardDescription>
            Please wait while we finish signing you in.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  );
}
