"use client";

import React from "react";
import { useAuth } from "@/components/password-protection";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AccessGuard({
  required,
  children,
}: {
  required: number[];
  children: React.ReactNode;
}) {
  const { accessLevel, isSuperUser } = useAuth() as any;
  const allowed = Array.isArray(required) ? required : [0];
  const isSuperOnly = allowed.length === 1 && allowed[0] === 4;
  const canView = isSuperUser || (!isSuperOnly && (allowed.includes(0) || allowed.includes(accessLevel)));

  if (!canView) {
    return (
      <div className="max-w-2xl">
        <Alert variant="destructive">
          <AlertDescription>
            You don’t have access to this page. Please use a higher access password.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}


