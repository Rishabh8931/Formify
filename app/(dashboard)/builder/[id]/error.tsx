"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <h2 className="text-destructive text-4xl">Something went wrong</h2>
      <Button nativeButton={false} render={<Link href="/">Go back to builder</Link>} />
    </div>
  );
}

export default ErrorPage;
