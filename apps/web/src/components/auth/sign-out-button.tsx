import React from "react";
import { SignOutButton as SO, useAuth } from "@clerk/react-router";
import { Button } from "@repo/ui/components/button";


function SignOutButton({ className }: { className?: string }) {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }
  return (
    <SO>
      <Button variant="outline" className={className}>
        Sign out
      </Button>
    </SO>
  );
}

export default SignOutButton;
